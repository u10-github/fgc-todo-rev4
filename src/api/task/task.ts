import { Request, Response } from 'express';
import { createTask, updateTask, deleteTask, getTasks } from '../db/task';
import { authenticateUser } from '../middleware/auth';

export const createTaskHandler = async (req: Request, res: Response) => {
  try {
    const userId = await authenticateUser(req);
    const taskData = { ...req.body, user_id: userId };
    const newTask = await createTask(taskData);
    res.status(201).json(newTask);
  }