import express from "express";
import { auth, forgotPassword, getUser, getUserDataFromCookie, login, logout, redirect, register, resetPassword, sendMail } from "../Controllers/user.controller.js";
import passport from "passport";

const userRouter = express.Router();


userRouter.get('/' , getUser);

// google 
userRouter.get('/auth/google' , passport.authenticate('google'), auth );
userRouter.get('/oauth/google/redirect' , 
    passport.authenticate('google',{ failureRedirect: `${process.env.FRONTEND_URL}/login`}) ,
    redirect 
); // takes the code and fetch data from google 

userRouter.post('/signup', register);
userRouter.post('/login' , login );
userRouter.get('/access_user_data' , getUserDataFromCookie );
userRouter.post('/send_mail',sendMail);
userRouter.post('/forgot_password' , forgotPassword);
userRouter.post('/reset_password/:passcode' , resetPassword);
userRouter.post('/logout' , logout);
userRouter.get('/auth/github' , passport.authenticate('github')   , auth );
userRouter.get('/oauth/github/redirect' , passport.authenticate('github',{ failureRedirect: `${process.env.FRONTEND_URL}/login`})  , redirect );

export default userRouter