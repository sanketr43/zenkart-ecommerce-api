const Product = require('../models/Product');
const { verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router();

//get products
router.get('/get', async (req,res) => {
    const findBy = {};
    
    //category filter
    if(req.query.id){
        findBy['category_id'] = req.query.id.split(",");
    }

    //price filter
    if(req.query.price){
        findBy['price'] = { $lte: req.query.price };
    }

    //rating filter
    if(req.query.rating){
        findBy['rating'] = { $gte: req.query.rating };
    }

    //sort by
    let sort_by = "";
    if(req.query.sort_by){
        if(req.query.sort_by == "LOW_TO_HIGH"){
            sort_by = {price: 'asc'};
        }else
        if(req.query.sort_by == "HIGH_TO_LOW"){
            sort_by = {price: 'desc'};
        }
    }

    try{
        let products;
        products = await Product.find(findBy).sort(sort_by);
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