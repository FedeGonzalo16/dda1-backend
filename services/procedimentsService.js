const { Procediments } = require("../db/database");

const getProcediments = async () => {
    return await Procediments.find();
  };

module.exports = {
  getProcediments
}