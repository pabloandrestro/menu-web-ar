require("dotenv").config();

const guardCloudinaryName = (cloudinaryName) => {
  if (!cloudinaryName) {
    throw new Error("Environment variable CLOUDINARY_NAME is required.");
  }

  return cloudinaryName;
};

const guardCloudinaryApiKey = (apiKey) => {
  if (!apiKey) {
    throw new Error("Environment variable CLOUDINARY_API_KEY is required.");
  }

  return apiKey;
};

const guardCloudinarySecret = (secret) => {
  if (!secret) {
    throw new Error("Environment variable CLOUDINARY_SECRET is required.");
  }

  return secret;
};

module.exports = {
  cloudinaryName: guardCloudinaryName(process.env.CLOUDINARY_NAME),
  cloudinaryApiKey: guardCloudinaryApiKey(process.env.CLOUDINARY_API_KEY),
  cloudinarySecret: guardCloudinarySecret(process.env.CLOUDINARY_SECRET),
};
