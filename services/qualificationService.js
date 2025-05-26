const { Qualifications } = require("../db/database");

const getQualifications = async () => {
    return await Qualifications.find();
  };

module.exports = {
  getQualifications
}