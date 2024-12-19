import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema({

    bikeCompany : {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    cc : {
        type: String,
        required: true 
    },
    image :{
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    updatedOn: {
        type: Date,
        default: Date.now()
    },
})

const bikeModel = mongoose.model('bikes', bikeSchema);
export default bikeModel