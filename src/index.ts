import express, { Express, Response, Request } from "express"
import { PORT } from "./secret"
import rootRouter from "./routers/root"
import { PrismaClient } from "@prisma/client"

const app: Express = express()
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.json({ status: "working" })
})

app.use("/api/v1", rootRouter)

export const prisma = new PrismaClient()

app.listen(PORT, () => {
    console.log(`App running on port ${PORT} 😎`)
})