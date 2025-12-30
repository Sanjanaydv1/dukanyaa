import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";

export const resolvers = {
  Query: {
    products: async (_: any, { city }: any) => {
      await connectDB();
      return Product.find();
    },
  },
};