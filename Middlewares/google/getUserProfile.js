import passport from "passport";


const getUserDataFromGoogle = async(req,res,next) => {
    try {
        passport.authenticate('google')
        // passport.authenticate('google' , { failureRedirect: '/login' })
        console.log('redirect')
        next()
    } catch (error) {
       res.status(500).json({message:"error in google authentication".toUpperCase()}) 
    }
}

export default getUserDataFromGoogle