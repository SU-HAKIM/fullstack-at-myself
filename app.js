//? external dependencies
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const config = require('config');
const chalk = require('chalk');

//?debug
const testConsole = require('debug')('app:test');
const dbConsole = require('debug')('app:db');

testConsole('this is test console')
dbConsole('this is db console')



//?import routes
const setRoutes = require('./routes/routesModule');

//?middleware
const setMiddleware = require('./middleware/middleware');

//?constants
const app = express();
const PORT = process.env.PORT || 8080
const MONGODB_URI = `mongodb://localhost:27017/${config.get('db-username')}`;


//?view engine
app.set("view engine", "ejs");
app.set("views", "views");

//?middleware from middleware dir
setMiddleware(app)

//? routes from routes dir
setRoutes(app);

app.use((req, res, next) => {
    let error = new Error('404 not found')
    error.status = 404

    next(error)
})

app.use((error, req, res, next) => {
    if (error.status === 404) {
        return res.render('pages/error/404', { flashMessage: { } })
    }
    res.render('pages/error/500', { flashMessage: { } })
})

//?mongodb connection
mongoose.connect(MONGODB_URI,
    {
        useNewUrlParser: true
    })
    .then(() => {
        console.log(chalk.bgGreen.white.bold("DB connected"))
        //?listening to the server
        app.listen(PORT, () => {
            console.log("listening to the port", PORT)
        })
    }).catch(err => {
        console.log(err)
    });
