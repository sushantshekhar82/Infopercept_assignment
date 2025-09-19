import express from 'express';
import userVerificationController from '../userVerification/userverification.controller'
const router = express.Router();
import multer from 'multer'
import authMiddleware from '../middleware/authenticate.middleware';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// route: upload + verify
router.post(
  '/verify-user',
  authMiddleware,
  upload.single('documentFile'), 
  userVerificationController.userVerification
);
export default router;