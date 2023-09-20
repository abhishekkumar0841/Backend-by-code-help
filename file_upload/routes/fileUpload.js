const express = require('express')
const router = express.Router();

const {imageUpload, videoUpload, imageReducerUpload, localFileUpload} = require('../controllers/fileUpload')

//api routes
router.post('/loaclfileupload', localFileUpload)

//exporting router
module.exports = router;