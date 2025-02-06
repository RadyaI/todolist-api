import { Request, Response } from 'express'
import Joi from 'joi'
import { successRes, validateRes } from '../middlewares/response'
import { prisma } from '..'

export async function getTasks(req: Request, res: Response): Promise<any> {
    try {
        const userData = (req as any).auth

        const result = await prisma.task.findMany({
            where: {
                userId: userData.id
            }
        })

        if (result.length === 0) {
            return res.status(404).json(successRes("Success", 404, "Resources is empty", result))
        }

        res.status(200).json(successRes("Success", 200, "Data fetched successfully", result))

    } catch (error: any) {
        res.status(500).json({ msg: error.message })
    }
}

export async function createTask(req: Request, res: Response): Promise<any> {
    try {
        const userData = (req as any).auth
        const { taskName, priority } = req.body

        const schema = Joi.object({
            taskName: Joi.string().min(3).max(200).required(),
            priority: Joi.string().valid("Low", "Medium", "High")
        })

        const validate = schema.validate(req.body)
        if (validate.error) return res.status(400).json(validateRes(validate.error.message))

        const result = await prisma.task.create({
            data: {
                userId: userData.id,
                taskName,
                priority
            }
        })

        res.status(201).json(successRes("Success", 201, "Create task successfully", result))

    } catch (error: any) {
        res.status(500).json({ msg: error.message })
    }
}