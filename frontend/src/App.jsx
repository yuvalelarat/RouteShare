import "./App.css";
import Navbar from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";
import NewTrip from "./Pages/NewTrip/NewTrip";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/new-trip" element={<NewTrip />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
