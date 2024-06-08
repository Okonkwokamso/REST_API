import { Request, Response, NextFunction } from "express";
import {get} from "lodash";
import config from "config";
import { omit } from "lodash";
import { verifyJwt, signJwt } from "../utils/jwtUtils";
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

  // // Function to extract access token from headers.authorization
  // function getAccessToken(req: Request): string | null {
  //     const authHeader = req.headers.authorization;
  //     if (authHeader && authHeader.startsWith('Bearer ')) {
  //         return authHeader.split(' ')[1];
  //     }
  //     return null;
  // }

  // const token = getAccessToken(req);
      
  // if (token) {
  //   req['accessToken'] = token;
  //   logger.info(`Access token: ${token}`);
  // } else {
  //   res.status(401).json({ error: 'Unauthorized: Access token is missing or invalid' });
  // }



  const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

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

  // if (expired) {
  //   logger.warn("JWT has expired");
  // } else {
  //   logger.error("JWT verification failed");
  // }


  //console.log(req.accessToken);
  

  return next();
};


export default deserializeUser;


