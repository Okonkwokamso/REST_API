import mongoose, { Document, Schema } from "mongoose";
import bycrypt from "bcrypt";
import config from "config";
import { UserDocument } from "./userModel";

export interface SessionDocument extends Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}


const sessionSchema: Schema<SessionDocument> = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  valid: { 
    type: Boolean, 
    default: true 
  },
  userAgent: {
    type: String
  }
}, { timestamps: true });



const Session = mongoose.model<SessionDocument>("Session", sessionSchema)


export default Session;






