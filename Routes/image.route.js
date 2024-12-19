import express from "express";
import { getImage, updateImage, uploadImage } from "../Controllers/images.controller.js";
import upload from "../Services/multer/config.js";



const imageRouter = express.Router();

imageRouter.get('/' , getImage);
imageRouter.post('/upload/image' , upload.single('image') , uploadImage);
imageRouter.put('/update/profile/picture' , upload.single('image') , updateImage );


export default imageRouter
