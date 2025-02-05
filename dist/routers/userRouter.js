"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const userController_1 = require("../controllers/userController");
const userRouter = (0, express_1.default)();
userRouter.get("/", auth_1.jwtAuth, userController_1.getUser);
userRouter.get("/all", auth_1.jwtAuth, auth_1.admin, userController_1.getUsers);
userRouter.get("/all/:id", auth_1.jwtAuth, auth_1.admin, userController_1.getUserById);
userRouter.put("/", auth_1.jwtAuth, userController_1.updateUser);
userRouter.delete("/");
exports.default = userRouter;
