const Qualification = require("../db/models/Qualification");

const getQualifications = async () => {
    return await Qualification.find();
  };

const getQualificationsByRecipeId = async (recipeId) => {
    return await Qualification.find({ recipeId, isApproved: true }) // solo los aprobados
      .populate('author');
};

const createQualification = async (qualificationData) => {
    const newQualification = new Qualification(qualificationData);
    return await Qualification.create({  /* que se cree como no aprobado */
      ...qualificationData, 
      isApproved: false 
  });
};

const getPendingQualifications = async () => {
  return await Qualification.find({ isApproved: false })
  .populate('author');
};

const approveQualification = async (id) => {
  const qualification = await Qualification.findById(id);
  if (!qualification) {
    throw new Error('Qualification not found');
  }
  qualification.isApproved = true;
  return await qualification.save();
};

const getApprovedQualifications = async () => {
  return await Qualification.find({ isApproved: true })
  .populate('author');
};

module.exports = {
  getQualifications,
  getQualificationsByRecipeId,
  createQualification,
  approveQualification,
  getApprovedQualifications,
  getPendingQualifications
}