const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const categoryRouter = require('./routes/category');

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


app.listen(process.env.PORT || 5000, () => {
    console.log('backend server started...');
});