import mongoose, { FilterQuery, UpdateQuery } from 'mongoose';
import { UserDocument } from '../models/userModel';
import Session, { SessionDocument } from '../models/sessionModel';


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

