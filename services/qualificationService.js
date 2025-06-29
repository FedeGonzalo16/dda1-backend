const Qualification = require("../db/models/Qualification");

const getQualifications = async () => {
    return await Qualification.find();
  };
const getQualificationsByRecipeId = async (recipeId) => {
    return await Qualification.find({ recipeId })
      .populate('author');
}
const createQualification = async (qualificationData) => {
    const newQualification = new Qualification(qualificationData);
    return await newQualification.save();
}

module.exports = {
  getQualifications,
  getQualificationsByRecipeId,
  createQualification,
}