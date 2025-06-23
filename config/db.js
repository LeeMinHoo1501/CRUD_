const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log('🔗 PostgreSQL connected');
  } catch (error) {
    console.error('❌ Kết nối database thất bại:', error);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  pool
};
