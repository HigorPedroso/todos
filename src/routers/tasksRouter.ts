import router, { Router } from 'express'
import { createTask, deleteTask, getTaskByid, getTasks, updateTask } from '../controllers/tasksController'
import authMiddleware from '../middlewares/authMiddleware'

const tasksRouter: Router = router()

tasksRouter.post("/", authMiddleware, createTask)
tasksRouter.get("/", authMiddleware, getTasks)
tasksRouter.get("/:id", authMiddleware, getTaskByid)
tasksRouter.put("/:id", authMiddleware, updateTask)
tasksRouter.delete("/:id", authMiddleware, deleteTask)

export default tasksRouter