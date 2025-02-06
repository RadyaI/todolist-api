import { Request, Response } from 'express'
import Joi from 'joi'
import { errorRes, successRes, validateRes } from '../middlewares/response'
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

export async function getTaskById(req: Request, res: Response): Promise<any> {
    try {
        const userData = (req as any).auth
        const taskId = req.params.id

        const result = await prisma.task.findFirst({
            where: {
                id: Number(taskId),
                userId: userData.id
            }
        })

        if (!result) return res.status(404).json(errorRes("Error", 404, "RESOURCE_NOT_FOUND", `Task with userId ${userData.id} and task id ${taskId} does not exist!`))

        res.status(200).json(successRes("Success", 200, "Data fetched successfully", result))

    } catch (error: any) {
        res.status(500).json({ msg: error.message })
    }
}

export async function getActiveTasks(req: Request, res: Response): Promise<any> {
    try {
        const userData = (req as any).auth

        const result = await prisma.task.findMany({
            where: {
                userId: userData.id,
                status: false
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

export async function doneTask(req: Request, res: Response): Promise<any> {
    try {
        const userData = (req as any).auth
        const taskId = req.params.id

        const result = await prisma.task.updateMany({
            where: {
                id: Number(taskId),
                userId: userData.id,
                status: false
            },
            data: {
                status: true
            }
        })

        if (result.count === 0) return res.status(404).json(errorRes("Error", 404, "RESOURCE_NOT_FOUND", `Task with userId ${userData.id} and task id ${taskId} does not exist or already done`))

        res.status(200).json(successRes("Success", 200, "Task completed", result))

    } catch (error: any) {
        res.status(500).json({ msg: error.message })
    }
}

export async function updateTask(req: Request, res: Response): Promise<any> {
    try {
        const { taskName, priority } = req.body
        const taskId = req.params.id
        const userData = (req as any).auth

        const schema = Joi.object({
            taskName: Joi.string().min(3).max(200),
            priority: Joi.string().valid("Low", "Medium", "High"),
        })

        const validate = schema.validate(req.body)
        if (validate.error) return res.status(400).json(validateRes(validate.error.message))

        const result = await prisma.task.updateMany({
            where: {
                userId: userData.id,
                id: Number(taskId),
                status: false
            },
            data: {
                taskName,
                priority
            }
        })

        if (result.count === 0) return res.status(204).json(errorRes("Error", 204, "NO_CONTENT", `Task with userId ${userData.id} and task id ${taskId} does not exist or nothing happened`))
        res.status(200).json(successRes("Success", 200, "Data updated successfully", result))
    } catch (error: any) {
        res.status(500).json({ msg: error.message })
    }
}

export async function deleteTask(req: Request, res: Response): Promise<any> {
    try {
        const taskId = req.params.id
        const userData = (req as any).auth

        const result = await prisma.task.deleteMany({
            where: {
                id: Number(taskId),
                userId: userData.id
            }
        })

        if (result.count === 0) return res.status(404).json(errorRes("Error", 404, "RESOURCE_NOT_FOUND", `Task with userId ${userData.id} and taskId ${taskId} does not exist or already deleted`))

        res.status(200).json(successRes("Success", 200, "Task deleted successfully", result))

    } catch (error: any) {
        res.status(500).json({ msg: error.message })
    }
}