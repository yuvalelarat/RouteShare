import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App.jsx';
import store from './redux/store.js';
import theme from './theme';
import './index.css';


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <StrictMode>
                <App />
            </StrictMode>
        </ThemeProvider>
    </Provider>
);
