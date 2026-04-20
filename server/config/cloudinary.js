const { cloudinaryName, cloudinaryApiKey, cloudinarySecret } = require("./guardEnv");
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinarySecret,
});

module.exports = cloudinary;
