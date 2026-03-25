const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({  // <-- to configure cloudinary
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "wanderLust_DEV", // <-- folder name to store files
    allowedFormats: ["png", "jpg", "jpeg"], // <-- formats that are allowed
  },
});

module.exports = {
  cloudinary,
  storage,
};
