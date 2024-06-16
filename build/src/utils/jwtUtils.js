"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import config from 'config'
// import { decode } from "punycode";
const privateKey = fs_1.default.readFileSync(`${__dirname}/../../private.key`, 'utf8');
const publicKeyPath = path_1.default.resolve(__dirname, '../../public.key');
const publicKey = fs_1.default.readFileSync(publicKeyPath, 'utf8');
function signJwt(payload, options) {
    console.log(payload);
    const privateKeyPath = path_1.default.resolve(__dirname, '../../private.key');
    const privateKey = fs_1.default.readFileSync(privateKeyPath, 'utf8');
    return jsonwebtoken_1.default.sign(payload, privateKey, Object.assign(Object.assign({}, (options && options)), { algorithm: 'RS256' }));
}
exports.signJwt = signJwt;
// export const signJwt = (object: Object, options?: jwt.SignOptions | undefined) => {
//   return jwt.sign(object, privateKey, {...(options && options), algorithm: 'RS256'})
// };
const verifyJwt = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, publicKey, { algorithms: ['RS256'] });
        console.log(decoded);
        return {
            valid: true,
            expired: false,
            decoded
        };
    }
    catch (err) {
        console.log(err);
        return {
            valid: false,
            expired: err.message === 'jwt expired',
            decoded: null
        };
    }
};
exports.verifyJwt = verifyJwt;
