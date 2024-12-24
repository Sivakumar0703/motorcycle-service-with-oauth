import userModel from "../Models/userModel.js"
import {hashPassword, hashCompare,createToken} from "./auth.controller.js";
import nodemailer from "nodemailer";


//userName,email,mobile,password,role

// get all user
export const getUser = async(req,res)=>{
    try {
        let user = await userModel.find();
        res.status(200).json({user,message:"done"})
    } catch (error) {
        res.send({message:"unable to get user data",error})
    }
}


// new user registration
export const register = async (req, res) => {   
    const {userName , mobile , email , password } = req.body

    try {

        let hashedPassword = await hashPassword(req.body.password)
        req.body.password = hashedPassword

        let user = await userModel.findOne({ email: req.body.email })
        
        if (!user) {
            const newUser = new userModel ({
                userName,
                email,
                mobile,
                password : hashedPassword
            })
          //  let user = await userModel.create(req.body);// get data from body(front end)
          await newUser.save();
            res.status(201).json({
                message: "Signup successfull"
            })
        } else {
            res.status(400).json({ message: "user already exist!" })
            console.log(user)
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })

    }

}


// registered user login
export const login = async (req, res) => {
    try {
        
        let user = await userModel.findOne({ email: req.body.email });

        if (user) {
            
            if(await hashCompare(req.body.password , user.password)){
                //create token
                let token = await createToken({
                    userName:user.userName,
                    email:user.email,
                    id:user._id,
                    role:user.role
                })
                let userdata = await({
                    userName:user.userName,
                    email:user.email,
                    id:user._id,
                    role:user.role
                })

                res.status(200).json({
                    message: "Login successfull",
                    token,
                   userdata     
                })
                
            } else {
                res.status(400).json({ message: "invalid password" })
            }
        } else {
            res.status(400).json({ message: "Wrong Email Id" })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!",
            error: error
            
        })

    }

}




// logout user
export const logout = async(req,res) => {
    try {
         req.logout((err) => {
            if(err){
                res.status(500).json({message:"failed to logout"})
            }  
            res.status(200).json({message:"logout successful"}) 
        }) // from passport - removing the user data from session
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error" , error})
    }
}


// google auth
export const auth = async(req,res) => {
    try {
        res.status(200).json({message:"please wait".toUpperCase()})
    } catch (error) {
        res.status(500).json({message:"authentication failed.try later".toUpperCase(),error})
    }
}


// google redirected
export const redirect = async(req,res) => {
    try {  
        console.log('redirect - session',req.session)
        console.log('response headers : ' , res.getHeaders())
        res.redirect(process.env.FRONTEND_URL)
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
}


// access user data from cookie and pass it to client(browser)
export const getUserDataFromCookie = async(req,res) => {
    console.log('session',req.session);
    try {
       const profile = req.user;   
       if(!profile){
        return res.status(500).json({message:"not able to find user data..."});
       } 
       const user = {
        userName:profile.userName,
        email:profile.email
       }
       res.status(200).json({success:true,message:"user data found",user,profile})
    } catch (error) {
        res.status(500).json({message:"internal server error",error})
    }
}


// contact page - mail
export const sendMail = async(req , res) => {
    const contact_us_msg = req.body;
    console.log(contact_us_msg)
    try {
        const transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : process.env.USER ,
                pass : process.env.PASS
            }
        })
        const mailOption = {
            from : process.env.USER , // mail id of the respective client page(web page)
            to : process.env.RECEIVING_MAIL_ID ,  // to receive mail - it shows the client req msg
            subject : 'Online Bike Service' ,
            html : 
            `
             <li> <h4> REQUEST/FEEDBACK FROM CLIENT </h4> </li> <ul>
             <li> <p> Client Name : ${contact_us_msg.userName} </p> </li>
             <li> <p>  Email : ${contact_us_msg.email} </p> </li>
             <li> <p>  Mobile Number : ${contact_us_msg.mobile} </p> </li>
             <li> <p> Client Request/Feedback : ${contact_us_msg.message} </p> </li>
            </ul> `
        }
        transporter.sendMail(mailOption , (error , info) => {
                 if(error){
                     console.log(error);
                     res.status(404).json({message:'something went wrong.'})
                 } else {
                    console.log(`Email sent successfully : ${info.response}`)
                    res.status(200).send('mail sent successfully')
                 }
        })
        transporter.close()
    } catch (error) {
        res.status(500).json({message: "Internal Server Error!", error: error , spot:"error in nodemailer"})
    }
}


// forgot password - otp generation
export const forgotPassword = async(req,res) => {

    const user = await userModel.findOne({email:req.body.email}); 
    console.log(user , 'user')

    if(!user){
        return res.status(404).json({message:'user not found'})
    }

     user.resetPassword = Math.random().toString(36).slice(-8); // Generate OTP 
     user.resetPasswordExpires = Date.now() + 900000; // expire time 15 minutes 

     await user.save();

     // sending mail to reset password
     const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : process.env.USER ,
            pass : process.env.PASS
        }
    })
    const mailOption = {
        from : process.env.USER , 
        to : user.email, // user email
        subject:'PASSWORD RESET REQUEST',
        text:` Hi , ${user.userName} \n Forgot Your Password? \n We received a reset password request from your account \n\n
                Your OTP for ${user.email} is ${user.resetPassword} \n OTP expires in 15 minutes `
    }

    transporter.sendMail(mailOption , (error , info) => {
        if(error){
            res.status(404).json({message:'something went wrong.'})
        } else {
           res.status(200).json({message:'mail sent successfully'  , info})
        }
})
transporter.close()

}


// reset password using otp
export const resetPassword = async(req,res) =>{
    const {passcode} = req.params;
    console.log('code' , passcode)
    const {password} = req.body;
    console.log(Date.now() , Date.now()+3600000)

    const user = await userModel.findOne({
        resetPassword:passcode,
        resetPasswordExpires:{$gt:Date.now()}
    })

    
    if(!user){
        return res.status(400).json({message:'OTP EXPIRED / OTP MISMATCH'})
    }

    const hashedPassword = await hashPassword(password)
    user.password = hashedPassword;
    user.resetPassword = '';
    user.resetPasswordExpires = '';

    await user.save();

    res.status(200).json({message:'reset passsword successful'})

}


