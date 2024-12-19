import express from "express";
import { forgotPassword, getUser, getUserDataFromCookie, googleAuth, googleRedirect, login, logout, register, resetPassword, sendMail } from "../Controllers/user.controller.js";
import googleAuthentication from "../Middlewares/google/auth.js";
import getUserDataFromGoogle from "../Middlewares/google/getUserProfile.js";
import passport from "passport";

const userRouter = express.Router();


userRouter.get('/' , getUser);
userRouter.get('/auth/google' , passport.authenticate('google' , 
    {
        scope:['profile','email']
    })   , googleAuth );
userRouter.get('/oauth/google/redirect' , passport.authenticate('google',{ failureRedirect: 'http://localhost:3000/login' , failureFlash:true })  , googleRedirect ); // takes the code and fetch data from google 
userRouter.post('/signup', register);
userRouter.post('/login' , login );
userRouter.get('/access_user_data' , getUserDataFromCookie );
userRouter.post('/send_mail',sendMail);
userRouter.post('/forgot_password' , forgotPassword);
userRouter.post('/reset_password/:passcode' , resetPassword);
userRouter.get('/logout' , logout);


export default userRouter