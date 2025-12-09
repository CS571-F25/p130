// src/App.jsx
import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import SiteNav from "./components/SiteNav.jsx";
import Home from "./pages/Home.jsx";
import Reviews from "./pages/Reviews.jsx";
import Menus from "./pages/Menus.jsx";
import SampleMenu from "./pages/SampleMenu.jsx";
import MyStats from "./pages/MyStats.jsx";
import About from "./pages/About.jsx";
import Auth from "./pages/Auth.jsx";
import {
  getCurrentUserFromCookie,
  setCurrentUserCookie,
  clearCurrentUserCookie,
} from "./utils/cookies.js";
import "./App.css";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // On first load, sync from cookie
  useEffect(() => {
    const user = getCurrentUserFromCookie();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogin = (username) => {
    setCurrentUser(username);
    setCurrentUserCookie(username);
  };

  const handleSignOut = () => {
    clearCurrentUserCookie();
    setCurrentUser(null);
  };

  return (
    <HashRouter>
      <SiteNav currentUser={currentUser} onSignOut={handleSignOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home currentUser={currentUser} />} />
          <Route
            path="/reviews"
            element={<Reviews currentUser={currentUser} />}
          />
          <Route path="/menus" element={<Menus />} />
          <Route path="/sample-menu" element={<SampleMenu />} />
          <Route
            path="/my-stats"
            element={<MyStats currentUser={currentUser} />}
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/auth"
            element={<Auth currentUser={currentUser} onLogin={handleLogin} />}
          />
        </Routes>
      </main>
    </HashRouter>
  );
}
