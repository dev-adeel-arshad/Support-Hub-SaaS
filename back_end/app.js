
import express from 'express';
import cors from "cors";
import dotenv from "dotenv"
import morgan from 'morgan';
import helmet from "helmet";
import cookieParser from 'cookie-parser';
import userRouter from "./routes/user.routes.js"
import ticketsRouter from "./routes/tickets.routes.js";
import commentsRouter from "./routes/comments.route.js";

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


app.use("/api/v1/user", userRouter)
app.use("/api/v1/tickets", ticketsRouter)
app.use("/api/v1/comments", commentsRouter)



export {app}