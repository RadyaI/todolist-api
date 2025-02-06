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
exports.getTasks = getTasks;
exports.createTask = createTask;
const joi_1 = __importDefault(require("joi"));
const response_1 = require("../middlewares/response");
const __1 = require("..");
function getTasks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = req.auth;
            const result = yield __1.prisma.task.findMany({
                where: {
                    userId: userData.id
                }
            });
            if (result.length === 0) {
                return res.status(404).json((0, response_1.successRes)("Success", 404, "Resources is empty", result));
            }
            res.status(200).json((0, response_1.successRes)("Success", 200, "Data fetched successfully", result));
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    });
}
function createTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = req.auth;
            const { taskName, priority } = req.body;
            const schema = joi_1.default.object({
                taskName: joi_1.default.string().min(3).max(200).required(),
                priority: joi_1.default.string().valid("Low", "Medium", "High")
            });
            const validate = schema.validate(req.body);
            if (validate.error)
                return res.status(400).json((0, response_1.validateRes)(validate.error.message));
            const result = yield __1.prisma.task.create({
                data: {
                    userId: userData.id,
                    taskName,
                    priority
                }
            });
            res.status(201).json((0, response_1.successRes)("Success", 201, "Create task successfully", result));
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    });
}
