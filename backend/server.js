import express from "express";
import dotenv from "dotenv";

//routes
import authRoutes from "./routes/auth.js"
import { connectDB } from "./lib/db.js";
dotenv.config();

const app = express()
//const PORT = 5000;
const PORT = process.env.PORT || 5000;

app.use(express.json())

app.use("/api/auth", authRoutes)
app.listen(PORT, () => {
    console.log(`Server running on port https://localhost` + PORT)
    connectDB();
})

console.log(process.env.PORT)

//