const router = require('express').Router();

router.get('/',(req,res) => {
    res.send('user test successful.');
});


module.exports = router;