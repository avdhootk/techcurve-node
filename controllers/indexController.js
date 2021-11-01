
const fs = require('fs');
const pdf = require('pdf-parse');
const validator = require('validator');

const con = require('../database/db');
const Pdfcontent = require('../models/Pdfcontent');


const readpdf = async (req,res) => {
    
    console.log("Controller file ===========> ",req.body.pdfname)

    const pdfPath = './pdf/'+req.body.pdfname;

    if(fs.existsSync(pdfPath)){
        
        let dataBuffer = fs.readFileSync(pdfPath);

        pdf(dataBuffer).then(async (data) => {
 
            // PDF text
            let pdfdata = await Pdfcontent.findOne();
    
            let pdf_content = (data.text)? validator.escape(data.text) : '';
            pdfdata.pdf_content=pdf_content;
            await pdfdata.save();
            
            //Comment if you dont want to delete files
            fs.unlink(pdfPath, function(err) {
                if (err) {
                    console.error(err);
                }

                console.log('File has been Deleted');
                res.status(200).send({'status':'success','data':pdf_content});
            });

        });

    }else{
        res.status(400).send({'status':'failed','data':{},"message":'Something went wrong with file upload'});
    }

}


module.exports = {
    readpdf
}