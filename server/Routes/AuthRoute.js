const { Signup, Login } = require('../Controllers/AuthController')
const { storePDF, getPDFs } = require('../Controllers/PDFController')
const {userVerification} = require('../Middlewares/AuthMiddleware')
const pdfController = require('../Controllers/PDFController');
const {sendEmail} = require('../Controllers/EmailController')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require("path")
const fs = require("fs")



const router = require('express').Router()

router.post('/signup', Signup)
router.post('/login', Login)
router.post('/',userVerification)
// router.post('/uploads',storePDF)
// router.get('/uploads',getPDFs)



// Route to store a PDF under a specific user ID
router.post('/users/:user/pdfs', upload.single('pdf'), pdfController.uploadPDF);

// Route to get all PDFs under a user
router.get('/users/:user/pdfs', pdfController.getAllPDFs);

// Route to upload a comment for a particular PDF
router.post('/:user/:pdfname/comments', pdfController.uploadComment);

// Route to get all comments for a particular PDF
router.get('/:user/:pdfname/comments', pdfController.getAllComments);

// router.get('/download',pdfController.downloadPDFs)

router.get('/download/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = `../server/uploads/${filename}`
    // path.join(__dirname, 'path_to_files', filename);
    // Set the appropriate headers for the file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  
    // Read the file and stream it as the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });

router.post('/send-email',sendEmail)

module.exports = router