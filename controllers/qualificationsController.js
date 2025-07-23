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

const approveQualification = async (req, res) => { /* aprobacion de calificaciones */
  const { id } = req.params;

  try {
    const qualification = await QualificationsService.approveQualification(id);
    if (!qualification) {
      return res.status(404).json({
        method: "approveQualification",
        message: "Qualification not found",
      });
    }

    return res.status(200).json({
      method: "approveQualification",
      message: "Qualification approved successfully",
      qualification,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "approveQualification",
      message: "Server Error",
    });
  }
};

const getApprovedQualifications = async (req, res) => {
  try {
    const qualifications = await QualificationsService.getApprovedQualifications();
    return res.status(200).json({
      method: "getApprovedQualifications",
      message: "Approved qualifications retrieved successfully",
      qualifications,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getApprovedQualifications",
      message: "Server Error",
    });
  }
};

const getPendingQualifications = async (req, res) => {
  try {
    const qualifications = await QualificationsService.getPendingQualifications();
    return res.status(200).json({
      method: "getPendingQualifications",
      message: "Pending qualifications retrieved successfully",
      qualifications,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getPendingQualifications",
      message: "Server Error",
    });
  }
};

module.exports = {
  getQualifications,
  getQualificationsByRecipeId,
  createQualification,
  approveQualification, 
  getApprovedQualifications,
  getPendingQualifications
};
