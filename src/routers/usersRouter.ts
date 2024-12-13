import router, { Router } from 'express'
import { loginUser, registerUser } from '../controllers/usersController'

const usersRouter: Router = router()

usersRouter.post("/register", registerUser)
usersRouter.post("/login", loginUser)

export default usersRouter