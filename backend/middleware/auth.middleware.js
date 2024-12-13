
import Users from '../../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(401).json({ message: 'unauthorized - no token provided'})
        }
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        const user = await Users.findById(decoded.userId).select('-password')

        if (!user) {
            return res.status(401).json({ message: 'user not found'})
        }
        req.user = user;
        next()
        } catch (error) {
            if(error.name === 'tokenExpiredError'){
                return res.status(401).json({ message: 'unauthorized - access token expired'})
            }
            throw error
        }
    } catch (error) {
        console.log('error in protectRoute middleware', error.message)
        return res.status(401).json({ message: 'unauthorized - invalid access token'})
    }
}
export const adminRoute = (req, res, next) => {
    if(req.user && req.user.role === "admin"){
        next()
    }else{
        return res.status(403).json({ message: 'Access denied - Admin only'})
    }
}


export const getCartProducts = async (req, res) => {
    try {
        const products = await products.find({_id:{$in:req.user.cartItems}})
        const cartItems = products.maps(Product => {
            const item = req.user.cartItems.find(cartItems => cartItems.id === Product.id)
            return {...product.toJSON(),quantity:item.quantity}
        })
        res.json(cartItems)

    } catch (error) {
       console.log('error in getCartProducts controller', error.message)
       res.status(500).json({ message: 'server error',  error: error.message}) 
    }
}