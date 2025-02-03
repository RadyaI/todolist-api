import router, { Router } from "express"
import { login, register } from "../controllers/authController"

const authRouter: Router = router()

authRouter.post("/register", register)
authRouter.post("/login", login)

export default authRouter