const AuthService = require('../services/authService');
const jwt = require('jsonwebtoken');
//Ver si implementar jwt
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar credenciales
    const isUserRegistered = await AuthService.hasValidateCredentials(email, password);
    if (!isUserRegistered) {
      return res.status(401).json({
        message: "Unauthorized: Invalid email or password.",
      });
    }

    // Obtener el usuario autenticado
    const user = await AuthService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Validar que la clave privada esté configurada
    if (!process.env.PRIVATE_KEY) {
      throw new Error("PRIVATE_KEY is not defined in environment variables.");
    }

    // Crear el token JWT
    const userPayload = user.toJSON ? user.toJSON() : { id: user.id, email: user.email };
    const token = jwt.sign(userPayload, process.env.PRIVATE_KEY, {
      expiresIn: "1d",
    });

    // Respuesta exitosa
    return res.status(200).json({
      status: 200,
      token,
      message: "Token created successfully",
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
