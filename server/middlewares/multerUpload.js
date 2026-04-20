const multer = require("multer");

const uploadModels = multer({
  storage: multer.memoryStorage(),
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
