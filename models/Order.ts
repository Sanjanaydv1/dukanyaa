import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  vendor: { type: Schema.Types.ObjectId, ref: "User" },
  products: [{ productId: String, qty: Number }],
  total: Number,
  status: { type: String, default: "PENDING" },
  paymentMethod: String,
}, { timestamps: true });

export default models.Order || model("Order", OrderSchema);