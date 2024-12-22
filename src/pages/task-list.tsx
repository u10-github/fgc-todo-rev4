import React, { useState, useEffect } from 'react';
import { useTaskList } from '../../hooks/useTaskList';
import TaskListCard from '../../components/task-list/task-list-card';
import TaskListForm from '../../components/task-list/task-list-form';

const TaskListPage: React.FC = () => {
  const { 
    taskLists, 
    searchTaskLists, 
    createTaskList, 
    updateTaskList, 
    deleteTaskList 
  } = use