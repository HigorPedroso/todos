import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import tasksRouter from './routers/tasksRouter'
import usersRouter from './routers/usersRouter'

const app = express()

app.use(cors())
app.use(express.json())

app.use("/tasks", tasksRouter)
app.use("/users", usersRouter)

app.use((req: Request, res: Response, next: NextFunction) => {
    res.send("Hello tasks")
})

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json(error.message)
})

export default app