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
exports.findUser = exports.validatePassword = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield userModel_1.default.create(input);
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.createUser = createUser;
const validatePassword = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    // Validate email format
    // if (!validator.isEmail(email)) {
    //   throw new Error('Invalid email format');
    // }
    // Find the user by email
    const user = yield userModel_1.default.findOne({ email });
    if (!user) {
        return null; // User not found
    }
    // Compare the provided password with the stored hashed password
    const isValid = yield user.comparePassword(password);
    if (!isValid) {
        return null; // Password does not match
    }
    return user.toObject(); // Password is valid
});
exports.validatePassword = validatePassword;
function findUser(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return userModel_1.default.findOne(query).lean();
    });
}
exports.findUser = findUser;
