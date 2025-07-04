import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reservations from "./pages/Reservations";
import Events from "./pages/Events";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


export default function App() {
  return (
    <Router>
      <div className="bg-vampireBlack min-h-screen text-boneWhite font-gothic">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/events" element={<Events />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
