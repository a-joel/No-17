const express = require('express');
const cors = require('cors');
const router = express.Router();

const Product = require('../models/product-schema');
const authMiddleware = require('../authmiddlewares/auth-middleware');

router.get('/', async (req, res) => {

        try {
                const allProducts = await Product.find();
                return res.status(200).send(allProducts);
        } catch(error) {
                console.log(error);
                return res.status(403).send({message: error});
                
        }
});

router.post('/product-add', async (req, res) => {
        const {title, price,image, category, description, rating: {rate, count}} = req.body;

        try {
                if(!title || !price || !image || !category || !description) {
                        return res.status(400).send({message: "All Fields are must be declared."});
                }

                const newProduct = new Product({
                        title,
                        price,
                        image,
                        category,
                        description,
                        rating: {
                                rate,
                                count
                        }
                });

                await newProduct.save();

                 return res.status(201).json({
      message: "Product created successfully",
      data: newProduct,
    });
        } catch(error) {
                console.log(error);
                return res.status(500).send({message: "Not Created.", error});
                
        }
});

//Delete route
router.delete('/delete-product/:id', authMiddleware(["admin"]),async (req, res) => {
        const {id} = req.params;

        try {
                const isProduct = await Product.findById(id);

                if(!isProduct) {
                        return res.status(400).send({message: "Product is not found"});
                }

                await Product.findByIdAndDelete(id);

                console.log('No content');
                return res.status(204).send({message: "Product deleted"})
                
        }catch(error) {
                console.log(error);
                res.status(500).send(error);
                
        }
})

module.exports = router;