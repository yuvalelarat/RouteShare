import "./styles/global.css";
import Header from "./components/Header/Header.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import NewTrip from "./Pages/NewTrip.jsx";
import MyTrips from "./Pages/MyTrips.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-trips" element={<MyTrips />} />
          <Route path="/new-trip" element={<NewTrip />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
