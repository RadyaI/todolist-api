import { Request, Response } from 'express'
import { prisma } from '..'
import { errorRes, successRes, validateRes } from '../middlewares/response'
import Joi, { any, string } from 'joi'

export async function getUser(req: Request, res: Response): Promise<any> {
    try {
        const userData = (req as any).auth

        const result = await prisma.user.findUnique({
            where: { id: userData.id }
        })
        if (!result) {
            return res.status(404).json(errorRes("Error", 404, "RESOURCE_NOT_FOUND", `User with id ${userData.id} does not exist`))
        }
        res.status(200).json(successRes("Success", 200, "Data fetch successfully", result))

    } catch (error: any) {
        res.status(error.status).json({ msg: error.message })
    }
}

export async function getUsers(req: Request, res: Response): Promise<any> {
    try {
        const result = await prisma.user.findMany()
        res.status(200).json(successRes("success", 200, "Data fetch successfully", result))
    } catch (error: any) {
        return res.status(error.code).json(errorRes("error", error.code, error.name, error.message))
    }
}

export async function getUserById(req: Request, res: Response): Promise<any> {
    try {
        const userId: Number | String = req.params.id!
        const result = await prisma.user.findFirst({
            where: { id: Number(userId) }
        })
        if (!result) return res.status(404).json(errorRes("error", 404, "RESOURCE_NOT_FOUND", `User with id ${userId} does not exist`))

        res.status(200).json(successRes("success", 200, "Data fetch successfully", result))
    } catch (error: any) {
        res.send(error.message)
    }
}

export async function updateUser(req: Request, res: Response): Promise<any> {
    try {
        const { name, email, role, password } = req.body
        const userData = (req as any).auth

        const schema = Joi.object({
            name: Joi.string().min(3).max(20),
            email: Joi.string().email({ tlds: { allow: ["com", "net"] } }),
            password: Joi.string().min(3).max(20),
            role: Joi.string().valid("ADMIN", "USER")
        })

        const validate = schema.validate(req.body)
        if (validate.error) {
            return res.status(400).json(validateRes(validate.error.message))
        }

        const checkUser = await prisma.user.findFirst({
            where: { email }
        })
        if (!checkUser) {
            return res.status(404).json(errorRes("Error", 404, "RESOURCE_NOT_FOUND", `User with email ${email} does not exist!`))
        }

        const result = await prisma.user.update({
            where: {
                id: userData.id
            },
            data: {
                name,
                email,
                role,
                password
            }
        })

        res.status(200).json(successRes("Success", 200, `Success update user with email ${email}`, result))

    } catch (error: any) {
        res.status(500).json({ msg: error.message })
    }
}

export async function deleteUser(req: Request, res: Response): Promise<any> {
    try {
        const userData = (req as any).auth

        const result = await prisma.user.delete({
            where: { id: userData.id }
        })

        if (!result) {
            return res.status(404).json(errorRes("Error", 404, "RESOURCE_NOT_FOUND", `User with id ${userData.id} does not exist!`))
        }

        res.status(200).json(successRes("Success", 200, "Success delete user", result))

    } catch (error: any) {
        res.status(500).json({ msg: error.message })
    }
}