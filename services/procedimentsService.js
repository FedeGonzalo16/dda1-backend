const Procediment = require("../db/models/Procedure");

const getProcediments = async () => {
    return await Procediment.find();
  };

module.exports = {
  getProcediments
}