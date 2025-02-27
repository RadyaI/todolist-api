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
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAuth = jwtAuth;
exports.admin = admin;
const response_1 = require("./response");
const jwt = __importStar(require("jsonwebtoken"));
const secret_1 = require("../secret");
function jwtAuth(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token) {
        res.status(401).json((0, response_1.errorRes)("error", 401, "INVALID TOKEN", "Token not found or invalid"));
    }
    jwt.verify(token, secret_1.JWT_TOKEN, (err, decode) => {
        if (err) {
            return res.status(401).json((0, response_1.errorRes)("error", 401, err.name, err.message));
        }
        req.auth = decode;
        next();
    });
}
function admin(req, res, next) {
    const userData = req.auth;
    if (userData.role !== "ADMIN") {
        return res.status(401).json((0, response_1.errorRes)("error", 401, "UNAUTHORIZED_ACCESS", `Trying to access ADMIN with ${userData.role} role`));
    }
    next();
}
