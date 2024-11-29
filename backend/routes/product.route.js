import express from 'express';
import { getAllProducts, getFeatureProducts } from '../controlers/product.controler.js';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts)
router.get("/featured", getFeatureProducts)
router.post('/', protectRoute, adminRoute, createProduct)
export default router