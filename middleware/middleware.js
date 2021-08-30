const express = require('express');
const morgan = require('morgan');
const flash = require('connect-flash');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const config = require('config')

//?internal imports
const { bindUserWithRequest } = require("./authMiddleware");
const setLocals = require("./setLocals");

//?constants
const MONGODB_URI = `mongodb://localhost:27017/${config.get('db-username')}`;

//?SESSION STORE
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})

const middleware = [
    morgan(),
    express.json(),
    express.urlencoded({ extended: true }),
    express.static("public"),
    session({
        secret: config.get('SECRET_KEY'),
        resave: false,
        saveUninitialized: false,
        store: store
    }),
    bindUserWithRequest(),
    setLocals(),
    flash()
]


module.exports = app => {
    app.use(middleware)
}