import { Request, Response, NextFunction } from "express";
import {get} from "lodash";
import config from "config";
import { omit } from "lodash";
import { verifyJwt, signJwt } from "../utils/jwtUtils";
import { reIssueAccessToken } from "../service/sessionService";
import logger from "../utils/logger";
import { log } from "console";


declare global {
  namespace Express {
    interface Request {
      accessToken?: string;
    }
  }
}

export type RequestPayload = Request & {
  locals: {
    user: any
  };
};


const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {

  const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
  const refreshToken = get(req, "headers.-x-refresh")

  if (!accessToken) {
    logger.warn("No access token provided");
    return next();
  }
  
  const {decoded, expired} = verifyJwt(accessToken);
  console.log(accessToken);
  

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken: refreshToken as string }); // Cast refreshToken to string
    
    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
      const { decoded } = verifyJwt(newAccessToken);
      res.locals.user = decoded;
    }
  } else {
    logger.error("JWT verification failed");
  }

  return next();
};


export default deserializeUser;


