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
exports.register = register;
exports.login = login;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
const response_1 = require("../middlewares/response");
const secret_1 = require("../secret");
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, role, password } = req.body;
        if (!name || name === "" || !email || email === "" || !role || role === "" || !password || password === "") {
            return res.status(400).json((0, response_1.errorRes)("error", 400, "MISSING_REQUIRED_FIELDS", "Required fields are missing."));
        }
        const check = yield __1.prisma.user.findFirst({
            where: { email }
        });
        if (check) {
            return res.status(409).json((0, response_1.errorRes)("error", 409, "RESOURCE_ALREADY_EXIST", "Email is already in use"));
        }
        const result = yield __1.prisma.user.create({
            data: {
                name,
                email,
                role,
                password: (0, bcrypt_1.hashSync)(password, 10)
            }
        });
        res.status(201).json((0, response_1.successRes)("success", 201, "User registered successfully", result));
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!email || email === "" || !password || password === "") {
            return res.status(400).json((0, response_1.errorRes)("error", 400, "MISSING_REQUIRED_FIELDS", "Email/password is empty"));
        }
        const result = yield __1.prisma.user.findFirst({
            where: { email }
        });
        if (!result) {
            return res.status(404).json((0, response_1.errorRes)("error", 404, "RESOURCE_NOT_FOUND", `User with email ${email} does not exist!`));
        }
        if (!(0, bcrypt_1.compareSync)(password, result.password)) {
            return res.status(401).json((0, response_1.errorRes)("error", 401, "INVALID_CREDENTIALS", "Wrong password!"));
        }
        const token = jsonwebtoken_1.default.sign({
            id: result.id,
            email: result.email,
            role: result.role
        }, secret_1.JWT_TOKEN, { expiresIn: "5h" });
        res.status(200).json((0, response_1.successRes)("success", 200, "Login successfully", token));
    });
}
