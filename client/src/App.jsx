import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reviews from "./pages/Reviews";
import Header from "./components/Header";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/community" element={<Reviews />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/profile/:username" element={<Profile />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;