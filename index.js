import express from "express";
import cors from "cors";
import "dotenv/config";
import ConnectDb from "./Database/configDB.js";
import bikeRouter from "./Routes/bike.route.js";
import userRouter from "./Routes/user.route.js";
import bookingRouter from "./Routes/booking.route.js";
import razorRouter from "./Routes/razorpay.route.js";
import "./Services/google/oAuthSetup.js"
import passport from "passport";
import session from 'express-session';
import imageRouter from "./Routes/image.route.js";
import priceRouter from "./Routes/price.route.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({ 
    origin: [process.env.FRONTEND_URL , 'http://localhost:3000'],
    methods: 'GET,POST,PUT,PATCH,DELETE', 
    credentials: true 
}));

app.use(session({ 
    secret:process.env.COOKIE_SECRET, 
    resave:false,
    saveUninitialized:false, 
    cookie:{ maxAge: 24 * 60 * 60 * 1000 , secure:true , sameSite:'none' } // 24 hours in milli-second
}))

app.use(passport.initialize())
app.use(passport.session())


app.use('/users' , userRouter);
app.use('/bikes' , bikeRouter);
app.use('/bookings' , bookingRouter);
app.use('/image' , imageRouter);
app.use('/razorpay' , razorRouter);
app.use("/service/price" , priceRouter);

ConnectDb()



app.listen(port , () => {
    console.log("server is running")
})