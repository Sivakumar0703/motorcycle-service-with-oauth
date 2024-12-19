import passport from "passport";


const googleAuthentication = async(req,res) => {
    try {
        passport.authenticate('google' , 
        {
            scope:['profile','email']
        })(req,res,next);
        console.log('google auth')
     
    } catch (error) {
       res.status(500).json({message:"error in google authentication".toUpperCase() , error}) 
    }
}

export default googleAuthentication
