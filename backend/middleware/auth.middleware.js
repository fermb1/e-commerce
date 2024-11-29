import jwt from 'jsonwebtoken';
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