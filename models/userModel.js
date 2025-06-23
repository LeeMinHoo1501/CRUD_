const { pool } = require('../config/db');

// Tạo bảng users nếu chưa có
const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      username VARCHAR(50) PRIMARY KEY,
      full_name TEXT,
      email TEXT UNIQUE,
      role TEXT DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  try {
    await pool.query(query);
    console.log('✅ Bảng users đã sẵn sàng!');
  } catch (error) {
    console.error('❌ Lỗi tạo bảng users:', error);
  }
};

// Gọi tạo bảng khi file được import
createUserTable();

// Lấy tất cả người dùng
const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};

// Lấy người dùng theo username
const getUserByUsername = async (username) => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
};

// Tạo người dùng mới
const createUser = async (user) => {
  const { username, full_name, email, role } = user;
  const result = await pool.query(
    'INSERT INTO users (username, full_name, email, role) VALUES ($1, $2, $3, $4) RETURNING *',
    [username, full_name, email, role]
  );
  return result.rows[0];
};

// Cập nhật người dùng
const updateUser = async (username, user) => {
  const { full_name, email, role } = user;
  const result = await pool.query(
    'UPDATE users SET full_name = $1, email = $2, role = $3 WHERE username = $4 RETURNING *',
    [full_name, email, role, username]
  );
  return result.rows[0];
};

// Xóa người dùng
const deleteUser = async (username) => {
  const result = await pool.query(
    'DELETE FROM users WHERE username = $1 RETURNING *',
    [username]
  );
  return result.rows[0];
};

module.exports = {
  getAllUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
};
