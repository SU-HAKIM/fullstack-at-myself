const { dashboardController } = require('../controllers/dashboardController');
const { isAuthenticated } = require('../middleware/isAuthenticated');

const router = require('express').Router();

router.get('/', isAuthenticated, dashboardController);

module.exports = router