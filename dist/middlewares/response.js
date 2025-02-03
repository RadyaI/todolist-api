"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successRes = successRes;
exports.errorRes = errorRes;
function successRes(status, statusCode, message, data) {
    return {
        status,
        statusCode,
        result: {
            message,
            data
        }
    };
}
function errorRes(status, statusCode, code, message) {
    return {
        status,
        statusCode,
        error: {
            code,
            message
        }
    };
}
