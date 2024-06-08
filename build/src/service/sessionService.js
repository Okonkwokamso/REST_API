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
exports.reIssueAccessToken = exports.updateSessions = exports.findSessions = exports.createSession = void 0;
const lodash_1 = require("lodash");
const config_1 = __importDefault(require("config"));
const jwtUtils_1 = require("../utils/jwtUtils");
const sessionModel_1 = __importDefault(require("../models/sessionModel"));
const userService_1 = require("./userService");
const createSession = (userId, userAgent) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield sessionModel_1.default.create({ user: userId, userAgent });
    return session.toJSON();
});
exports.createSession = createSession;
function findSessions(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return sessionModel_1.default.find(query).lean();
    });
}
exports.findSessions = findSessions;
;
function updateSessions(query, update) {
    return __awaiter(this, void 0, void 0, function* () {
        return sessionModel_1.default.updateOne(query, update);
    });
}
exports.updateSessions = updateSessions;
;
function reIssueAccessToken(_a) {
    return __awaiter(this, arguments, void 0, function* ({ refreshToken }) {
        const { decoded } = (0, jwtUtils_1.verifyJwt)(refreshToken);
        if (!decoded || !(0, lodash_1.get)(decoded, 'session'))
            return false;
        const session = yield sessionModel_1.default.findById((0, lodash_1.get)(decoded, 'session'));
        if (!session || !session.valid)
            return false;
        const user = yield (0, userService_1.findUser)({ _id: session.user });
        if (!user)
            return false;
        const accessToken = (0, jwtUtils_1.signJwt)(Object.assign(Object.assign({}, (0, lodash_1.omit)(user, "password")), { session: session._id }), { expiresIn: config_1.default.get("accessTokenTtl") });
        return accessToken;
    });
}
exports.reIssueAccessToken = reIssueAccessToken;
