import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const configCloudinary = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    } catch (error) {
        console.log(
            "Error while configuration of cloudinary!",
            error.message
        );
    }
};

configCloudinary();

const uploadOnCloudinary = async (localFilePath) => {
    try {
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        if (result) {
            fs.unlinkSync(localFilePath);
        }
console.log("The result from cloudinary is:",result)
        return result.url;
    } catch (error) {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        console.error(
            "Error while Uploading to cloudinary",
            error
        );

        return null;
    }
};

export { uploadOnCloudinary };