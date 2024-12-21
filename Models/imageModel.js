import mongoose from "mongoose"


const pictureSchema = new mongoose.Schema({

    image: {
        type:String
    },

    email: {
        type: String,
        unique:true
    },

    isFromSocialmedia:{
        type:Boolean,
        default:false
    }

})

const imageModel = mongoose.model('latestimages', pictureSchema);
export default imageModel