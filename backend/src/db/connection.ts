import { connect,disconnect } from "mongoose";



const connectToDb = async()=>{
    try {
        console.log(process.env.MONGODB_URL)
       await connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error)
        disConnectToDb()
        throw new Error (error)
    }
    
}

const disConnectToDb = async()=>{
    try {
        await disconnect()
    } catch (error) {
        throw new Error ("cannot disconnect to db")
    }
    
}


export {connectToDb}