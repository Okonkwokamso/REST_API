import mongoose, { Document } from 'mongoose';
import validator from 'validator';  
import { omit } from 'lodash';
import User, { UserDocument } from '../models/userModel';

export const createUser = async ( input: Document<Omit<UserDocument, "createdAt" | "updatedAt">> ): Promise<UserDocument> => {
  try {
    return await User.create(input);
  } catch (err: any) {
    throw new Error(err)
  }
}

interface ValidatePasswordInput {
  email: string;
  password: string;
}

export const validatePassword = async ({ email, password }: ValidatePasswordInput): Promise<UserDocument | null> => {
  // Validate email format
  // if (!validator.isEmail(email)) {
  //   throw new Error('Invalid email format');
  // }

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    return null; // User not found
  }

  // Compare the provided password with the stored hashed password
  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return null; // Password does not match
  }

  return user.toObject(); // Password is valid
};











// export const validatePassword = async ({email, password}: {email: string, password: string} ): Promise<UserDocument | null> => {

//   const user = await User.findOne({ email});

//   if (!user) {
//     return null;
//   }

//   const isValid = await user.comparePassword(password);
//   if (!isValid) {
//     return null;
//   }
//   // return omit(user.toJSON(), "password");
//   return user;
// }




