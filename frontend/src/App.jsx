import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";

import Home from "../pages/Home";
import Top100 from "../pages/Top100";

const App = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black text-white font-sans">
        <Navbar searchValue={searchValue} onSearchChange={handleSearchChange} />
        <main className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/top100" element={<Top100 />} />
          </Routes>
        </main>
        <footer className="bg-gray-900 p-4 text-center text-gray-400">
          © 2025 Movie Explorer. All rights reserved.
        </footer>
      </div>
    </Router>
  );
};

export default App;
