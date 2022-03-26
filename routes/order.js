const Order = require('../models/Order');
const { verifyTokenAndAuthorization,verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router();

//create
router.post("/create", verifyTokenAndAuthorization, async (req, res) => {
    const newOrder = new Order(req.body);
  
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
});


  //update order
  router.put("/update/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  //GET user orders
router.get("/get/:user_id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      const Orders = await Order.find({ user_id: req.params.user_id });
      res.status(200).json(Orders);
    } catch (err) {
      res.status(500).json(err);
    }
});