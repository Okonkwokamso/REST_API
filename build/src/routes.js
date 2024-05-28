"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("./controller/userController");
const validateResource_1 = __importDefault(require("./middleware/validateResource"));
const userSchema_1 = require("./schema/userSchema");
const routes = (app) => {
    app.get('/healthcheck', (req, res) => {
        res.sendStatus(200);
    });
    app.post('/api/users', (0, validateResource_1.default)(userSchema_1.createUserSchema), userController_1.createUserHandler);
};
exports.default = routes;
