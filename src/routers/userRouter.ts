import router, { Router } from "express"

const userRouter: Router = router()

userRouter.get("/")
userRouter.get("/all")
userRouter.get("/all/:id")

userRouter.put("/")
userRouter.delete("/")

export default userRouter