import passport from "passport";


const getUserDataFromGoogle = async(req,res,next) => {
    try {
        passport.authenticate('google')
        next()
    } catch (error) {
       res.status(500).json({message:"error in google authentication".toUpperCase()}) 
    }
}

export default getUserDataFromGoogle