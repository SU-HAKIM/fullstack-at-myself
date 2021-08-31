const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    },

})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        const types = /jpeg|jpg|png|gif/
        const extName = type.test(path.extname(file.originalname).toLowercase());
        const mimeType = types.test(file.mimetype);
        if (extName && mimeType) {
            cb(null, true)
        } else {
            new Error('Only jpeg,jpg,png,gif images supported')
        }
    }
})

module.exports = upload;