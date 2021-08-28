const User = require("../models/user");
const bcrypt = require('bcrypt');

exports.signupGetController = (req, res, next) => {
    res.render("pages/auth/signup"), {
        title: "Create A New Account",
        error: { },
        value: { },
        isLoggedIn: req.session.isLoggedIn
    }

}
exports.signupPostController = async (req, res, next) => {
    let { username, email, password } = req.body;
    try {
        //? hashing password
        const hashedPassword = await bcrypt.hash(password, 10);
        //?creating user
        let user = new user({
            username,
            email,
            password: hashedPassword
        })
        //? adding user
        let createUser = await user.save();
        console.log("Created user", createUser)
        res.render('pages/auth/login',
            {
                error: { },
                value: { },
                isLoggedIn: req.session.isLoggedIn
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
        isLoggedIn: req.session.isLoggedIn
    });
}
exports.loginPostController = (req, res, next) => {

}
exports.logoutController = (req, res, next) => {

}
