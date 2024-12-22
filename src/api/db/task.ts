import { supabase } from '../db/index';
import { Task } from '../db/types';

export const createTask = async (task: Omit<Task, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert(task)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getTasks = async (userI