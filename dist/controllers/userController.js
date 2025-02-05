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
exports.getUser = getUser;
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
const __1 = require("..");
const response_1 = require("../middlewares/response");
const joi_1 = __importDefault(require("joi"));
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = req.auth;
            const result = yield __1.prisma.user.findUnique({
                where: { id: userData.id }
            });
            if (!result) {
                return res.status(404).json((0, response_1.errorRes)("Error", 404, "RESOURCE_NOT_FOUND", `User with id ${userData.id} does not exist`));
            }
            res.status(200).json((0, response_1.successRes)("Success", 200, "Data fetch successfully", result));
        }
        catch (error) {
            res.status(error.status).json({ msg: error.message });
        }
    });
}
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield __1.prisma.user.findMany();
            res.status(200).json((0, response_1.successRes)("success", 200, "Data fetch successfully", result));
        }
        catch (error) {
            return res.status(error.code).json((0, response_1.errorRes)("error", error.code, error.name, error.message));
        }
    });
}
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            const result = yield __1.prisma.user.findFirst({
                where: { id: Number(userId) }
            });
            if (!result)
                return res.status(404).json((0, response_1.errorRes)("error", 404, "RESOURCE_NOT_FOUND", `User with id ${userId} does not exist`));
            res.status(200).json((0, response_1.successRes)("success", 200, "Data fetch successfully", result));
        }
        catch (error) {
            res.send(error.message);
        }
    });
}
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, role, password } = req.body;
            const userData = req.auth;
            const schema = joi_1.default.object({
                name: joi_1.default.string().min(3).max(20),
                email: joi_1.default.string().email({ tlds: { allow: ["com", "net"] } }),
                password: joi_1.default.string().min(3).max(20),
                role: joi_1.default.string().valid("ADMIN", "USER")
            });
            const validate = schema.validate(req.body);
            if (validate.error) {
                return res.status(400).json((0, response_1.validateRes)(validate.error.message));
            }
            const checkUser = yield __1.prisma.user.findFirst({
                where: { email }
            });
            if (!checkUser) {
                return res.status(404).json((0, response_1.errorRes)("Error", 404, "RESOURCE_NOT_FOUND", `User with email ${email} does not exist!`));
            }
            const result = yield __1.prisma.user.update({
                where: {
                    id: userData.id
                },
                data: {
                    name,
                    email,
                    role,
                    password
                }
            });
            res.status(200).json((0, response_1.successRes)("Success", 200, `Success update user with email ${email}`, result));
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    });
}
