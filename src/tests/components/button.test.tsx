import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../../components/common/button';

describe('Button Component', () => {
  it('renders button with correct text', () => {
    const { getByText } = render(<Button>Click Me</Button>);