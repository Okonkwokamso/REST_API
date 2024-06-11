import { Document, FilterQuery, QueryOptions, UpdateQuery} from 'mongoose';
import Product, { ProductDocument } from '../models/productModel';

export const createProduct = async(input: Document<Omit<ProductDocument, 'createdAt'| 'updatedAt'>>) => {
  return await Product.create(input);
}

export const findProduct = async(query: FilterQuery<ProductDocument>, options: QueryOptions = { lean: true }) => {
  return await Product.findOne(query, {}, options);
}

export const findAndUpdateProduct= async(query: FilterQuery<ProductDocument>, update: UpdateQuery<ProductDocument>, options: QueryOptions) => {
  return await Product.findOneAndUpdate(query, update, options);
}

export const deleteProduct = async(query: FilterQuery<ProductDocument>) => {
  return await Product.deleteOne(query);
}
