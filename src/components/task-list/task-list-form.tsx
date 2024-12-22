import React, { useState } from 'react';
import { Input } from '../common/input';
import { TagSelector } from '../common/tag-selector';

interface TaskListFormProps {
  initialData?: {
    name: string;
    description?: string;
    