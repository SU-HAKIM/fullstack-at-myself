const { body } = require("express-validator");
const User = require("../../models/user");
const bcrypt = require("bcrypt");

const loginValidator = [
    body("email")
        .not()
        .isEmpty()
        .withMessage("Enter your email address")
        .isEmail()
        .withMessage("Enter valid email")
        .custom(async email => {
            const user = await User.findOne({ email })
            if (!user) {
                return Promise.reject("User doesn't exist")
            }
        }),
    body('password')
        .not()
        .isEmpty()
        .withMessage('"Enter your password"')
        .custom(async (password, { req }) => {
            const user = await User.findOne({ email: req.body.email })
            console.log(user)
            if (!user) {
                return Promise.reject("Wrong information entered")
            }
            let equal = await bcrypt.compare(password, user.password);
            if (!equal) {
                return Promise.reject("Wrong information,try again.")
            }
        })
]

module.exports = loginValidator;