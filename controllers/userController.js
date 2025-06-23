const userModel = require('../models/userModel');

// Lấy danh sách tất cả người dùng
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách người dùng' });
  }
};

// Lấy thông tin một người dùng theo username
const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await userModel.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server khi lấy thông tin người dùng' });
  }
};

// Tạo người dùng mới
const createUser = async (req, res) => {
  const { username, full_name, email, role } = req.body;
  try {
    const newUser = await userModel.createUser({ username, full_name, email, role });
    res.status(201).json(newUser);
  } catch (err) {
    console.error('❌ Lỗi tạo user:', err);
    res.status(500).json({ message: 'Lỗi server khi tạo người dùng' });
  }
};

// Cập nhật người dùng
const updateUser = async (req, res) => {
  const { username } = req.params;
  const { full_name, email, role } = req.body;
  try {
    const updatedUser = await userModel.updateUser(username, { full_name, email, role });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng để cập nhật' });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server khi cập nhật người dùng' });
  }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
  const { username } = req.params;
  try {
    const deletedUser = await userModel.deleteUser(username);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng để xóa' });
    }
    res.status(200).json({ message: 'Đã xóa người dùng thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server khi xóa người dùng' });
  }
};

module.exports = {
  getAllUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
};