import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Manufacturer from "./pages/manufacturer";
import Retailer from "./pages/retailer";
import Consumer from "./pages/consumer";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🏠 Main Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* 🏭 Manufacturer */}
        <Route path="/manufacturer" element={<Manufacturer />} />

        {/* 🛍️ Retailer */}
        <Route path="/retailer" element={<Retailer />} />

        {/* 👁️ Consumer */}
        <Route path="/consumer" element={<Consumer />} />
      </Routes>
    </Router>
  );
}

export default App;