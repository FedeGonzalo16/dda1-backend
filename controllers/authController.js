const AuthService = require('../services/authService');
const jwt = require('jsonwebtoken');
//Ver si implementar jwt

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let isUserRegistered = await AuthService.hasValidateCredentials(email, password);
    console.log(isUserRegistered);
    if (isUserRegistered) {
       const token = jwt.sign( user.toJSON(), process.env.PRIVATE_KEY, {
        expiresIn: "1d",
      });

      return res.status(200).json({
        status: 200,
        token,
        message: "Token created successfully"
      });
    } else {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "login",
      message: err.message,
    });
  }
};