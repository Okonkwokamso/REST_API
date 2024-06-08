import { Express, NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import { omit } from 'lodash'
import config from 'config'
import { validatePassword } from "../service/userService";
import { createUserInput } from "../schema/userSchema";
import { createSession, findSessions, updateSessions } from "../service/sessionService";
import Session from '../models/sessionModel';
import { signJwt } from "../utils/jwtUtils";
import logger from '../utils/logger';

export const createUserSessionHandler = async (req: Request<{}, {}, createUserInput["body"]>, res: Response) => {
  
  // Destructure email and password from the request body
  const { email, password } = req.body;


  // Validate the user's password
  const user = await validatePassword({ email, password });
  
  // Validate the user's password 
  //const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }
  // Check if the user's password is correct
  // Create a new session for the user
  const userId = String(user._id);
  
  //logger.info(`User:${userId} --- ${email} has been validated`);
  const session = await createSession(userId, req.get("user-agent") || "");
 
  //console.log(session._id);
  
  // Create a new access token
  const accessToken = signJwt(
    { ...omit(user, "password"), session: session._id },
    { expiresIn: config.get("accessTokenTtl") }
  );
  
  // req['accessToken'] = accessToken;
  // console.log(req['accessToken']);
  
  // Create a new refresh token
  const refreshToken = signJwt(
    { ...omit(user, "password") }, 
    { expiresIn: config.get("refreshTokenTtl") }
  );  

  // Respond with the new access and refresh token
  //return logger.info(`User ${userId} has successfully logged in`);
  res.send({ accessToken, refreshToken });

  
}

export async function getUserSessionHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = res.locals.user._id;
    //const userId = req.params.userId;

    const sessions = await findSessions({ user: userId, valid: true });

    return res.send(sessions);
  } catch (error) {
    next(error)
  }
};

export const deleteUserSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const { userId, sessionId } = req.params;
    // logger.info(`User ${userId} is trying to delete session ${sessionId}`);

    // // Validate the userId
    // if (!mongoose.isValidObjectId(userId)) {
    //     return res.status(400).json({ error: 'Invalid user ID format' });
    // }

    // // Find and delete the session
    // const result = await Session.findOneAndDelete({ sessionId }).exec();

    // console.log(result)
    // if (result) {
    //     res.status(200).json({ message: 'Session deleted successfully' });
    // } else {
    //     res.status(404).json({ error: 'Session not found' });
    // }

    const sessionId  = res.locals.user.session;
    await updateSessions ({ _id: sessionId }, { valid: false });
    return res.send({
      accessToken: null,
      refreshToken: null
    })
  } catch (error) {
      next(error);
  }
};












