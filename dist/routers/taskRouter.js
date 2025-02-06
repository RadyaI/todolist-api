"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const taskController_1 = require("../controllers/taskController");
const taskRouter = (0, express_1.default)();
taskRouter.get("/");
taskRouter.get("/:id");
taskRouter.post("/", auth_1.jwtAuth, taskController_1.createTask);
taskRouter.put("/:id");
taskRouter.delete("/:id");
exports.default = taskRouter;
