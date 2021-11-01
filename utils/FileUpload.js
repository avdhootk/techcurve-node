var multer = require('multer');
var fileExtension = require('file-extension');
const fs = require('fs');

const whitelist = [
    'application/pdf'
]
var storage = multer.diskStorage({
    destination: function(req, file, callback) {

        // let uploadPath = process.env.PDFUPLOADPATH;
        let uploadPath = './pdf/';

        console.log("Upload path :", uploadPath);
        if (!fs.existsSync(uploadPath)) { fs.mkdirSync(uploadPath, { recursive: true }); }
        callback(null, uploadPath);
    },
    filename: function(req, file, callback) {

        console.log("Original file name:" + file.originalname);
        var uploadFileName = Date.now() + "." + fileExtension(file.originalname);

        console.log('new file name :' + uploadFileName);
        console.log('type: ' + file.mimetype);

        req.body.pdfname = uploadFileName;
      

        callback(null, uploadFileName);

    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!whitelist.includes(file.mimetype)) {
            return cb(new Error('file is not allowed'))
        }
    
        cb(null, true)
    }
});

module.exports = upload;