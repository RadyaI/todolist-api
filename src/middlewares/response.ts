export function successRes(status: String, statusCode: Number, message: String, data: any) {
    return {
        status,
        statusCode,
        result: {
            message,
            data
        },
    }
}

export function errorRes(status: String, statusCode: Number, code: String, message: any) {
    return {
        status,
        statusCode,
        error: {
            code,
            message
        }
    }
}

export function validateRes(message: any) {
    return {
        status: "error",
        statusCode: 400,
        error: {
            code: "INVALID_INPUT",
            message
        }
    }
}
