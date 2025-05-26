const {validateResult} = require('express-validator');

const validateRequest = (req,res,next) =>{
    const errors = validateResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    } else{
        next();
    }
};

module.exports = validateRequest;