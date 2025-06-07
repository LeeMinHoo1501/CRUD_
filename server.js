import express from 'express';
import dotenv from 'dotenv';
import pool from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

async function testDbConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Kết nối DB thành công! Thời gian hiện tại:', res.rows[0].now);
  } catch (error) {
    console.error('❌ Lỗi kết nối DB:', error.message);
  }
}

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await testDbConnection();
});
