import { Request, Response } from 'express'
import { prisma } from '..'
import { errorRes, successRes } from '../middlewares/response'

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