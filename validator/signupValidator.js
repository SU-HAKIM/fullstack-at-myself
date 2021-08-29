const { body } = require("express-validator");
const User = require("../models/user");


const signupValidator = [
    body("username")
        .isLength({ min: 2, max: 15 })
        .withMessage("User Name Must Be Between 2 to 15 chars.")
        .custom(async username => {
            let user = await User.findOne({ username });
            if (user) {
                return Promise.reject("User name is already in use.")
            }
        })
        .trim(),
    body("email")
        .isEmail().withMessage("Please provide a valid email")
        .custom(async email => {
            let user = await User.findOne({ email });
            if (user) {
                return Promise.reject("This email already exists.")
            }
        })
        .normalizeEmail(),
    body("password")
        .isLength({ min: 5 })
        .withMessage("Your password must be greater than 5 chars"),
    body("confirmPassword")
        .isLength({ min: 5 })
        .withMessage("Your password must be greater than 5 chars")
        .custom((confirmPassword, { req }) => {
            if (confirmPassword !== req.body.password) {
                throw new Error("Password must math.")
            }
            return true
        })
]

module.exports = signupValidator