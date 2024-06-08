"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const jwtUtils_1 = require("../utils/jwtUtils");
const logger_1 = __importDefault(require("../utils/logger"));
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    const accessToken = (0, lodash_1.get)(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    if (!accessToken) {
        logger_1.default.warn("No access token provided");
        return next();
    }
    const { decoded, expired } = (0, jwtUtils_1.verifyJwt)(accessToken);
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
});
exports.default = deserializeUser;
