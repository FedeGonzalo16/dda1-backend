require("dotenv").config();
const bcrypt = require("bcrypt");
const {User} = require("../db/db");

class AuthService {
    //Lo mismo para mongo
  async hasValidateCredentials(email, password) {
    try {
      const user = await User.findOne({ where: {email:email  }});
      if (!user) {
        return false;
      }
      console.log(user);
      const isPasswordValid = await bcrypt.compare(password, user.contrasenia);
      if(isPasswordValid){
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