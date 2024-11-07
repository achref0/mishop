const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/authMiddleware');

router.post('/login', adminController.login);
router.get('/dashboard', authenticateAdmin, adminController.getDashboardData);

module.exports = router;