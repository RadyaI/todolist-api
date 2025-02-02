import router, { Router } from "express"

const authRouter: Router = router()

authRouter.get("/register", (req, res) => {
    res.json({ Register: "working" })
})

export default authRouter