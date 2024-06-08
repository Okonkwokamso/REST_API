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
exports.deleteUserSession = exports.getUserSessionHandler = exports.createUserSessionHandler = void 0;
const lodash_1 = require("lodash");
const config_1 = __importDefault(require("config"));
const userService_1 = require("../service/userService");
const sessionService_1 = require("../service/sessionService");
const jwtUtils_1 = require("../utils/jwtUtils");
const createUserSessionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Destructure email and password from the request body
    const { email, password } = req.body;
    // Validate the user's password
    const user = yield (0, userService_1.validatePassword)({ email, password });
    // Validate the user's password 
    //const user = await validatePassword(req.body);
    if (!user) {
        return res.status(401).send("Invalid email or password");
    }
    // Check if the user's password is correct
    // Create a new session for the user
    const userId = String(user._id);
    //logger.info(`User:${userId} --- ${email} has been validated`);
    const session = yield (0, sessionService_1.createSession)(userId, req.get("user-agent") || "");
    //console.log(session._id);
    // Create a new access token
    const accessToken = (0, jwtUtils_1.signJwt)(Object.assign(Object.assign({}, (0, lodash_1.omit)(user, "password")), { session: session._id }), { expiresIn: config_1.default.get("accessTokenTtl") });
    // req['accessToken'] = accessToken;
    // console.log(req['accessToken']);
    // Create a new refresh token
    const refreshToken = (0, jwtUtils_1.signJwt)(Object.assign({}, (0, lodash_1.omit)(user, "password")), { expiresIn: config_1.default.get("refreshTokenTtl") });
    // Respond with the new access and refresh token
    //return logger.info(`User ${userId} has successfully logged in`);
    res.send({ accessToken, refreshToken });
});
exports.createUserSessionHandler = createUserSessionHandler;
function getUserSessionHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = res.locals.user._id;
            //const userId = req.params.userId;
            const sessions = yield (0, sessionService_1.findSessions)({ user: userId, valid: true });
            return res.send(sessions);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getUserSessionHandler = getUserSessionHandler;
;
const deleteUserSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const sessionId = res.locals.user.session;
        yield (0, sessionService_1.updateSessions)({ _id: sessionId }, { valid: false });
        return res.send({
            accessToken: null,
            refreshToken: null
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUserSession = deleteUserSession;
