import dotenv from "dotenv";
dotenv.config();

import cloudinary from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const streamUpload = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      {
        folder: folder,
        quality: "auto",
        width: 800,
        height: 600,
        crop: "limit",
        format: "webp",
        fetch_format: "auto",
      },
      (error, result) => {
        if (error) {
          if (process.env.NODE_ENV !== "production") {
            console.error("Cloudinary error:", error);
          }
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    Readable.from(fileBuffer).pipe(stream);
  });
};

const uploadImage = async (file, folder) => {
  if (!file || !file.buffer) {
    throw new Error("File buffer is missing");
  }
  const result = await streamUpload(file.buffer, folder);
  return result;
};

async function deleteCloudinaryImage(publicId) {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
  }
}

export { uploadImage, deleteCloudinaryImage };
