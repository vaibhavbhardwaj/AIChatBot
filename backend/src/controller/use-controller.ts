import User from "../model/User.js";
import {compare, hash} from 'bcrypt'
import { createToken } from "../util/token-manager.js";
import { COOKIE_NAME } from "../util/constants.js";

const getAllUser = async(req,res)=>{
    console.log("get all users")
    const data = await User.find()
    return res.status(200).json({mesage:"ok",data})
}

const signUp = async(req,res)=>{
    console.log("here",req.body)
    try {
        const {username,password,email} = req.body
        const hashedPassword = await hash(password,10)
        const userAlreadyExists = await User.findOne({email})
        if(userAlreadyExists){
            throw new Error('email already in use')
        }
        const user = new User({name:username,email:email,password:hashedPassword})
        await user.save()
        return res.status(201).json({message:"ok",user:user})
    } catch (error) {
        res.status(401).json({error:error.message})
    }
  
    
}

const login = async(req,res)=>{
    console.log("here",req.body)
    try { 
        const {password,email} = req.body
        const user = await User.findOne({email})
        if(!user){
            throw new Error("user does not exist")
        }
        const isPasswordCorrect = await compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(403).json({error:"password incorrect"})
        }
        res.clearCookie(COOKIE_NAME, {
                                    path:'/' , 
                                    domain:'localhost', 
                                    signed: true,
                                    httpOnly:true
        })
        const token = createToken(user.id.toString(), user.email, "7d")
        const expires = new Date()
        expires.setDate(expires.getDate() + 7)

        res.cookie(COOKIE_NAME,token,{
                                    path:'/' , 
                                    domain:'localhost', 
                                    expires,
                                    signed: true,
                                    httpOnly:true}
                    )

        return res.status(201).json({message:"ok", user:user.id.toString()})
    } catch (error) {
        res.status(401).json({error:error.message})
    }
  
    
}
const verifyUser = async(req,res,next)=>{
    
    const id = req.user.userId
    const reqUserEmail = req.user.userEmail
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user.email === reqUserEmail){
            return res.status(200).json({ message: "OK", name: user.name, email: user.email });
        }else{
            return res.status(401).send("Permissions didn't match");
        }
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
    
}

export {getAllUser,signUp,login,verifyUser}