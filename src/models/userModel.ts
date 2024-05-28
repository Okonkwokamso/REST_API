import mongoose, { Document, Schema } from "mongoose";
import bycrypt from "bcrypt";
import config from "config";

export interface UserDocument extends Document {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}


const userSchema: Schema<UserDocument> = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bycrypt.genSalt(config.get<number>("saltWorkFactor"));

  const hash = await bycrypt.hash(user.password, salt);

  user.password = hash;

  return next();

});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as UserDocument;

  return bycrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const User = mongoose.model<UserDocument>("User", userSchema)


export default User;



