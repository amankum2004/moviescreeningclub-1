const express = require('express');
const router = express.Router();
const { verifyFoodDelivery, updateDeliveryStatus } = require('../controllers/foodVerify.controller');

router.get('/foodverify', verifyFoodDelivery);
router.post('/foodverify/update', updateDeliveryStatus);

module.exports = router;
