// pdfController.js
const User = require('../Models/UserModel');
const PDF = require('../Models/pdf');
const Comment = require('../Models/comment');

// Function to store a PDF under a specific user ID
const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Function to store a PDF under a specific user ID
exports.uploadPDF = async (req, res) => {
  try {
    // console.log(req.params.user)
    const user = await User.findOne({username:req.params.user});
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { originalname, filename } = req.file;
    const pdf = new PDF({
      name: originalname,
      path: `uploads/${filename}`,
      comments: []
    });

    user.pdfs.push(pdf);
    await user.save();

    res.json({ message: 'PDF uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
// exports.uploadPDF = async (req, res) => {
//   try {
//     const user = await User.findOne(req.params.user);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const { originalname, path } = req.file;
//     const pdf = new PDF({
//       name: originalname,
//       path: path,
//       comments: []
//     });

//     user.pdfs.push(pdf);
//     await user.save();

//     res.json({ message: 'PDF uploaded successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

exports.downloadPDFs = async (req, res) => {
  try {
  
      const file = "../server/uploads/Junior Software Engineer - Assignment.pdf";
      res.download(file); // Set disposition and send it.
  } catch (error) {
    res.status(500).json({ error: 'Internal server errorrrr' });
  }
};




// Function to get all PDFs under a user
exports.getAllPDFs = async (req, res) => {
  try {
    const user = await User.findOne({username:req.params.user}).populate('pdfs');
    // console.log("user",user)
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.pdfs);
  } catch (error) {
    res.status(500).json({ error: 'Internal server errorrrr' });
  }
};

// Function to upload a comment for a particular PDF
// exports.uploadComment = async (req, res) => {
//   try {
//     const pdfuser = await PDF.findOne({username:req.params.user});
//     if (!pdfuser) {
//       return res.status(404).json({ error: 'PDF not found' });
//     }


//     const { description, user } = req.body;
//     const comment = new Comment({
//       description: description,
//       user: user
//     });

//     pdf.comments.push(comment);
//     await pdf.save();

//     res.json({ message: 'Comment added successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


exports.uploadComment = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.user });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const pdf = user.pdfs.find((pdf) => pdf.name === req.params.pdfname);

    if (!pdf) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    const { description, user: userId } = req.body;

    const comment = new Comment({
      description: description,
      user: userId,
    });

    pdf.comments.push(comment);

    await user.save();

    res.json({ message: 'Comment added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internallll server error' });
  }
};


// Function to get all comments for a particular PDF
exports.getAllComments = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.user });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const pdf = user.pdfs.find((pdf) => pdf.name === req.params.pdfname);

    if (!pdf) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    const comments = pdf.comments;

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
