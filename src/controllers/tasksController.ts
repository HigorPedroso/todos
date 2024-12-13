import { Response } from "express";
import prisma from "../prisma/client";
import authRequest from "../interfaces/authInterface";

export const handleResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: any
) => {
  res.status(statusCode).json({
    message,
    data,
  });
};

export const createTask = async (req: authRequest, res: Response) => {
  const { title, description, status } = req.body;

  if (!title || !description) {
    handleResponse(res, 401, "Title and description are required");
    return;
  }

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        idUser: req.user?.id
      },
    });

    handleResponse(res, 201, "Task created successfully", task);
  } catch (err) {
    console.log(err);
    handleResponse(res, 500, "Error creating task");
  }
};

export const getTasks = async (req: authRequest, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
        where: {
            idUser: req.user?.id
        }
    });

    handleResponse(res, 200, "Tasks retrieved succesfully", tasks);
  } catch (err) {
    handleResponse(res, 500, "Error getting task");
  }
};

export const getTaskByid = async (req: authRequest, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const task = await prisma.task.findUnique({
      where: {
        id,
        idUser: req.user?.id
      },
    });

    if (!task) {
      handleResponse(res, 404, "Task not found");
      return;
    }

    handleResponse(res, 200, "Task retrieved successfully", task);
  } catch (err) {
    handleResponse(res, 500, "Error getting task");
  }
};

export const updateTask = async (req: authRequest, res: Response) => {
  const id = parseInt(req.params.id);

  const { title, description, status } = req.body;

  const updateData: {
    title?: string;
    description?: string;
    status?: "pending" | "completed";
  } = {};

  if (title !== undefined) {
    updateData.title = title;
  }

  if (description !== undefined) {
    updateData.description = description;
  }

  if (status !== undefined) {
    updateData.status = status;
  }

  try {
    if (Object.keys(updateData).length === 0) {
      handleResponse(res, 401, "No fields provided to update");
      return;
    }

    const task = await prisma.task.update({
      where: {
        id,
        idUser: req.user?.id
      },
      data: updateData,
    });

    handleResponse(res, 200, "Task updated successfully", task);
  } catch (err) {
    handleResponse(res, 500, "Error updating task");
  }
};

export const deleteTask = async (req: authRequest, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.task.delete({
      where: {
        id,
        idUser: req.user?.id
      },
    });

    handleResponse(res, 204, "Task deleted successfully");
  } catch (err) {
    if (err === "P2025") {
      handleResponse(res, 404, "Task not found");
    } else {
      handleResponse(res, 500, "Error deleting task");
    }
  }
};
