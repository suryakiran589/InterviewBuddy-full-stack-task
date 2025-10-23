import express, { type Application } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import organizationRoutes from './routes/organization.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config()

const app:Application = express()

await connectDB()

app.use(cors())
app.use(express.json())

app.use('/organizations', organizationRoutes);
app.use('/users', userRoutes);

app.listen(3000,() =>{
    console.log("server running on port 3000")
})