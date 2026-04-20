const cloudinary = require("../config/cloudinary");
const { cloudinaryModelsFolder } = require("../config/guardEnv");
const streamifier = require("streamifier");

const uploadModelToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: cloudinaryModelsFolder,
        resource_type: "raw",
      },
      (err, result) => {
        if (err) return reject(err);

        resolve(result);
      },
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

module.exports = {
  uploadModelToCloudinary,
};
