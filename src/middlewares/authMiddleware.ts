import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { handleResponse } from '../controllers/tasksController'
import { JWT_SECRET } from '../JWT/jwt'
import { User } from '@prisma/client'
import authRequest from '../interfaces/authInterface'

const authMiddleware = async (req: authRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    try {
        if(!token) {
            handleResponse(res, 401, "Authorization token is missed or invalid")
            return
        }

        const decoded = await jwt.verify(token, JWT_SECRET) as User
        req.user = decoded

        next()
    } catch(err) {
        handleResponse(res, 401, "Token is invalid")
    }
}

export default authMiddleware