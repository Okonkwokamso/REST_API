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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductHandler = exports.getProductHandler = exports.updateProductHandler = exports.createProductHandler = void 0;
const productService_1 = require("../service/productService");
const console_1 = require("console");
const createProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user._id;
        const body = req.body;
        const product = yield (0, productService_1.createProduct)(Object.assign(Object.assign({}, body), { user: userId }));
        yield product.save();
        return res.send(product);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createProductHandler = createProductHandler;
const updateProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user._id;
    const { productId } = req.params;
    const update = req.body;
    const product = yield (0, productService_1.findProduct)({ productId });
    if (!product) {
        return res.sendStatus(404);
    }
    if (String(product.user) !== userId) {
        return res.sendStatus(403);
    }
    const updatedProduct = yield (0, productService_1.findAndUpdateProduct)({ productId }, update, { new: true });
    return res.send(updatedProduct);
});
exports.updateProductHandler = updateProductHandler;
const getProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        (0, console_1.log)(productId);
        const product = yield (0, productService_1.findProduct)({ productId });
        (0, console_1.log)(product);
        if (!product) {
            return res.sendStatus(404);
        }
        return res.send(product);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getProductHandler = getProductHandler;
const deleteProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user._id;
    const { productId } = req.params;
    const product = yield (0, productService_1.findProduct)({ productId });
    if (!product) {
        return res.sendStatus(404);
    }
    if (String(product.user) !== userId) {
        return res.sendStatus(403);
    }
    yield (0, productService_1.deleteProduct)({ productId });
    return res.sendStatus(200);
});
exports.deleteProductHandler = deleteProductHandler;
