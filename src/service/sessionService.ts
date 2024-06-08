import mongoose, { FilterQuery, UpdateQuery } from 'mongoose';
import { find, get, omit } from "lodash";
import config from 'config'
import { verifyJwt, signJwt } from '../utils/jwtUtils';
import { UserDocument } from '../models/userModel';
import Session, { SessionDocument } from '../models/sessionModel';
import { findUser } from './userService';


export const createSession = async ( userId: string, userAgent: string ) => {
  const session = await Session.create({ user: userId, userAgent });
  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return Session.find(query).lean();
};

export async function updateSessions(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
  return Session.updateOne(query, update);
};

export async function reIssueAccessToken ({ refreshToken}:{refreshToken: string}) {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, 'session')) return false

  const session = await Session.findById(get(decoded, 'session'));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });
  if (!user) return false;

  const accessToken = signJwt(
    { ...omit(user, "password"), session: session._id },
    { expiresIn: config.get("accessTokenTtl") }
  );

  return accessToken;
}








