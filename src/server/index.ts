import express from 'express';
import cors from 'cors';
import { initSupabase } from '../db/index';
import { setupAuthRoutes } from '../api/auth/auth';
import { setupTaskRoutes } from '../api/task/task';
import { setupTaskListRoutes } from '../api/task_list/task_list';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

initSupabase();

setupAuthRoutes(app);
setupTaskRoutes(