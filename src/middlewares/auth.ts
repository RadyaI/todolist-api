import { NextFunction, Request, Response } from 'express'
import { errorRes } from './response'
import * as jwt from "jsonwebtoken"
import { JWT_TOKEN } from '../secret'

export function jwtAuth(req: Request, res: Response, next: NextFunction): any {
    const token = req.headers.authorization?.replace("Bearer ", "")!

    if (!token) {
        res.status(401).json(errorRes("error", 401, "INVALID TOKEN", "Token not found or invalid"))
    }

    jwt.verify(token, JWT_TOKEN, (err, decode) => {
        if (err) {
            return res.status(401).json(errorRes("error", 401, err.name, err.message))
        }

        (req as any).auth = decode

        next()
    })

}

export function admin(req: Request, res: Response, next: NextFunction): any {
    const userData = (req as any).auth

    if (userData.role !== "ADMIN") {
        return res.status(401).json(errorRes("error", 401, "UNAUTHORIZED_ACCESS", `Trying to access ADMIN with ${userData.role} role`))
    }

    next()
}