const User = require('../models/User');
const router = require('express').Router();
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

router.post('/register', async (req,res) => {
    const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(JSON.stringify(req.body.password),process.env.PASS_SEC).toString(),
    });

    try{
        const {_id, first_name, last_name, email, isAdmin, createdAt, updatedAt} = await newUser.save();
        res.status(201).json({_id, first_name, last_name, email, isAdmin, createdAt, updatedAt});
    }catch(error){
        res.status(401).json(error);
    }
});


router.post('/login', async (req,res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        !user && res.status(401).json("Wrong credentials.");
        
        const hasPassword = CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);
        const password = hasPassword.toString(CryptoJS.enc.Utf8);

        password != req.body.password && res.status(401).json("Wrong credentials.");

        const {_id, first_name, last_name, email, isAdmin, createdAt, updatedAt} = user;

        const accessToken = jwt.sign({
            id: _id,
            isAdmin: isAdmin
        },process.env.JWT_SEC,
        {expiresIn: '1d'});

        res.status(200).json({_id, first_name, last_name, email, isAdmin, createdAt, updatedAt, accessToken});
    }catch(error){
        res.status(500).json(error);
    }



});


module.exports = router;