import router, { Router } from "express"
import { admin, jwtAuth } from "../middlewares/auth"
import { deleteUser, getUser, getUserById, getUsers, updateUser } from "../controllers/userController"

const userRouter: Router = router()

userRouter.get("/", jwtAuth, getUser)
userRouter.get("/all", jwtAuth, admin, getUsers)
userRouter.get("/all/:id", jwtAuth, admin, getUserById)

userRouter.put("/", jwtAuth, updateUser)
userRouter.delete("/", jwtAuth, deleteUser)

export default userRouter