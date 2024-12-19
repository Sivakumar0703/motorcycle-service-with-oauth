import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET ;


export const hashPassword = async(password)=>{
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword
}


export const hashCompare= async(password,hashedPassword)=> { // password = req.body.password(from Application) & hashedPassword = user.password(from DB)
    return await bcrypt.compare(password,hashedPassword)
}

export const createToken = async(payload) => { // name,email,id,role
    let token = await jwt.sign(payload,secretKey)
    return token
}


