import router, { Router } from "express"
import { register } from "../controllers/authController"

const authRouter: Router = router()

authRouter.post("/register", register)

export default authRouter