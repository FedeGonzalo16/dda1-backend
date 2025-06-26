const AuthService = require('../services/authService');


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
