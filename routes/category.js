const Category = require('../models/Category');
const { verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router();

//get categories
router.get('/get', async (req,res) => {
    try{
        categories = await Category.find();
        res.status(200).json(categories);
    }catch(err){
        res.status(401).json(err);
    }
});


//create category
router.post('/create',verifyTokenAndAdmin, async (req,res) => {
    const newCategory = new Category({
        title: req.body.title,
        image: req.body.image
    });

    try{
        await newCategory.save();
        res.status(200).json("Category saved successfully");
    }catch(err){
        res.status(401).json(err);
    }
});


//update category
router.post('/update/:id',verifyTokenAndAdmin, async (req,res) => {

    try{
        await Category.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{ new: true}),
        res.status(200).json("Category updated successfully");
    }catch(err){
        res.status(401).json(err);
    }
});


//delete category
router.post('/delete/:id',verifyTokenAndAdmin, async (req,res) => {

    try{
        await Category.findByIdAndDelete(req.params.id),
        res.status(200).json("Category deleted successfully");
    }catch(err){
        res.status(401).json(err);
    }
});


module.exports = router;