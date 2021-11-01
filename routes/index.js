const express = require('express');
const router = express.Router();
const Upload = require('../utils/FileUpload');
const indexController = require('../controllers/indexController');

router.post('/uploadpdf',Upload.single('file'),indexController.readpdf);

module.exports = router;