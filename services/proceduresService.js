const Procediment = require("../db/models/Procedure");

const getProcedure = async () => {
    return await Procediment.find();
  };
const createProcedure = async (procedimentData) => {
    return await Procediment.create(procedimentData);
  };

module.exports = {
  getProcedure,
  createProcedure
}