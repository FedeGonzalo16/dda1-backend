const QualificationsService = require('../services/qualificationsService');

class QualificationsController {

  async getQualifications(req, res) {
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
  }
}

module.exports = new QualificationsController();