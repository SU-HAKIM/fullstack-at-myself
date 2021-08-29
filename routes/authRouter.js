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
const { isUnauthenticated } = require('../middleware/isUnauthenticated');

router.get('/signup', isUnauthenticated, signupGetController);

router.post('/signup', signupValidator, signupPostController);

router.get('/login', isUnauthenticated, loginGetController);

router.post('/login', loginValidator, loginPostController);

router.get('/logout', logoutController);

module.exports = router;