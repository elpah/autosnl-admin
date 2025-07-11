import cloudinary from "cloudinary";
import { Readable } from "stream";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const streamUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      {
        folder: "zaurautosimages",
        quality: "auto",
        width: 800,
        height: 600,
        crop: "limit",
        format: "webp",
        fetch_format: "auto",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary error:", error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    Readable.from(fileBuffer).pipe(stream);
  });
};

const uploadImage = async (file) => {
  if (!file || !file.buffer) {
    throw new Error("File buffer is missing");
  }
  const result = await streamUpload(file.buffer);
  return result;
};

export { uploadImage };