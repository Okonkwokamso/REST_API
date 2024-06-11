import mongoose, { Document, Schema } from "mongoose";
import {customAlphabet} from "nanoid";
import { UserDocument } from "./userModel";

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)


export interface ProductDocument extends Document {
  user: UserDocument["_id"] 
  //user: mongoose.Types.ObjectId
  title: string
  description: string
  price: number
  image: string
  createdAt: Date
  updatedAt: Date
  productId: string // Add the 'productId' property
}

const productSchema: Schema<ProductDocument> = new Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
    default: () => `product_${nanoid()}`
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
})

productSchema.index({ productId: 1 }); // Create an index on productId

const Product = mongoose.model<ProductDocument>("Product", productSchema)


export default Product;

