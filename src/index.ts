import express, { Express, Response, Request } from "express"
import { PORT } from "./secret"
import rootRouter from "./routers/root"

const app: Express = express()

app.get("/", (req: Request, res: Response) => {
    res.json({ status: "working" })
})

app.use("/api/v1", rootRouter)

app.listen(PORT, () => {
    console.log(`App running on port ${PORT} 😎`)
})