import router, { Router } from 'express'
import authRouter from './authRouter'

const rootRouter: Router = router()

rootRouter.use("/auth", authRouter)

rootRouter.use("*", (req, res) => {
    res.status(404).json({ Route: "Not Found" })
})

export default rootRouter