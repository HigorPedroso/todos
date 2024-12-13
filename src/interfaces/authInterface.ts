import { Request } from "express";

interface authRequest extends Request {
    user?: { id: number, email: string, name: string }
}

export default authRequest