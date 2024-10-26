const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (filePath) => {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: 'image', // Handle only images
        transformation: [{ width: 800, height: 600, crop: 'limit' }], // Resize with limits
      });
      return result.secure_url; // Return the public URL of the uploaded image
    } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      throw error;
    }
};
  
module.exports = uploadImage;