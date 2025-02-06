import router, { Router } from 'express'
import { jwtAuth } from '../middlewares/auth'
import { createTask, deleteTask, doneTask, getActiveTasks, getTaskById, getTasks, updateTask } from '../controllers/taskController'

const taskRouter: Router = router()

taskRouter.get("/", jwtAuth, getTasks)
taskRouter.get("/active", jwtAuth, getActiveTasks)
taskRouter.get("/:id", jwtAuth, getTaskById)

taskRouter.post("/", jwtAuth, createTask)
taskRouter.put("/done/:id", jwtAuth, doneTask)
taskRouter.put("/:id", jwtAuth, updateTask)
taskRouter.delete("/:id", jwtAuth, deleteTask)

export default taskRouter