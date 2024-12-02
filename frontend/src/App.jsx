import './styles/global.css';
import Header from './components/header/Header.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import RegisterPage from './Pages/RegisterPage.jsx';
import NewTripPage from './Pages/NewTripPage.jsx';
import MyTripsPage from './Pages/MyTripsPage.jsx';
import UserRoutes from './components/PrivateRoutes/UserRoutes.jsx';
import TripPage from './Pages/TripPage.jsx';

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route element={<UserRoutes />}>
                        <Route path="/my-trips" element={<MyTripsPage />} />
                        <Route path="/new-trip" element={<NewTripPage />} />
                        <Route path="/trip/:tripId" element={<TripPage />} />
                        {/*TODO: <Route path="/trip/:tripId" element={<TripDetailsPage />} />*/}
                    </Route>
                </Routes>
                {/*TODO: Add footer?*/}
            </BrowserRouter>
        </>
    );
}

export default App;
