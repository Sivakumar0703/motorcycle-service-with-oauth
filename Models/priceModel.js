import mongoose from "mongoose"

const priceSchema = new mongoose.Schema({

generalServicePrice : {
    type : Object
},
repairServicePrice : {
    type : String
},
washServicePrice : {
    type : String
}

})

const priceModel  = mongoose.model('prices' , priceSchema);
export default priceModel