// routes/product.js
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Create a new product
router.post('/', async (req, res) => {
    const { name, price, description, imageUrl } = req.body;
    try {
        const newProduct = new Product({ name, price, description, imageUrl });
        const product = await newProduct.save();
        res.json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;

