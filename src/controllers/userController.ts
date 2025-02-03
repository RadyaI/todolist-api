import { Request, Response } from 'express'
import { prisma } from '..'
import { errorRes, successRes } from '../middlewares/response'

export async function getAll(req: Request, res: Response): Promise<any> {
    try {
        const result = await prisma.user.findMany()
        res.status(200).json(successRes("success", 200, "Data fetch successfully", result))
    } catch (error: any) {
        return res.status(error.code).json(errorRes("error", error.code, error.name, error.message))
    }
}