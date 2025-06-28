const ProcedimentsService = require('../services/proceduresService');
const CloudinaryService = require('../services/cloudinary');

const getProcediments = async (req, res) => {
  try {
    const procediments = await ProcedimentsService.getProcedure();
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

const createProcediment = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    let mediaUrls = [];

    if (req.file){
      const fileBuffer = req.file.buffer;
      const urlImg = await CloudinaryService.uploadImage(fileBuffer);
      mediaUrls = [urlImg];
      const newProcedure = await ProcedimentsService.createProcedure({ ...req.body, media: mediaUrls });
      return res.status(201).json({
        method: "createProcediment",
        message: "Procediment created successfully",
        procediment: newProcedure,
      });
    }
    const newProcediment = await ProcedimentsService.createProcedure(req.body);
    return res.status(201).json({
      method: "createProcediment",
      message: "Procediment created successfully",
      procediment: newProcediment,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "createProcediment",
      message: "Server Error",
    });
  }
}

module.exports = {
  getProcediments,
  createProcediment
};
