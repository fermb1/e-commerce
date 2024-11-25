import express from "express";
import dotenv from "dotenv";

//routes
import authRoutes from "./routes/auth.js"
dotenv.config();

const app = express()
//const PORT = 5000;
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes)


console.log(process.env.PORT)
app.listen(PORT, () => {
    console.log("server is running on https://localhost" + PORT)
});

