import { Request, Response } from "express";
import { handleResponse } from "./tasksController";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../JWT/jwt";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    handleResponse(res, 401, "Name, email and password are require");
    return;
  }

  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      handleResponse(res, 400, "User already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    handleResponse(res, 201, "User created successfully", user);
  } catch (err) {
    handleResponse(res, 500, "Error creating user");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    handleResponse(res, 401, "Email and password are require");
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      handleResponse(res, 404, "User not found");
      return;
    }

    const isMatch = await bcrypt.compare(password, user?.password);

    if (!isMatch) {
      handleResponse(res, 401, "Password invalid");
    }

    const userData = { id: user.id, email: user.email, name: user.name };

    const token = await jwt.sign(userData, JWT_SECRET, {
      expiresIn: "1h",
    });

    handleResponse(res, 200, "User logged successfully", { token, userData });
  } catch {
    handleResponse(res, 500, "Error logging user");
  }
};
