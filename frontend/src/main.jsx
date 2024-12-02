import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store.js';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App.jsx';
import theme from './theme';
import './index.css';


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <StrictMode>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </StrictMode>
        </ThemeProvider>
    </Provider>
);
