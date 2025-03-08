import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reviews from "./pages/Reviews";
import Header from "./components/Header";

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Reviews />} />
        </Routes>
      </Router>
  );
}

export default App;
