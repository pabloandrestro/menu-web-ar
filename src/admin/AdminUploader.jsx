import { useRef, useState } from "react";
import { createImagenAsset, createModeloAsset } from "./api";
import styles from "./admin.module.css";

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dxpam0kqa";
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "HublabMenuWebAr";
const CLOUDINARY_UPLOAD_FOLDER = import.meta.env.VITE_CLOUDINARY_UPLOAD_FOLDER || "uploads";
const CLOUDINARY_MODELS_FOLDER = `${CLOUDINARY_UPLOAD_FOLDER}/models`;

function buildAssetId(fileName, prefix) {
  const baseName = fileName.replace(/\.[^/.]+$/, "").toLowerCase();
  const sanitized = baseName.replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
  const suffix = Date.now().toString(36);
  return `${prefix}_${sanitized || "asset"}_${suffix}`;
}

function buildAssetLabel(fileName) {
  return fileName.replace(/\.[^/.]+$/, "").trim() || "Archivo";
}

export default function AdminUploader({ onUploadComplete }) {
  const imageInputRef = useRef(null);
  const modelInputRef = useRef(null);

  const [imageFile, setImageFile] = useState(null);
  const [modelFile, setModelFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [modelUploading, setModelUploading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [modelURL, setModelURL] = useState("");
  const [error, setError] = useState("");

  const handleUploadError = (message) => {
    if (message.toLowerCase().includes("upload preset not found")) {
      return `Cloudinary no encuentra el preset "${CLOUDINARY_UPLOAD_PRESET}". Crealo como Unsigned en Settings > Upload > Upload presets.`;
    }
    return message;
  };

  const ensureCloudinaryConfig = () => {
    const missingVariables = [];
    if (!CLOUDINARY_CLOUD_NAME) missingVariables.push("VITE_CLOUDINARY_CLOUD_NAME");
    if (!CLOUDINARY_UPLOAD_PRESET) missingVariables.push("VITE_CLOUDINARY_UPLOAD_PRESET");

    if (missingVariables.length > 0) {
      setError(
        `Falta configurar: ${missingVariables.join(", ")}. Si acabas de editar .env, reinicia npm run dev.`
      );
      return false;
    }

    return true;
  };

  const uploadToCloudinary = async (file, resourceType, folder) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", folder);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload?.error?.message || "Error al subir archivo a Cloudinary");
    }

    return payload.secure_url;
  };

  const handleImageFileChange = (event) => {
    setImageFile(event.target.files?.[0] || null);
    setImageURL("");
    setError("");
  };

  const handleModelFileChange = (event) => {
    setModelFile(event.target.files?.[0] || null);
    setModelURL("");
    setError("");
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      setError("Selecciona una imagen primero.");
      return;
    }

    if (!ensureCloudinaryConfig()) return;

    setImageUploading(true);
    setError("");
    setImageURL("");

    try {
      const url = await uploadToCloudinary(imageFile, "image", CLOUDINARY_UPLOAD_FOLDER);
      const savedImage = await createImagenAsset({
        id: buildAssetId(imageFile.name, "img"),
        label: buildAssetLabel(imageFile.name),
        url,
      });

      setImageURL(savedImage.src || url);
      onUploadComplete?.(savedImage, "image");
    } catch (uploadError) {
      const message = uploadError?.message || "No se pudo subir la imagen";
      setError(handleUploadError(message));
    } finally {
      setImageUploading(false);
    }
  };

  const handleModelUpload = async () => {
    if (!modelFile) {
      setError("Selecciona un modelo .glb primero.");
      return;
    }

    if (!modelFile.name.toLowerCase().endsWith(".glb")) {
      setError("El modelo AR debe tener extensión .glb");
      return;
    }

    if (!ensureCloudinaryConfig()) return;

    setModelUploading(true);
    setError("");
    setModelURL("");

    try {
      const url = await uploadToCloudinary(modelFile, "raw", CLOUDINARY_MODELS_FOLDER);
      const savedModel = await createModeloAsset({
        id: buildAssetId(modelFile.name, "mdl"),
        label: buildAssetLabel(modelFile.name),
        url,
      });

      setModelURL(savedModel.src || url);
      onUploadComplete?.(savedModel, "model");
    } catch (uploadError) {
      const message = uploadError?.message || "No se pudo subir el modelo .glb";
      setError(handleUploadError(message));
    } finally {
      setModelUploading(false);
    }
  };

  return (
    <div className={styles.uploaderWrapper}>
      <div className={styles.uploaderContent}>
        <div className={styles.uploaderSection}>
          <h3 className={styles.uploaderTitle}>Imagen del menú</h3>

          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageFileChange}
            style={{ display: "none" }}
          />

          <div className={styles.uploaderButtonGroup}>
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className={styles.btnSecondary}
            >
              Elegir imagen
            </button>

            <button
              type="button"
              onClick={handleImageUpload}
              disabled={imageUploading || !imageFile}
              className={styles.btnPrimary}
              style={{ opacity: imageUploading || !imageFile ? 0.6 : 1 }}
            >
              {imageUploading ? "Subiendo..." : "Subir imagen"}
            </button>
          </div>

          {imageFile && (
            <p className={styles.fileInfo}>
              {imageFile.name} ({(imageFile.size / 1024).toFixed(1)} KB)
            </p>
          )}

          {imageURL && (
            <div className={styles.uploadSuccess}>
              <p className={styles.successText}>Imagen subida correctamente.</p>
              <a href={imageURL} target="_blank" rel="noreferrer" className={styles.urlLink}>
                {imageURL}
              </a>
              <img src={imageURL} alt="Imagen subida" className={styles.previewImage} />
            </div>
          )}
        </div>

        <div className={styles.uploaderDivider} />

        <div className={styles.uploaderSection}>
          <h3 className={styles.uploaderTitle}>Modelo AR (.glb)</h3>

          <input
            ref={modelInputRef}
            type="file"
            accept=".glb,model/gltf-binary"
            onChange={handleModelFileChange}
            style={{ display: "none" }}
          />

          <div className={styles.uploaderButtonGroup}>
            <button
              type="button"
              onClick={() => modelInputRef.current?.click()}
              className={styles.btnSecondary}
            >
              Elegir modelo .glb
            </button>

            <button
              type="button"
              onClick={handleModelUpload}
              disabled={modelUploading || !modelFile}
              className={styles.btnPrimary}
              style={{ opacity: modelUploading || !modelFile ? 0.6 : 1 }}
            >
              {modelUploading ? "Subiendo..." : "Subir modelo AR"}
            </button>
          </div>

          {modelFile && (
            <p className={styles.fileInfo}>
              {modelFile.name} ({(modelFile.size / 1024).toFixed(1)} KB)
            </p>
          )}

          <p className={styles.modelNote}>Acepta solo archivos .glb</p>

          {modelURL && (
            <div className={styles.uploadSuccess}>
              <p className={styles.successText}>Modelo .glb subido correctamente.</p>
              <a href={modelURL} target="_blank" rel="noreferrer" className={styles.urlLink}>
                {modelURL}
              </a>
            </div>
          )}
        </div>
      </div>

      {error && <p className={styles.uploaderError}>{error}</p>}
    </div>
  );
}