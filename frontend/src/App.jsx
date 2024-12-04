import './styles/global.css';
import Header from './components/header/Header.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import NewTripPage from './pages/NewTripPage.jsx';
import MyTripsPage from './pages/MyTripsPage.jsx';
import UserRoutes from './components/PrivateRoutes/UserRoutes.jsx';
import TripDaysPage from './pages/TripDaysPage.jsx';

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
                        <Route path="/trip/:trip_id" element={<TripDaysPage />} />
                        {/*TODO: <Route path="/trip/:tripId" element={<TripDetailsPage />} />*/}
                    </Route>
                </Routes>
                {/*TODO: Add footer??*/}
            </BrowserRouter>
        </>
    );
}

export default App;
