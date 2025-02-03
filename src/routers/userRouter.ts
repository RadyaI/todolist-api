import router, { Router } from "express"
import { admin, jwtAuth } from "../middlewares/auth"
import { getAll } from "../controllers/userController"

const userRouter: Router = router()

userRouter.get("/")
userRouter.get("/all", jwtAuth, admin, getAll)
userRouter.get("/all/:id")

userRouter.put("/")
userRouter.delete("/")

export default userRouter