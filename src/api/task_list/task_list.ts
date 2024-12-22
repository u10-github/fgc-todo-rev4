import { Request, Response } from 'express';
import { authenticateUser } from '../middleware/auth';
import { 
  createTaskList, 
  updateTaskList, 
  deleteTaskList, 
  getTaskListById, 
  getPublicTaskLists,
  importTaskList,
  likeTaskList
} from '../db/task_list';

export const createTaskListHandler = async (req: Request, res: Response) => {
  try {
    const userId = await authenticateUser(req);
    const taskListData = req.body;
    const newTaskList = await createTaskList(userId, taskListData);
    res.status(201).json(newTaskList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTaskListHandler = async (req: Request, res: Response) => {
  try {
    const userId = await authenticateUser(req);
    const taskListId = req.params.id;
    const updateData = req.body;
    const updatedTaskList = await updateTaskList(userId, taskListId, updateData);
    res.status(200).json(updatedTaskList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTaskListHandler = async (req: Request, res: Response) => {
  try {
    const userId = await authenticateUser(req);
    const taskListId = req.params.id;
    await deleteTaskList(userId, taskListId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTaskListHandler = async (req: Request, res: Response) => {
  try {
    const taskListId = req.params.id;
    const taskList = await getTaskListById(taskListId);
    res.status(200).json(taskList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPublicTaskListsHandler = async (req: Request, res: Response) => {
  try {
    const { page, limit, tags } = req.query;
    const publicTaskLists = await getPublicTaskLists(
      Number(page) || 1, 
      Number(limit) || 10, 
      tags as string[]
    );
    res.status(200).json(publicTaskLists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const importTaskListHandler = async (req: Request, res: Response) => {
  try {
    const userId = await authenticateUser(req);
    const taskListId = req.params.id;
    const importedTaskList = await importTaskList(userId, taskListId);
    res.status(201).json(importedTaskList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const likeTaskListHandler = async (req: Request, res: Response) => {
  try {
    const userId = await authenticateUser(req);
    const taskListId = req.params.id;
    const likedTaskList = await likeTaskList(userId, taskListId);
    res.status(200).json(likedTaskList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};