import router, { Router } from 'express'
import { jwtAuth } from '../middlewares/auth'
import { createTask, doneTask, getActiveTasks, getTaskById, getTasks } from '../controllers/taskController'

const taskRouter: Router = router()

taskRouter.get("/", jwtAuth, getTasks)
taskRouter.get("/active", jwtAuth, getActiveTasks)
taskRouter.get("/:id", jwtAuth, getTaskById)

taskRouter.post("/", jwtAuth, createTask)
taskRouter.put("/done/:id", jwtAuth, doneTask)
taskRouter.put("/:id")
taskRouter.delete("/:id")

export default taskRouter