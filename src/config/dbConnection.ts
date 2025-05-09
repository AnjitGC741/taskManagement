import mongoose from "mongoose";
import env from "./env";

export const connectToDB = async ()=>{
    const connectionUrl = env.connectionString;
    if(connectionUrl){
        try {
            await mongoose.connect(connectionUrl,{
                serverSelectionTimeoutMS: 30000,
                maxPoolSize: 10,
            });
            console.log('Connected to database successfully.')
        } catch (error) {
            console.log(error);
        }
    }else{
        console.log('Please provide MongoDB Connection URL');
    }
}