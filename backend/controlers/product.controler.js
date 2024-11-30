import Product from "../../models/product.model.js"
import cloudinary from "../lib/cloudnary.js";
import { redis } from "../lib/redis.js";

export const getAllProducts = async (req, res) => {
        try {
            const products = await Product.find({});
            res.json({ products })

        } catch (error) {
            console.log('error in getAllproducts controller', error.message)
            res.status(500).json({ message: 'server error', error: error.message})
            }   
}

export const getFeatureProducts = async (req, res) => {
    try {
        let featuredProducts = await redis.get('featured_products')
        if (featuredProducts) {
            return res.json(JSON.parse(featuredProducts))
        }


        featuredProducts = await Product.find({isFeatured:true}).lean()

        if (!featuredProducts) {
            return res.status(404).json({ message: 'no featured products found'})
        }

        await redis.set('featured_products', JSON.stringify(featuredProducts))
    } catch (error) {
        console.log('error in getFeaturedProducts controller', error.message);
        res.status(500).json({ message: 'server error', error: error.message})
    }
}


export const createProduct = async (req, res) => {
    try {
        const {name, description, price, image, category} = req.body;

        let cloudinaryResponse = null;

        if (image) {
            await cloudinary.uploader.upload(image,{folder:'products'})
        }
        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            category
        })
        res.status(201).json(product)
    } catch (error) {
        console.log('error in createProduct controller', error.message)
        res.status(500).json({ message: 'server error', error: error.message})
    }
    
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.param.id)

        if (!product) {
            return res.status(404).json({ message: 'product not found'})
        }
        if (Product.image) {
            const publicId = Product.image.split('/').pop().split('.')[0]
        try {
            await cloudinary.uploader.destroy(`products/${publicId}`);
            console.log('deleted immage from cloudinary')
        } catch (error) {
            console.log('error deleting image from cloudinary', error)
        }
        }
        await Product.findByIdAndDelete(req.params.id)
        res.json({ message: 'product deleted successfully'})
    } catch (error) {
        console.log('error in deleteProduct controller', error.message)
        res.status(500).json({ message: 'server error', error: error.message})
    }
}   

export const getRecomendedProduct = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: {size:3}
            },
            {
                $project:{
                    __id:1,
                    name:1,
                    description:1,
                    image:1,
                    price:1
                }
            }
        ])
        res.json(products)
    } catch (error) {
        console.log('error in getRecomendedProducts controller', error.message)
        res.status(500).json({ message: 'server error', error: error.message})
    }
}