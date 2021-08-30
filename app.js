//? external dependencies
require('dotenv').config();
const express = require("express");
const morgan = require('morgan');
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

//?internal imports
const authRoutes = require("./routes/authRouter");
const { bindUserWithRequest } = require("./middleware/authMiddleware");
const setLocals = require("./middleware/setLocals");
const dashboardRoute = require('./routes/dashboardRoute');

//?constants
const app = express();
const PORT = process.env.PORT || 8080
const MONGODB_URI = `mongodb://localhost:27017/${process.env.DB_NAME}`;


//?SESSION STORE
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})

//?view engine
app.set("view engine", "ejs");
app.set("views", "views");

//?middleware
const middleware = [
    express.json(),
    express.urlencoded({ extended: true }),
    express.static("public"),
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        store: store
    }),
    bindUserWithRequest(),
    setLocals(),
    flash()
]

if (app.get('env').toLowerCase() === 'development') {
    app.use([
        morgan('dev'),
    ])
}

app.use(middleware);

//? routes
app.use('/auth', authRoutes)
app.use('/dashboard', dashboardRoute);

//?instance route
app.get("/", (req, res) => {
    res.render("pages/auth/signup", {
        title: "create a new account",
        error: { },
        value: { },
        isLoggedIn: false
    })
    res.json({ message: "welcome to my app" })
})


//?mongodb connection
mongoose.connect(MONGODB_URI,
    {
        useNewUrlParser: true
    })
    .then(() => {
        console.log("DB connected")
        //?listening to the server
        app.listen(PORT, () => {
            console.log("listening to the port", PORT)
        })
    }).catch(err => {
        console.log(er)
    });
