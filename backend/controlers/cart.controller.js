export const addToCart = async (req, res) => {
    try {
        const {productId} = req.body;
        const user = req.user;

        const existingItem = user.cartItems.find(item => item.id === productId)
        if (existingItem) {
            existingItem.quantity += 1;
        } else{
            user.cartItems.push(productIdy)
        }

        await user.save();
        res.json(user.cartItems)
    } catch (error) {
        console.log('Error in addToCart controller', error.message)
        res.status(500).json({ meesage: 'server error', error: error.message})
    }
}

export const removeAllFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;
        if (!productId) {
            user.cartItems = []
        } else{
            user.cartItems = user.cartItems((item) => item.id !== productId)
        }
        await user.save()
        res.json(user.cartItems)
    } catch (error) {
        res.status(500).json({ message: 'server error', error: error.meesage})
    }
}

export const updateQuantity = async (req, res) => {
    try {
        const {id:productId} = req.params;
        const { quantity }  = req.body;
        const user = req.user
        const existingItem = user.cartItems.find((item) => item.id === productId)

        if (existingItem) {
            if (quantity === 0) {
                user.cartItems = user.cartItems.filter((item) => item.id !== productId)
                await user.save()
                return res.json(user.cartItems)
            }

            existingItem.quantity = quantity
            await user.save()
            res.json(user.cartItems)
        } else{
            res.status(404).json({message: 'product not found'})
        }
    } catch (error) {
        console.log( 'error in updateQuantity controller', error.message)
        res.status(500).json({ message: 'server error', error: error.message})
    }
}