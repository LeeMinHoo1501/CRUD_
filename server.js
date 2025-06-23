const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const { connectDB } = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware để parse JSON
app.use(express.json());

// Kết nối cơ sở dữ liệu
connectDB();

// Middleware log vào route /users
app.use('/users', (req, res, next) => {
  next();
});

// Mount router người dùng
app.use('/users', userRoutes);

// Route test
app.get('/', (req, res) => {
  res.send('Hello from Express + PostgreSQL API!');
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
