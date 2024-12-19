import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({


  name: { 
    type: String,
  },

  mobile: {
    type: String,
  },

  email: {
    type: String,
  },

  bike: {
    type: String,
  },

  model: {
    type: String,
  },

  address1: {
    type: String,
  },

  address2: {
    type: String,
  },

  pincode: {
    type: String,
  },

  serviceType: {
    type: String,
  },

  time: {
    type: String,
  },

  serviceDate: {
    type: String,
  },

  homeService:{
    type:Boolean
  },

  userId:{
    type:String
  },

  createdOn: {
    type: Date,
    default: Date.now()
  },
  updatedOn: {
    type: Date,
    default: Date.now()
  },
  paid:{
    type:String
  }
})

const bookingModel = mongoose.model('bookings', bookingSchema);
export default bookingModel