const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dcqxs5i6e',
    api_key: '626684177174429',
    api_secret: 'o1onlkcGHqdOzXoeXTOV4H6uWUI',
});

//esto es mala practica, pero no puedo arreglar el error usando el env

const uploadImage = async (imageBuffer) => {

    const uploadResult = new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream((error, result) => {
                if (error) {
                    console.error('Error uploading to Cloudinary:', error);
                    reject(error.message);
                }
                resolve(result.secure_url);
            }).end(imageBuffer);
        })
        .then((result) => {
            return result;
        })

    return uploadResult;
};

module.exports = {
    uploadImage,
};