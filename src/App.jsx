// src/App.jsx
import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import SiteNav from "./components/SiteNav.jsx";
import Home from "./pages/Home.jsx";
import Reviews from "./pages/Reviews.jsx";
import Menus from "./pages/Menus.jsx";
import SampleMenu from "./pages/SampleMenu.jsx";
import MyStats from "./pages/MyStats.jsx";
import Auth from "./pages/Auth.jsx";
import About from "./pages/About.jsx";

const USER_COOKIE_NAME = "uwDiningUser";

function readUserFromCookie() {
  if (typeof document === "undefined") return "";
  const parts = document.cookie.split(";").map((p) => p.trim());
  for (const part of parts) {
    if (part.startsWith(`${USER_COOKIE_NAME}=`)) {
      return decodeURIComponent(part.split("=", 2)[1] || "");
    }
  }
  return "";
}

function writeUserCookie(username) {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(username);
  // 30 days
  document.cookie = `${USER_COOKIE_NAME}=${value}; path=/; max-age=${
    60 * 60 * 24 * 30
  }`;
}

function clearUserCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${USER_COOKIE_NAME}=; path=/; max-age=0`;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const existing = readUserFromCookie();
    if (existing) {
      setCurrentUser(existing);
    }
  }, []);

  const handleLogin = (username) => {
    setCurrentUser(username);
    writeUserCookie(username);
  };

  const handleLogout = () => {
    setCurrentUser("");
    clearUserCookie();
  };

  return (
    <HashRouter>
      <SiteNav currentUser={currentUser} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/reviews"
          element={<Reviews currentUser={currentUser} />}
        />
        <Route path="/menus" element={<Menus />} />
        <Route path="/sample-menu" element={<SampleMenu />} />
        <Route
          path="/stats"
          element={<MyStats currentUser={currentUser} />}
        />
        <Route
          path="/auth"
          element={
            <Auth
              currentUser={currentUser}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  );
}
