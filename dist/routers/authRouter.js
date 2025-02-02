"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter = (0, express_1.default)();
authRouter.get("/register", (req, res) => {
    res.json({ Register: "working" });
});
exports.default = authRouter;
