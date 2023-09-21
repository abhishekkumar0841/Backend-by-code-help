const express = require('express')
const router = express.Router();

const {imageUpload, videoUpload, imageSizeReducer, localFileUpload} = require('../controllers/fileUpload')

//api routes
router.post('/loaclfileupload', localFileUpload);
router.post('/imageupload', imageUpload)
router.post('/videoupload', videoUpload)
router.post('/imagesizereducer', imageSizeReducer)

//exporting router
module.exports = router;