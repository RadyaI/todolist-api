"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const secret_1 = require("./secret");
const root_1 = __importDefault(require("./routers/root"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({ status: "working" });
});
app.use("/api/v1", root_1.default);
exports.prisma = new client_1.PrismaClient();
app.listen(secret_1.PORT, () => {
    console.log(`App running on port ${secret_1.PORT} 😎`);
});
