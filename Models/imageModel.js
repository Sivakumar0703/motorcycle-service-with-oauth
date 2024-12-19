import mongoose from "mongoose"


const pictureSchema = new mongoose.Schema({

    image: {
        type:String
    },

    email: {
        type: String
    },

    isGoogleImage:{
        type:Boolean,
        default:false
    }

})

const imageModel = mongoose.model('latestimages', pictureSchema);
export default imageModel