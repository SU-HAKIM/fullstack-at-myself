const router = require("express").Router();

const {
    signupGetController,
    signupPostController,
    loginGetController,
    loginPostController,
    logoutController
} = require("../controllers/authController");

const loginValidator = require("../validator/loginValidator");
const signupValidator = require("../validator/signupValidator");

router.get('/signup', signupGetController);

router.post('/signup', signupValidator, signupPostController);

router.get('/login', loginGetController);

router.post('/login', loginValidator, loginPostController);

router.get('/logout', logoutController);

module.exports = router;