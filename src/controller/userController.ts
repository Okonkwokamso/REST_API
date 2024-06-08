import { Express, Request, Response } from 'express'
import { Document } from "mongoose";
import { omit } from 'lodash'
import logger from '../utils/logger'
import { createUser } from "../service/userService";
import { createUserInput } from "../schema/userSchema";
import { UserDocument } from '../models/userModel';

export const createUserHandler = async (req: Request<{}, {}, createUserInput["body"]>, res: Response) => {
  try {
    const user = await createUser(req.body as unknown as Document<Omit<UserDocument, "createdAt" | "updatedAt">>); 
    return res.send(omit(user.toJSON(), "password"));
  } catch (err: any) {
    logger.error(err)
    return res.status(409).send(err.message)
  }
}










// export const createUserHandler = async (req: Request<{}, {}, createUserInput["body"]>, res: Response) => {
//   try {
//     const user = await createUser(req.body); 
//     return res.send(omit(user.toJSON(), "password"));
//   } catch (err: any) {
//     logger.error(err)
//     return res.status(409).send(err.message)
//   }
// }

