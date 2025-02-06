"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter_1 = __importDefault(require("./authRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const taskRouter_1 = __importDefault(require("./taskRouter"));
const rootRouter = (0, express_1.default)();
rootRouter.use("/auth", authRouter_1.default);
rootRouter.use("/user", userRouter_1.default);
rootRouter.use("/task", taskRouter_1.default);
rootRouter.get('/ip', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.json(ip);
});
rootRouter.use("*", (req, res) => {
    res.status(404).json({ Route: "Not Found" });
});
exports.default = rootRouter;
