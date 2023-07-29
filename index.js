const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

mongoose.connect(process.env.MONGO_URL);

// Middleware
app.use(express.json());
app.use(morgan('common'));

// routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.listen(5000, () => console.log('Server is listening on the port 5000'));