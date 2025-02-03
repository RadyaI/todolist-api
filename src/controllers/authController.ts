import { Request, Response } from "express";
import { hashSync, compareSync } from "bcrypt"
import jwt, { sign } from 'jsonwebtoken'
import { prisma } from "..";
import { errorRes, successRes } from "../middlewares/response";
import { JWT_TOKEN } from "../secret";

export async function register(req: Request, res: Response): Promise<any> {
    const { name, email, role, password } = req.body

    if (!name || name === "" || !email || email === "" || !role || role === "" || !password || password === "") {
        return res.status(400).json(errorRes("error", 400, "MISSING_REQUIRED_FIELDS", "Required fields are missing."))
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
    if (!email || email === "" || !password || password === "") {
        return res.status(400).json(errorRes("error", 400, "MISSING_REQUIRED_FIELDS", "Email/password is empty"))
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
        email: result.email
    }, JWT_TOKEN, { expiresIn: "5h" })

    res.status(200).json(successRes("success", 200, "Login successfully", token))
}