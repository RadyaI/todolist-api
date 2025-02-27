"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const jwt = __importStar(require("jsonwebtoken"));
const __1 = require("..");
const response_1 = require("../middlewares/response");
const secret_1 = require("../secret");
const joi_1 = __importDefault(require("joi"));
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, role, password } = req.body;
        const schema = joi_1.default.object({
            name: joi_1.default.string().required(),
            email: joi_1.default.string().email({ tlds: { allow: ["com", "net"] } }).required(),
            role: joi_1.default.string().valid("ADMIN", "USER").required(),
            password: joi_1.default.string().min(3).required()
        });
        const validate = schema.validate(req.body);
        if (validate.error) {
            return res.status(400).json((0, response_1.validateRes)(validate.error.message));
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
        const schema = joi_1.default.object({
            email: joi_1.default.string().email({ tlds: { allow: ["com", "net"] } }).required(),
            password: joi_1.default.string().min(3).required()
        });
        const validate = schema.validate(req.body);
        if (validate.error) {
            return res.status(400).json((0, response_1.validateRes)(validate.error.message));
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
        const token = jwt.sign({
            id: result.id,
            email: result.email,
            role: result.role
        }, secret_1.JWT_TOKEN, { expiresIn: "5h" });
        res.status(200).json((0, response_1.successRes)("success", 200, "Login successfully", token));
    });
}
