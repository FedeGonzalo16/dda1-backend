const ProcedimentsService = require('../services/procedimentsService');

class ProcedimentsController {

  async getProcediments(req, res) {
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
  }
}

module.exports = new ProcedimentsController();