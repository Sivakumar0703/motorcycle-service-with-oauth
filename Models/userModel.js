import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    userName:{
        type:String,
    },
    
    email:{
        type:String,   
        unique:true     
    },
    
    mobile:{
        type:String,
    },
    
    password:{
        type:String,
    },
    
    resetPassword:{
        type:String
    },
    
    resetPasswordExpires:{
        type:Date
    },
    
    role:{
        type:String,
        default:'user'
    },

    googleId:{
        type:String
    },

    githubId:{
        type:String
    },
    
    createdAt:{
        type:Date,
        default:Date.now
    }
    
})

const userModel = mongoose.model('users',userSchema);
export default userModel