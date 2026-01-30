const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorLogger');
const bookController = require('../controllers/bookController');

// GET: any authenticated user (regular or admin)
router.get('/', verifyToken, asyncHandler(bookController.getAllBooks));
router.get('/:id', verifyToken, asyncHandler(bookController.getBookById));

// POST, PUT, DELETE: admin only (RBAC)
router.post('/', verifyToken, isAdmin, asyncHandler(bookController.createBook));
router.put('/:id', verifyToken, isAdmin, asyncHandler(bookController.updateBook));
router.delete('/:id', verifyToken, isAdmin, asyncHandler(bookController.deleteBook));

module.exports = router;
