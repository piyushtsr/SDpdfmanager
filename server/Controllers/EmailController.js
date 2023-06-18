const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // Configure your email provider settings here
  service: 'Gmail',
  auth: {
    user: '',
    pass: '',
  },
});

const sendEmail = async (req, res) => {
  const { email, url, cookie } = req.body;

  const mailOptions = {
    from: '',
    to: email,
    subject: 'PDF File Shared',
    text: `You have received a shared PDF file. Click on the link below to access it:\n\n${url}`,
    html: `<p>You have received a shared PDF file. Click on the link below to access it:</p><p><a href="${url}">${url}</a></p>`,
  };

  // Attach the cookie as a header in the email
  mailOptions.headers = {
    Cookie: cookie,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error sending email:', error);
    res.sendStatus(500);
  }
};

module.exports = {
  sendEmail,
};
