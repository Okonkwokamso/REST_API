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
exports.createUserHandler = void 0;
const lodash_1 = require("lodash");
const logger_1 = __importDefault(require("../utils/logger"));
const userService_1 = require("../service/userService");
const createUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userService_1.createUser)(req.body);
        return res.send((0, lodash_1.omit)(user.toJSON(), "password"));
    }
    catch (err) {
        logger_1.default.error(err);
        return res.status(409).send(err.message);
    }
});
exports.createUserHandler = createUserHandler;
// export const createUserHandler = async (req: Request<{}, {}, createUserInput["body"]>, res: Response) => {
//   try {
//     const user = await createUser(req.body); 
//     return res.send(omit(user.toJSON(), "password"));
//   } catch (err: any) {
//     logger.error(err)
//     return res.status(409).send(err.message)
//   }
// }
