const User = require("../models/user");
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");
const errorFormatter = require("../utils/validationErrorFormatter");
const Flash = require('../utils/capitalFlash');

exports.signupGetController = (req, res, next) => {
    res.render("pages/auth/signup", {
        title: "Create A New Account",
        error: { },
        value: { },
        flashMessage: Flash.getMessage(req)
    })
}

exports.signupPostController = async (req, res, next) => {
    let { username, email, password } = req.body;
    let error = validationResult(req).formatWith(errorFormatter);

    if (!error.isEmpty()) {
        req.flash('fail', 'Please check your information!')
        return res.render("pages/auth/signup", {
            title: "Create An Account",
            error: error.mapped(),
            value: { username, email },
            flashMessage: Flash.getMessage(req)
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
        await user.save();

        req.flash('success', "user successfully created")
        res.render('pages/auth/login',
            {
                title: "Log in page",
                error: { },
                value: { email },
                flashMessage: Flash.getMessage(req)
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
        flashMessage: Flash.getMessage(req)
    });
}

exports.loginPostController = async (req, res, next) => {
    let { email, password } = req.body;
    let error = validationResult(req).formatWith(errorFormatter);

    if (!error.isEmpty()) {
        req.flash('fail', 'Please check your information!')
        return res.render("pages/auth/login", {
            title: "Log in page",
            error: error.mapped(),
            value: { email },
            flashMessage: Flash.getMessage(req)
        })
    }
    try {
        let user = await User.findOne({ email })
        if (!user) {
            req.flash('fail', "Invalid credentials")
            return res.render("pages/auth/login", {
                title: "Log in page",
                error: { },
                value: { email },
                flashMessage: Flash.getMessage(req)
            })
        }

        const isEqual = await bcrypt.compare(password, user.password);

        if (!isEqual) {
            req.flash('fail', "Invalid credentials")
            return res.render("pages/auth/login", {
                title: "Log in page",
                error: { },
                value: { email },
                flashMessage: Flash.getMessage(req)
            })
        }

        req.session.isLoggedIn = true
        req.session.user = user
        req.session.save(err => {
            if (err) {
                console.log(err)
            }

            req.flash('success', 'successfully logged in')
            res.redirect('/dashboard')
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.logoutController = async (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err)
            return next(err)
        }
        return res.redirect('/auth/login')
    })
}