import { Request, Response } from "express";
import { hashSync } from "bcrypt"
import { prisma } from "..";
import { errorRes, successRes } from "../middlewares/response";

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