import { supabase } from '../db/index';
import { User } from '../db/types';

export const getUserProfile = async (userId: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
};

export const updateUserProfile = async (userId: string, profileData: Partial<User>): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .update(profileData)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating user profile:', error);
    return null;
  }

  return data;
};

export const createUserProfile = async (userData: Omit<User, 'id'>): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .insert(userData)
    .select()
    .single();

  if (error) {
    console.error('Error creating user profile:', error);
    return null;
  }

  return data;
};

export const deleteUserProfile = async (userId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId);

  if (error) {
    console.error('Error deleting user profile:', error);
    return false;
  }

  return true;
};