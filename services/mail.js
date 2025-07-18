const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "agusyoon11@gmail.com", // tu cuenta Gmail
    pass: "tgjx woan nqxu gggd", // la de 16 caracteres
  },
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