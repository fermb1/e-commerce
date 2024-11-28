 import mongoose from "mongoose";

 const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    image:{
        type:String,
        required:[true, 'image ir required']
    },
    category:{
        type:String,
        required:true
    },
    isFeatured:{
        type:String,
        default: false
    }
 },{timestamps:true});

 const Product = mongoose.model('product', productSchema)

 export default Product