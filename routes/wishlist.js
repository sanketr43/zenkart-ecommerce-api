const Wishlist = require('../models/Wishlist');
const { verifyTokenAndAuthorization,verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router();

//CREATE
router.post("/create", verifyTokenAndAuthorization, async (req, res) => {
    const newWishlist = new Wishlist(req.body);
  
    try {
      const savedWishlist = await newWishlist.save();
      res.status(200).json(savedWishlist);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //UPDATE
  router.put("/update/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      const updatedWishlist = await Wishlist.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedWishlist);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //DELETE
  router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      await Wishlist.findByIdAndDelete(req.params.id);
      res.status(200).json("Wishlist has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET USER Wishlist
  router.get("/get/:user_id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      const Wishlist = await Wishlist.findOne({ user_id: req.params.user_id });
      res.status(200).json(Wishlist);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  //GET ALL
  router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
      const Wishlists = await Wishlist.find();
      res.status(200).json(Wishlists);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;