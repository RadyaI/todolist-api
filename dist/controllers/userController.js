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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.getUserById = getUserById;
const __1 = require("..");
const response_1 = require("../middlewares/response");
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
