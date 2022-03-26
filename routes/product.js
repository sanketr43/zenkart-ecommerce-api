const Product = require('../models/Product');
const { verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router();

//get products
router.get('/get', async (req,res) => {
    try{
        products = await Product.find();
        res.status(200).json(products);
    }catch(err){
        res.status(401).json(err);
    }
});


//create Product
router.post('/create',verifyTokenAndAdmin, async (req,res) => {
    const newProduct = new Product({
        title: req.body.title,
        desc: req.body.desc,
        image: req.body.image,
        category_id: req.body.category_id,
        price: req.body.price,
        rating: req.body.rating
    });

    try{
        await newProduct.save();
        res.status(200).json("Product saved successfully");
    }catch(err){
        res.status(401).json(err);
    }
});


//update Product
router.put('/update/:id',verifyTokenAndAdmin, async (req,res) => {

    try{
        await Product.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{ new: true}),
        res.status(200).json("Product updated successfully");
    }catch(err){
        res.status(401).json(err);
    }
});


//delete Product
router.delete('/delete/:id',verifyTokenAndAdmin, async (req,res) => {

    try{
        await Product.findByIdAndDelete(req.params.id),
        res.status(200).json("Product deleted successfully");
    }catch(err){
        res.status(401).json(err);
    }
});


module.exports = router;