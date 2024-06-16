import fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'
import logger from './logger'
// import config from 'config'
// import { decode } from "punycode";

const privateKey = fs.readFileSync(`${__dirname}/../../private.key`, 'utf8');

const publicKeyPath = path.resolve(__dirname, '../../public.key');

const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

export function signJwt(payload: object, options?: jwt.SignOptions): string {
  console.log(payload);
  const privateKeyPath = path.resolve(__dirname, '../../private.key');
  const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256', // Ensure the algorithm matches your private key type
  });
}

// export const signJwt = (object: Object, options?: jwt.SignOptions | undefined) => {
//   return jwt.sign(object, privateKey, {...(options && options), algorithm: 'RS256'})
// };


export const verifyJwt = (token: string) => {
  
  try {
    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    console.log(decoded);
    
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (err: any) {
    console.log(err);
    
    return {
      valid: false,
      expired: err.message === 'jwt expired',
      decoded: null
    }
  }
};














