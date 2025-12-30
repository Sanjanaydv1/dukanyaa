import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["USER", "ADMIN", "VENDOR"], default: "USER" },
  city: String,
}, { timestamps: true });

export default models.User || model("User", UserSchema);