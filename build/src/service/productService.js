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
exports.deleteProduct = exports.findAndUpdateProduct = exports.findProduct = exports.createProduct = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const createProduct = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productModel_1.default.create(input);
});
exports.createProduct = createProduct;
const findProduct = (query_1, ...args_1) => __awaiter(void 0, [query_1, ...args_1], void 0, function* (query, options = { lean: true }) {
    return yield productModel_1.default.findOne(query, {}, options);
});
exports.findProduct = findProduct;
const findAndUpdateProduct = (query, update, options) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productModel_1.default.findOneAndUpdate(query, update, options);
});
exports.findAndUpdateProduct = findAndUpdateProduct;
const deleteProduct = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productModel_1.default.deleteOne(query);
});
exports.deleteProduct = deleteProduct;
