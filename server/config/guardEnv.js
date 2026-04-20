require("dotenv").config();

const requireEnv = (name) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Environment variable ${name} is required`);
  }

  return value;
};

module.exports = {
  cloudinaryName: requireEnv("CLOUDINARY_NAME"),
  cloudinaryApiKey: requireEnv("CLOUDINARY_API_KEY"),
  cloudinarySecret: requireEnv("CLOUDINARY_SECRET"),
  cloudinaryModelsFolder: requireEnv("CLOUDINARY_MODELS_FOLDER"),
};
