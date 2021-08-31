const { dashboardController, createProfileGetController, createProfilePostController, editProfilePostController, editProfileGetController } = require('../controllers/dashboardController');
const { isAuthenticated } = require('../middleware/isAuthenticated');

const router = require('express').Router();

router.get('/', isAuthenticated, dashboardController);

router.get('/create-profile', createProfileGetController)
router.post('/create-profile', createProfilePostController)

router.get('/edit-profile', editProfileGetController)
router.post('/edit-profile', editProfilePostController)

module.exports = router