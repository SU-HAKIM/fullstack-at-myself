const User = require("../models/user");
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");
const errorFormatter = require("../utils/validationErrorFormatter");

exports.signupGetController = (req, res, next) => {
    res.render("pages/auth/signup", {
        title: "Create A New Account",
        error: { },
        value: { },
        isLoggedIn: false //req.session.isLoggedIn
    })
}

exports.signupPostController = async (req, res, next) => {
    let { username, email, password } = req.body;
    let error = validationResult(req).formatWith(errorFormatter);

    if (!error.isEmpty) {
        return res.render("pages/auth/signup", {
            title: "Create An Account",
            error: error.mapped(),
            value: { username, email }
        })
    }

    try {
        //? hashing password
        const hashedPassword = await bcrypt.hash(password, 10);
        //?creating user
        let user = new User({
            username,
            email,
            password: hashedPassword
        })
        //? adding user
        let createUser = await user.save();
        console.log("Created user", createUser)
        res.render('pages/auth/login',
            {
                title: "Log in page",
                error: { },
                value: { email },
                isLoggedIn: false//req.session.isLoggedIn
            }
        )
    } catch (error) {
        console.log(error)
        next(error)
    }
}
exports.loginGetController = (req, res, next) => {
    res.render("pages/auth/login", {
        title: "Log in to your account",
        error: { },
        value: { },
        isLoggedIn: false//req.session.isLoggedIn
    });
}

exports.loginPostController = async (req, res, next) => {
    let { email, password } = req.body;
    let error = validationResult(req).formatWith(errorFormatter);

    if (!error.isEmpty) {
        return res.render("pages/auth/login", {
            title: "Log in page",
            error: error.mapped(),
            value: { email }
        })
    }
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.json({ message: "user not found" })
        }

        const isEqual = await bcrypt.compare(password, user.password);

        if (!isEqual) {
            return res.json({ message: "user not found" })
        }

        res.render("pages/dashboard/dashboard", {
            title: 'my dashboard',
            isLoggedIn: false//req.session.isLoggedIn
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}
exports.logoutController = (req, res, next) => {

}
