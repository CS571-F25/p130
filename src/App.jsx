import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import SiteNav from "./components/SiteNav.jsx";
import Home from "./pages/Home.jsx";
import Reviews from "./pages/Reviews.jsx";
import Auth from "./pages/Auth.jsx";
import About from "./pages/About.jsx";
import Menus from "./pages/Menus.jsx";
import { getCookie, setCookie, eraseCookie } from "./utils/cookies.js";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const saved = getCookie("diningUser");
    if (saved) {
      setCurrentUser(saved);
    }
  }, []);

  const handleSignIn = (name) => {
    setCurrentUser(name);
    setCookie("diningUser", name, 30);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    eraseCookie("diningUser");
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
              onSignIn={handleSignIn}
              onSignOut={handleSignOut}
            />
          }
        />
        <Route path="/menus" element={<Menus />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  );
}
