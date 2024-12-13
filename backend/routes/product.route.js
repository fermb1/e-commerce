import express from 'express';
import { 
    createProduct, 
    deleteProduct, 
    getAllProducts, 
    getFeatureProducts, 
    getProductsByCategory, 
    getRecomendedProduct, 
    toggleFeaturedProduct } from '../controlers/product.controler.js';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts)
router.get("/featured", getFeatureProducts)
router.get("/category/:category", getProductsByCategory)
router.get("/recomendations", protectRoute, getRecomendedProduct)
router.post('/', protectRoute, adminRoute, createProduct)
router.patch('/:id', protectRoute, adminRoute, toggleFeaturedProduct)
router.post('/:id', protectRoute, adminRoute, deleteProduct)
export default router