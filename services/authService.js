require("dotenv").config();
const User = require("../db/models/User");

class AuthService {
    //Lo mismo para mongo
  async hasValidateCredentials(email, password) {
    try {
      const user = await User.findOne({ where: {email:email  }});
      if (!user) {
        return false;
      }
      console.log(user);
      if(password === user.contrasenia) {
        return true;
      }
      return false
    } catch (err) {
      console.log(err);
      throw new Error("Error in credentials validation");
    }
  }
}

module.exports = new AuthService();