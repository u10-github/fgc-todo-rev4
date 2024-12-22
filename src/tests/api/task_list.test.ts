import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createTaskList, updateTaskList, deleteTaskList, getTaskLists, importTaskList } from '../api/task_list/task_list';
import { supabase } from '../db';

describe('TaskList API', () => {
  const mockUser = { id: 'test-user-id' };
  const mockTaskList