const mongoose = require('mongoose');

const PdfcontentSchema = new mongoose.Schema({
    key:{
        type:String,
        required:false
    },
    pdf_content:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Pdfcontent',PdfcontentSchema,'pdfcontent');