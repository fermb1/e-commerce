import express from 'express';
import { getAllProducts } from '../controlers/product.controler.js';

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts)

export default router