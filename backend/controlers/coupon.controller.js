import Coupon from "../../models/coupons.js"

export const getCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({userId:req.user._id,isActive:true})
        res.json(coupon || null)
    } catch (error) {
        console.error('error in couponsController', error.message)
        res.status(500).json({ message: 'server error', error: error.message})
    }
}


export const valiateCoupon = async (req, res) => {
    try {
        const {code} = req.body;
        const coupon = await Coupon.findOne({code:code,userId:req.user._id,isActive:true})
        if (!coupon) {
           return res.status(404).json({message:'coupon not found'}) 
        }
        if (coupon.expirationDate < new Date()){
            coupon.isActive = false;
            await coupon.save();
            return res.status(404).json({message: 'coupon expired'})
        }
        res.json({
            message: 'coupon is valid',
            code: coupon.code,
            discountpercentage: coupon.discountPercentage
        })
    } catch (error) {
        console.log('error in validateCoupon controller', error.message)
        res.status(500).json({message: 'server error', error: error.message} )
    }
}