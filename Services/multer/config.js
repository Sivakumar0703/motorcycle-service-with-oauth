import multer from "multer"
import path from "path"




// storage engine 
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

// setting storage
const upload = multer({storage:storage});

export default upload