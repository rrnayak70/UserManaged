// /routes/userRoutes.js
const express = require('express');
const { registerUser , loginUser , getAllUsers , updateUser , deleteUser } = require('../controllers/userControllers');
const { verifyToken } = require('../middlewares/authMiddlewares');

const router = express.Router();

router.post('/register', registerUser );
router.post('/login', loginUser );
router.get('/users', verifyToken, getAllUsers); 
router.put('/users/:id', verifyToken, updateUser ); 
router.delete('/users/:id', verifyToken, deleteUser );


module.exports = router;