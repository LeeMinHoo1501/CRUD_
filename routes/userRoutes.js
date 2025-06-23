const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

console.log('🛠 userRoutes loaded');
// Thêm log để debug
router.use((req, res, next) => {
  next();
});

// Định nghĩa các routes
router.get('/', getAllUsers);
router.get('/:username', getUserByUsername);
router.post('/', (req, res, next) => {
  next();
}, createUser);
router.put('/:username', updateUser);
router.delete('/:username', deleteUser);

module.exports = router;
