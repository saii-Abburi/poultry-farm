const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Cloudinary v2 config - reads from process.env (already loaded by index.js)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const isVideo = file.mimetype.startsWith('video/');
        return {
            folder: 'poultry_farm',
            resource_type: isVideo ? 'video' : 'image',
            allowed_formats: isVideo
                ? ['mp4', 'mov', 'avi', 'mkv', 'webm']
                : ['jpg', 'jpeg', 'png', 'webp', 'gif'],
        };
    },
});

const upload = multer({ storage });

module.exports = { upload, cloudinary };
