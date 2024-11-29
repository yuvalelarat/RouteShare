import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import theme from './theme';  // Import the custom theme
import { ThemeProvider, CssBaseline } from '@mui/material';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <StrictMode>
            <App />
        </StrictMode>
    </ThemeProvider>
);
