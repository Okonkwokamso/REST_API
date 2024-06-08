import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { RequestPayload } from "./deserializeUser";

const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  
  const user = res.locals.user;
  logger.info(`User ${user} is trying to access a protected route`);
  
  if (!user) {
    return res.status(403).send("Unauthorized");
  }
  return next();
};



export default requireUser;


