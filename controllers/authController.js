const AuthService = require('../services/authService');
const MailService = require('../services/mail');
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Obtener el usuario autenticado
    const user = await AuthService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        message: "User not found. Invalid email.",
      });
    }

    // Validar credenciales
    const isUserRegistered = await AuthService.hasValidateCredentials(email, password);
    if (!isUserRegistered) {
      return res.status(401).json({
        message: "Unauthorized: Invalid password.",
      });
    }

    // Respuesta exitosa
    return res.status(200).json({
      status: 200,
      message: "Login successfully",
      user:user
    });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({
      method: "login",
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const sendRecoveryCode = async (req, res) => {
  try {
    const { email } = req.body;
    // Verificar si el usuario existe
    const user = await AuthService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        message: "User not found. Invalid email.",
      });
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await AuthService.createVerificationCode(email, code);
    await MailService.sendMail(
      email,
      "Codigo de recuperación",
      `<p>Tu codigo es: <strong>${code}</strong></p>`
    );
    return res.status(200).json({
      status: 200,
      message: "Recovery code sent successfully",
    });
  } catch (err) {
    console.error("Error sending recovery code:", err);
    return res.status(500).json({
      method: "sendRecoveryCode",
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await AuthService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        message: "User not found. Invalid email.",
      });
    }

    const verificationCode = await AuthService.verifyCode(email,code);

    if (!verificationCode) {
      return res.status(400).json({
        message: "Invalid verification code.",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Verification code is valid",
    });
  } catch (err) {
    console.error("Error verifying code:", err);
    return res.status(500).json({
      method: "verifyCode",
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    await AuthService.resetPassword(email, newPassword);
    return res.status(200).json({
      status: 200,
      message: "Password reset successfully",
    });
  } catch (err) {
    console.error("Error resetting password:", err);
    return res.status(500).json({
      method: "resetPassword",
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = {
  login,
  sendRecoveryCode,
  verifyCode,
  resetPassword,
}