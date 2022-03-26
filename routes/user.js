const router = require('express').Router();
const User = require('../models/User');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

//get
router.get('/get/:id',verifyTokenAndAuthorization, async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(401).json(err);
    }
});

//update
router.put('/update/:id',verifyTokenAndAuthorization, async (req,res) => {
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(JSON.stringify(req.body.password),process.env.PASS_SEC).toString();
    }

    if(req.body.isAdmin){
        req.body.isAdmin = false;
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new: true});
        const { _id, first_name, last_name, email, isAdmin, createdAt, updatedAt } = updatedUser;
        res.status(200).json({_id, first_name, last_name, email, isAdmin, createdAt, updatedAt});
    }catch(err){
        res.status(401).json(err);
    }
});

//delete
router.delete('/delete/:id',verifyTokenAndAdmin, async (req,res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted successfully!");
    }catch(err){
        res.status(401).json(err);
    }
});

module.exports = router;