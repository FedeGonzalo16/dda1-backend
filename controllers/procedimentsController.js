const ProcedimentsService = require('../services/procedimentsService');

const getProcediments = async (req, res) => {
  try {
    const procediments = await ProcedimentsService.getProcediments();
    return res.status(200).json({
      method: "getProcediments",
      message: "Procedures retrieved successfully",
      procediments: procediments,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getProcediments",
      message: "Server Error",
    });
  }
};

module.exports = {
  getProcediments,
};
