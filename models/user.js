const { Schema, model } = require("mongoose");
const validator = require("validator");
// const Profile = require("Profile");

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        maxlength: 15,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Syntax");
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: "Profile"
    },
    profilePics: {
        type: String,
        default: '/uploads/default.jpg'
    }
}, {
    timestamps: true
})


const User = model("User", userSchema)

module.exports = User