
import {app} from "./app.js";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
dotenv.config();

const port = process.env.PORT;
const mongoUrl = process.env.DATABSE_URL;
const startServer = async ()=>{
    try {
        
        app.listen(port,async ()=>{
        console.log('The server has been started');
        await mongoose.connect(mongoUrl);
        })
    } catch (error) {
        console.log('Error while connection !!',error.message);
        
    }
}

startServer();
