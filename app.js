//? external dependencies
const express = require("express");
const morgan = require('morgan');
const authRoutes = require("./routes/authRouter");
const mongoose = require("mongoose");

//?constants
const app = express();
const PORT = process.env.PORT || 8080

//?view engine
app.set("view engine", "ejs");
app.set("views", "views");

//?middleware
const middleware = [
    morgan('dev'),
    express.json(),
    express.urlencoded({ extended: true }),
    express.static("public")
]

app.use(middleware);

app.use('/auth', authRoutes)

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


mongoose.connect('mongodb://localhost:27017/hakim',
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
