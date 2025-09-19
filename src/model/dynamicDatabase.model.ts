// models/Tenant.model.ts
import mongoose from "mongoose";

const dynamicDatabaseSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  dbName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const DynamicDatabase = mongoose.model("DynamicDatabase", dynamicDatabaseSchema);

export default DynamicDatabase;
