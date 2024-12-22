import { Database } from './schema';

export type User = Database['public']['Tables']['users']['Row'];
export type Task = Database['public']['Tables']['tasks']['Row'];
export type TaskList = Database['public']['Tables']['task_lists']['Row'];
export type Tag = Database['public']['Tables']['tags']['Row'];
export type Notification = Database['public']['Tables']['notifications']['Row'];

export interface UserProfile extends User {
  taskLists?: TaskList[];
  tasks?: Task[];
}

export interface TaskWithDetails extends Task {
  taskList?: TaskList;
  tags?: Tag[];
}

export interface TaskListWithDetails extends TaskList {
  tasks?: Task[];
  tags?: Tag[];
  creator?: User;
  likes?: number;
}

export type GameTitle = 
  | 'Street Fighter 6'
  | '鉄拳8'
  | 'GUILTY GEAR -STRIVE-'
  | '大乱闘スマッシュブラザーズ SPECIAL';

export type PlayerLevel = 
  | 'はじめたばかり'
  | 'ランクマに慣れてきた'
  | '上級者用';