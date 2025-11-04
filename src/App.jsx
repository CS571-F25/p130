import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Reviews from "./pages/Reviews.jsx";
import Auth from "./pages/Auth.jsx";
import About from "./pages/About.jsx";

export default function App() {
  return (
    <HashRouter>
      <nav className="p-3 border-bottom">
        <Link className="me-3" to="/">Home</Link>
        <Link className="me-3" to="/reviews">Reviews</Link>
        <Link className="me-3" to="/auth">Sign In</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  );
}
