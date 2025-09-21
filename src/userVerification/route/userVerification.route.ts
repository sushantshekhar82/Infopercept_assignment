import express from 'express';
import userVerificationController from '../controller/userverification.controller'
const router = express.Router();
import multer from 'multer'
import authMiddleware from '../../middleware/authenticate.middleware';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// route: upload + verify
router.post(
  '/verify-user',
  authMiddleware,
  upload.single('documentFile'), 
  userVerificationController.userVerification
);

// new listing route
router.get("/list-verifications", 
    authMiddleware, 
    userVerificationController.listVerifications
);

router.get("/user-verification/:id", 
    authMiddleware, 
    userVerificationController.detailsVerifications
);

// Update verification status route
router.put("/user-verification/:verificationId/status", 
    authMiddleware, 
    userVerificationController.updateVerificationStatus
);

export default router;