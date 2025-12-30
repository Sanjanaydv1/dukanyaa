import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: String,
  price: Number,
  image: String,
  stock: Number,
  category: String,
  vendor: { type: Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default models.Product || model("Product", ProductSchema);