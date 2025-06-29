const QualificationsService = require('../services/qualificationService');

const getQualifications = async (req, res) => {
  try {
    const qualifications = await QualificationsService.getQualifications();
    return res.status(200).json({
      method: "getQualifications",
      message: "Qualifications retrieved successfully",
      qualifications: qualifications,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getQualifications",
      message: "Server Error",
    });
  }
};
const getQualificationsByRecipeId = async (req, res) => {
  const { recipeId } = req.params;
  try {
    const qualifications = await QualificationsService.getQualificationsByRecipeId(recipeId);
    return res.status(200).json({
      method: "getQualificationsByRecipeId",
      message: "Qualifications retrieved successfully",
      qualifications: qualifications,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getQualificationsByRecipeId",
      message: "Server Error",
    });
  }
}

const createQualification = async (req, res) => {
  try {
    const newQualification = await QualificationsService.createQualification(req.body);
    return res.status(201).json({
      method: "createQualification",
      message: "Qualification created successfully",
      qualification: newQualification,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "createQualification",
      message: "Server Error",
    });
  }
}

module.exports = {
  getQualifications,
  getQualificationsByRecipeId,
  createQualification
};
