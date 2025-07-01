const User = require("../db/models/User");
const UserService = require('./usersService');

const hasValidateCredentials = async (email, password) => {
  try {
    const user = await User.findOne({email});
    
    if (!user) {
      return false;
    }
    //console.log(user);
    if(password === user.password) {
      return true;
    }
    return false
  } catch (err) {
    console.log(err);
    throw new Error("Error in credentials validation");
  }
}
const getUserByEmail = async (email) => {
  try{
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      return false;
    }
    return user;
  }catch(err){
    throw new Error("Error al encontrar al usuario")
  }
}

module.exports = {
  hasValidateCredentials,
  getUserByEmail
}