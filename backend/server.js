import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//routes
import authRoutes from "./routes/auth.js"
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"
import { connectDB } from "./lib/db.js";
import couponRoutes from './routes/coupons.route.js'
import paymentsRoutes from './routes/payment.route.js'
dotenv.config();

const app = express()
//const PORT = 5000;
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes)
app.use("/api/products",productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/coupons", couponRoutes)
app.use("/api/payments", paymentsRoutes )
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:` + PORT)
    connectDB();
})
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la página principal!');
});

console.log(process.env.PORT)

//