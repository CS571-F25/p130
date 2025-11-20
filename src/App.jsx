import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import SiteNav from "./components/SiteNav.jsx";
import Home from "./pages/Home.jsx";
import Reviews from "./pages/Reviews.jsx";
import Auth from "./pages/Auth.jsx";
import About from "./pages/About.jsx";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // load from localStorage
  useEffect(() => {
    const saved = window.localStorage.getItem("currentUser");
    if (saved) {
      setCurrentUser(saved);
    }
  }, []);

  // save to localStorage
  useEffect(() => {
    if (currentUser) {
      window.localStorage.setItem("currentUser", currentUser);
    } else {
      window.localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const handleSignOut = () => {
    setCurrentUser(null);
  };

  return (
    <HashRouter>
      <SiteNav currentUser={currentUser} onSignOut={handleSignOut} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/reviews"
          element={<Reviews currentUser={currentUser} />}
        />
        <Route
          path="/auth"
          element={
            <Auth
              currentUser={currentUser}
              onSignIn={setCurrentUser}
              onSignOut={handleSignOut}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  );
}
