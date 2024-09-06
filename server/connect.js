import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const url=process.env.DB_URI;
const connectDB=async()=>{
    try{
        const con=await mongoose.connect(url,{
           
        });
        console.log("MongoDB connected")
    }catch(error){
       console.error(error);
       process.exit(1);
    }
}

export default connectDB;