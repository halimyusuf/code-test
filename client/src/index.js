import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import { ThemeProvider } from '@mui/material/styles';
import { mui5Theme } from './theme';

ReactDOM.render(

    <ThemeProvider theme={mui5Theme}>
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);
