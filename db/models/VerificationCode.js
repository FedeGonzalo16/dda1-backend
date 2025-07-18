const mongoose = require('mongoose');

const verificationCodeSchema = new mongoose.Schema({
  email: { type: String, required: true }, // correo del usuario
  code: { type: String, required: true },  // código de 6 dígitos
  createdAt: { type: Date, default: Date.now, expires: 300 } // expira en 5 minutos (300 seg)
});

module.exports = mongoose.model('VerificationCode', verificationCodeSchema);