import { v2 as cloudinary } from "cloudinary";

const CLOUD_NAME = "do3ihoqvi";
const API_KEY = "628996384542217";
const API_SECRET = "JTAXg5aKV5gEDBC1F0ooHfaQt3c";

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