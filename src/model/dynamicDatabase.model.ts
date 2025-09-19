// models/Tenant.model.ts
import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  dbName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Tenant = mongoose.model("Tenant", ClientSchema);
export default Tenant;
