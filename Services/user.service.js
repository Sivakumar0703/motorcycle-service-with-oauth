import userModel from "../Models/userModel.js";
import imageModel from "../Models/imageModel.js";

export const findOrCreateUser = async(profile) => {
    try {
        if(!profile){
            throw new Error("not able to fetch user data from google")
        }
        const user = await userModel.findOne({googleId:profile.id});
        // check the user is already exists
        if(user){
           return user
        }
        // if new user
        const newUserData = {
            userName:profile.displayName,
            email:profile.emails[0]?.value,
            googleId:profile.id
        }
        const newUser = await userModel.create(newUserData);
        const profileImage = {
            image: profile.photos[0]?.value,
            email: profile.emails[0]?.value,
            isGoogleImage:true
        }
        await imageModel.create(profileImage)
        return newUser
    } catch (error) {
        throw error
    }
}

// find user by Id
export const findUser = async(id) => {
    try {
        const user = await userModel.findById(id);
        // if user not found
        if(!user){
            throw new Error("user not found".toUpperCase());
        }
        return user
    } catch (error) {
        throw error
    }
}