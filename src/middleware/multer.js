const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

//Upload photo with multer
const fileFilter = (res, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}

var productStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../src/uploads/products/'))
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4().replace(/-/g, '') + '.jpg');
    },
})
var uploadProduct = multer({
    storage: productStorage,
    limits: {
        fileSize: 1024 * 1024 * 1024,
    },
    fileFilter
})

var avatarStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../src/uploads/avatars/'))
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4().replace(/-/g, '') + '.jpg');
    },
})

var uploadAvatar = multer({
    storage: avatarStorage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter
})


var contentStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../src/uploads/contents/'))
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4().replace(/-/g, '') + '.jpg');
    },
})

var uploadContent = multer({
    storage: contentStorage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter
})


module.exports = {
    uploadProduct,
    uploadAvatar,
    uploadContent
}