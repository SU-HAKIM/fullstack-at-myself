const router = require('express').Router();

const { isAuthenticated } = require('../middleware/isAuthenticated');
const upload = require('../middleware/uploadMiddleware');

const { uploadProfilePics } = require('../controllers/uploadController');

router.post('/profilePics', isAuthenticated, upload.single('profilePics'), uploadProfilePics);

module.exports = router;