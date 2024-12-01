import './styles/global.css';
import Header from './components/header/Header.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import RegisterPage from './Pages/RegisterPage.jsx';
import NewTripPage from './Pages/NewTripPage.jsx';
import MyTripsPage from './Pages/MyTripsPage.jsx';
import UsersRoutes from './components/PrivateRoutes/UsersRoutes.jsx';

function App() {


    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route element={<UsersRoutes />}>
                        <Route path="/my-trips" element={<MyTripsPage />} />
                        <Route path="/new-trip" element={<NewTripPage />} />
                    </Route>
                </Routes>
                {/*TODO: Add footer*/}
            </BrowserRouter>
        </>
    );
}

export default App;
