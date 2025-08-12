import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";

import Home from "../pages/Home";
import Top100 from "../pages/Top100";
import Footer from "../components/Footer";
import SearchResults from "./SearchResults";

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
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </main>
        <Footer></Footer>
      </div>
    </Router>
  );
};

export default App;
