// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/Global.css';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
