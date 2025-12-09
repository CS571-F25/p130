// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import SiteNav from "./components/SiteNav.jsx";

import Home from "./pages/Home.jsx";
import Reviews from "./pages/Reviews.jsx";
import Menus from "./pages/Menus.jsx";
import SampleMenu from "./pages/SampleMenu.jsx";
import MyStats from "./pages/MyStats.jsx";
import Auth from "./pages/Auth.jsx";
import About from "./pages/About.jsx";

import "./App.css";
import "./food-icons.css";
import "./reviews-pagination.css";

export default function App() {
  return (
    <>
      <SiteNav />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reviews" element={<Reviews />} />
          {/* Hall ratings / menus & ratings overview */}
          <Route path="/menus" element={<Menus />} />
          {/* Nutrislice-style daily menu page, labeled "Menu Today" in nav */}
          <Route path="/sample-menu" element={<SampleMenu />} />
          {/* Per-user stats */}
          <Route path="/mystats" element={<MyStats />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/about" element={<About />} />
          {/* Fallback to home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </>
  );
}
