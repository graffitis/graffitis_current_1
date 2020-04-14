const express = require('express');
const uploadController = require('./../controllers/uploadController');
const utils = require('./../config/utils');

const router = express.Router();

const multer = require("multer");

const ID = function () {
  return "_" + Math.random().toString(36).substr(2, 5);
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp/");
  },
  filename: function (req, file, cb) {
    cb(null, "graffIMG" + '_' + req.user._id + ID());
  },
});

const upload = multer({
  storage: storage
});

router.route('/s3/uploadone').post(utils.adminCheck, upload.single('file'), uploadController.s3_UploadOne);
router.route('/s3/removeone').get(uploadController.s3_DeleteOne);

module.exports = router;