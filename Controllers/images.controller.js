import imageModel from "../Models/imageModel.js"
import fs from "fs"

// get request
 export const getImage = async(req,res) => {
    try {
        const result = await imageModel.find();
        res.status(200).json({message:'data fetching done' , result})
    } catch (error) {
        res.status(400).json({message:'data fetching failed' , error:error})
    }
}

// post request
export const uploadImage =  async(req,res) => {
    console.log('file',req.file)
    try {
        const data = imageModel({
            image : req.file.filename,
            email : req.body.email,
            isGoogleImage:false
        })
        data.save()
        res.status(200).json({message:'success'})
    } catch (error) {
       res.status(400).json({message:'failed'})  
    }
}


// update request
export const updateImage = async(req,res) => {
    try {
        // deleting previous image from the server
         if(req.body.previousImage){
            console.log('old' , req.body.previousImage )
            fs.unlink(`./public/images/${req.body.previousImage}` , (error) => {
                if(error){
                    console.log(error)
                } else {
                    console.log('image deleted')
                }
             })
         } else {
            console.log('skipped')
         }
         
         // updating new image to the database 
        const image = req.file.filename;
        console.log(image , 'new');
        const update = await imageModel.updateOne({email:req.body.email} , {image:image} )
        res.status(200).json({message:'update success'})
        console.log(update)
    } catch (error) {
       res.status(400).json({message:'update failed' , error}) 
    }
} 


