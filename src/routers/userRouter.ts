import router, { Router } from "express"
import { admin, jwtAuth } from "../middlewares/auth"
import { getUser, getUserById, getUsers } from "../controllers/userController"

const userRouter: Router = router()

userRouter.get("/", jwtAuth, getUser)
userRouter.get("/all", jwtAuth, admin, getUsers)
userRouter.get("/all/:id", jwtAuth, admin, getUserById)

userRouter.put("/")
userRouter.delete("/")

export default userRouter