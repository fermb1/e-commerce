import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getFeatureProducts, getRecomendedProduct } from '../controlers/product.controler.js';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts)
router.get("/featured", getFeatureProducts)
router.get("/recomendations", protectRoute, getRecomendedProduct)
router.post('/', protectRoute, adminRoute, createProduct)
router.post('/:id', protectRoute, adminRoute, deleteProduct)
export default router