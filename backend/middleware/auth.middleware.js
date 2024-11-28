import jwt from 'jsonwebtoken';
import Users from '../../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(401).json({ message: 'unauthorized - no token provided'})
        }
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        const user = await Users.findById(decoded.userId).select('-password')

        if (!user) {
            
        }
    } catch (error) {
        
    }
}