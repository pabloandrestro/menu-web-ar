const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinaryModelsFolder } = require("../config/guardEnv");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");

const storageModels = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: cloudinaryModelsFolder,
      resource_type: "raw",
      public_id: `${Date.now()}-${file.originalname}`,
      format: file.originalname.split(".").pop(),
    };
  },
});

const uploadModels = multer({
  storage: storageModels,
  limits: { fileSize: 30 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["glb"];
    const ext = file.originalname.split(".").pop();

    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten archivos .glb"));
    }
  },
}); // 30MB

module.exports = {
  uploadModels,
};
