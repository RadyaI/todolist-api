import { Request, Response } from "express";
import { hashSync, compareSync } from "bcrypt"
import * as jwt from 'jsonwebtoken'
import { prisma } from "..";
import { errorRes, successRes, validateRes } from "../middlewares/response";
import { JWT_TOKEN } from "../secret";
import Joi from "joi"

export async function register(req: Request, res: Response): Promise<any> {
    const { name, email, role, password } = req.body

    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: ["com", "net"] } }).required(),
        role: Joi.string().valid("ADMIN", "USER").required(),
        password: Joi.string().min(3).required()
    })

    const validate = schema.validate(req.body)
    if (validate.error) {
        return res.status(400).json(validateRes(validate.error.message))
    }

    const check = await prisma.user.findFirst({
        where: { email }
    })

    if (check) {
        return res.status(409).json(errorRes("error", 409, "RESOURCE_ALREADY_EXIST", "Email is already in use"))
    }

    const result = await prisma.user.create({
        data: {
            name,
            email,
            role,
            password: hashSync(password, 10)
        }
    })

    res.status(201).json(successRes("success", 201, "User registered successfully", result))
}

export async function login(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body

    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: ["com", "net"] } }).required(),
        password: Joi.string().min(3).required()
    })

    const validate = schema.validate(req.body)

    if (validate.error) {
        return res.status(400).json(validateRes(validate.error.message))
    }

    const result = await prisma.user.findFirst({
        where: { email }
    })
    if (!result) {
        return res.status(404).json(errorRes("error", 404, "RESOURCE_NOT_FOUND", `User with email ${email} does not exist!`))
    }
    if (!compareSync(password, result.password)) {
        return res.status(401).json(errorRes("error", 401, "INVALID_CREDENTIALS", "Wrong password!"))
    }

    const token = jwt.sign({
        id: result.id,
        email: result.email,
        role: result.role
    }, JWT_TOKEN, { expiresIn: "5h" })

    res.status(200).json(successRes("success", 200, "Login successfully", token))
}