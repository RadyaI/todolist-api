"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const taskController_1 = require("../controllers/taskController");
const taskRouter = (0, express_1.default)();
taskRouter.get("/", auth_1.jwtAuth, taskController_1.getTasks);
taskRouter.get("/active", auth_1.jwtAuth, taskController_1.getActiveTasks);
taskRouter.get("/:id", auth_1.jwtAuth, taskController_1.getTaskById);
taskRouter.post("/", auth_1.jwtAuth, taskController_1.createTask);
taskRouter.put("/done/:id", auth_1.jwtAuth, taskController_1.doneTask);
taskRouter.put("/:id");
taskRouter.delete("/:id");
exports.default = taskRouter;
