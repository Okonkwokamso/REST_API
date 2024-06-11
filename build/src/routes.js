"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("./controller/userController");
const validateResource_1 = __importDefault(require("./middleware/validateResource"));
const userSchema_1 = require("./schema/userSchema");
const sessionCotroller_1 = require("./controller/sessionCotroller");
const sessionSchema_1 = require("./schema/sessionSchema");
const requireUser_1 = __importDefault(require("./middleware/requireUser"));
const productSchema_1 = require("./schema/productSchema");
const productController_1 = require("./controller/productController");
const routes = (app) => {
    app.get('/healthcheck', (req, res) => {
        res.sendStatus(200);
    });
    app.post('/api/users', (0, validateResource_1.default)(userSchema_1.createUserSchema), userController_1.createUserHandler);
    app.post('/api/sessions', (0, validateResource_1.default)(sessionSchema_1.createSessionSchema), sessionCotroller_1.createUserSessionHandler);
    app.get('/api/sessions', requireUser_1.default, sessionCotroller_1.getUserSessionHandler);
    app.delete('/api/sessions', sessionCotroller_1.deleteUserSession);
    app.post('/api/products', [requireUser_1.default, (0, validateResource_1.default)(productSchema_1.createProductSchema)], productController_1.createProductHandler);
    app.put('/api/products/:productId', [requireUser_1.default, (0, validateResource_1.default)(productSchema_1.updateProductSchema)], productController_1.updateProductHandler);
    app.get('/api/products/:productId', (0, validateResource_1.default)(productSchema_1.getProductSchema), productController_1.getProductHandler);
    app.delete('/api/products/:productId', [requireUser_1.default, (0, validateResource_1.default)(productSchema_1.deleteProductSchema)], productController_1.deleteProductHandler);
};
exports.default = routes;
