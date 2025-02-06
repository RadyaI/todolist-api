import router, { Router } from 'express'
import { jwtAuth } from '../middlewares/auth'
import { createTask } from '../controllers/taskController'

const taskRouter: Router = router()

taskRouter.get("/")
taskRouter.get("/:id")

taskRouter.post("/", jwtAuth, createTask)
taskRouter.put("/:id")
taskRouter.delete("/:id")

export default taskRouter