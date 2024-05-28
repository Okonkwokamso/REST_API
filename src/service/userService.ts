import mongoose, { DocumentDefinition } from 'mongoose';
import { UserDocument } from '../models/userModel';
import User from '../models/userModel';


export const createUser = async ( input: DocumentDefinition<Omit<UserDocument, "createdAt" | "updatedAt">> ): Promise<UserDocument> => {
  try {
    return await User.create(input);
  } catch (err: any) {
    throw new Error(err)
  }
}


