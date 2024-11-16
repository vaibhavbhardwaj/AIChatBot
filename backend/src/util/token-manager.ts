import jwt from 'jsonwebtoken'
import {COOKIE_NAME} from './constants.js'

export const createToken = (id:string,email:string,expireIn)=>{
    const payload = {id,email}
    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"7d"})
    return token
}

export const verifyToken = async(req,res,next)=>{
    console.log("inside verify token")
    const token = req.signedCookies[`${COOKIE_NAME}`]
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        console.log(payload.id)
        req.user = { userId: payload.id, userEmail:payload.email};
        return next();
        
    } catch (error) {
        return res.status(401).json({ message: "Token Expired" });
    }
    
   
}