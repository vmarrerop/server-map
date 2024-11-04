import { v2 as cloudinary } from "cloudinary";

const CLOUD_NAME = "dexnz8ovy";
const API_KEY = "858828233766297";
const API_SECRET = "louy6_ahr2mEweTfXHUlMIvDV48";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "posts",
  });
};

export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};