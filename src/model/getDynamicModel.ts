import mongoose from "mongoose";

export const getDynamicDatabaseModels = (conn: mongoose.Connection) => {
  const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    // password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  }, { timestamps: true });

  const UserVerificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    documentId: { type: String, required: true },
    documentData: { type: Object },
    verificationStatus: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" },
  }, { timestamps: true });

  // Check if model already exists on this connection
  const User = conn.models.User || conn.model("User", UserSchema);
  const UserVerification = conn.models.UserVerification || conn.model("UserVerification", UserVerificationSchema);

  return { User, UserVerification };
};
