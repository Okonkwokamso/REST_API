import { Express, Request, Response } from 'express'
import logger from '../utils/logger'
import { createUser } from "../service/userService";
import { createUserInput } from "../schema/userSchema";

export const createUserHandler = async (req: Request<{}, {}, createUserInput["body"]>, res: Response) => {
  try {
    const user = await createUser(req.body); 
    return user;
  } catch (err: any) {
    logger.error(err)
    return res.status(409).send(err.message)
  }
}



