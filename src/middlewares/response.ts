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

export function errorRes(status: String, statusCode: Number, code: String, message: String) {
    return {
        status,
        statusCode,
        error: {
            code,
            message
        }
    }
}
