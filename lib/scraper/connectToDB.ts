import mongoose from "mongoose";


let isConnected = false; //variable to track the connection status 

export const connectToDB = async()=>{
    mongoose.set('strictQuery',true)

    if(!process.env.MONGODB_URL) return console.log("mongodb urrl is not defined");
    if(isConnected) return console.log("using existing db connection ")

    try{
        await mongoose.connect(process.env.MONGODB_URL)
        isConnected=true

        console.log('Mongodb Connected')
    }
    catch(error){
        console.log(error)
    }
}