const dotenv = require('dotenv');
const {
  Resend
} = require('resend');
dotenv.config();


const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (email, subjecte, htmlTemplate) => {
  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: subjecte,
    html: htmlTemplate
  })
}

module.exports = {
  sendMail,
};