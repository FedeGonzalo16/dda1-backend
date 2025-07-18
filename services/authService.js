const User = require("../db/models/User");
const UserService = require('./usersService');
const VerificationCode = require("../db/models/VerificationCode");

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

const createVerificationCode = async (email, code) => {
  try {
    const verificationCode = new VerificationCode({
      email,
      code
    });
    await verificationCode.save();
  } catch (err) {
    console.error("Error creating verification code:", err);
    throw new Error("Error creating verification code");
  }
}

const verifyCode = async (email, code) => {
  try {
    const verificationCode = await VerificationCode.find ({ email, code });
    if (!verificationCode || verificationCode.length === 0) {
      throw new Error("Invalid verification code.");
    }
    else{
      await VerificationCode.deleteOne({ _id:verificationCode[0]._id });
      return true;
    }

    }
  catch (err) { 
    console.error("Error verifying code:", err);
    throw new Error("Error verifying code");
  }
}

const resetPassword = async (email, newPassword) => {
  try {
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found. Invalid email.");
    }
    user.password = newPassword; // Update the password
    await user.save(); // Save the updated user
    return true;
  } catch (err) {
    console.error("Error resetting password:", err);
    throw new Error("Error resetting password");
  }
}

module.exports = {
  hasValidateCredentials,
  getUserByEmail,
  createVerificationCode,
  verifyCode,
  resetPassword
}