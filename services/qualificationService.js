const Qualification = require("../db/models/Qualification");

const getQualifications = async () => {
    return await Qualification.find();
  };

module.exports = {
  getQualifications
}