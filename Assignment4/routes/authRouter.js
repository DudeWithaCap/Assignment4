const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorLogger');
const authController = require('../controllers/authController');

router.post('/signup', asyncHandler(authController.signup));
router.post('/login', asyncHandler(authController.login));
router.get('/me', verifyToken, asyncHandler(authController.getMe));

module.exports = router;
