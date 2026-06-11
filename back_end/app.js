
import express from 'express';
import cors from "cors";
import dotenv from "dotenv"
import morgan from 'morgan';
import helmet from "helmet";
import cookieParser from 'cookie-parser';
import userRouter from "./routes/user.routes.js"

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true }))
app.use(cors(
    {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }
));

app.use(morgan("dev"));
app.use(helmet())


app.get("/",(req,res)=>{
    return res.send("The backend is working !")
})

app.use("/api/v1/user", userRouter)



export {app}