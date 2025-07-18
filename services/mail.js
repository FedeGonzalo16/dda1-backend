const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'hoyt.gleichner@ethereal.email',
        pass: 'hY7TuZNetyBkBUqEpv'
    }
});

const sendMail = async (email, subjecte, htmlTemplate) => {
  transporter.sendMail({
    from: 'hoyt.gleichner@ethereal.email',
    to: email,
    subject: subjecte,
    html: htmlTemplate
  })
}

module.exports = {
  sendMail,
};