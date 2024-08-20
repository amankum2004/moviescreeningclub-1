const FoodVerification = require('@/models/foodVerify.model');

// Function to verify email and OTP, and check if the food is delivered
exports.verifyFoodDelivery = async (req, res) => {
    const { email, otp } = req.query;

    try {
        const foodVerification = await FoodVerification.findOne({ email, otp });
        
        if (!foodVerification) {
            return res.status(404).json({ message: 'Invalid email or OTP' });
        }

        res.status(200).json({ 
            email: foodVerification.email,
            otp: foodVerification.otp,
            isdelivered: foodVerification.isdelivered 
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to update the delivery status
exports.updateDeliveryStatus = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const foodVerification = await FoodVerification.findOne({ email, otp });

        if (!foodVerification) {
            return res.status(404).json({ message: 'Invalid email or OTP' });
        }

        foodVerification.isdelivered = true;
        await foodVerification.save();

        res.status(200).json({ message: 'Delivery status updated', foodVerification });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
