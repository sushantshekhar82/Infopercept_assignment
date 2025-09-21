import express from 'express';
import authController from '../controller/auth.controller';
import authMiddleware from '../../middleware/authenticate.middleware';
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

// Get current user route
router.get('/me', authMiddleware, authController.getUser);

export default router;