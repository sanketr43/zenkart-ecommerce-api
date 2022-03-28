const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const wishlistRouter = require('./routes/wishlist');
const orderRouter = require('./routes/order');
const cors = require('cors');

app.use(cors({
    origin: ['http://localhost:3000','https://zenkart-app.netlify.app/']
}));

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('Database connection successful!');
}).catch((error) => {
    console.log(error);
});

app.use(express.json());
app.use('/api/auth', authRouter);
app.use("/api/user", userRouter);
app.use("/api/category",categoryRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);
app.use("/api/wishlist",wishlistRouter);
app.use("/api/order",orderRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log('backend server started...');
});