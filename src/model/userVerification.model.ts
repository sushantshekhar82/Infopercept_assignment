import mongoose from "mongoose";

const verification = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    documentId: { type: String, required: true },
    documentData: { type: mongoose.Schema.Types.Mixed, required: false },
    verificationStatus: { 
        type: String, 
        enum: ['pending', 'verified', 'rejected'], 
        default: 'pending' 
    }
}, { timestamps: true });

const UserVerification = mongoose.model('UserVerification', verification);

export default UserVerification;
