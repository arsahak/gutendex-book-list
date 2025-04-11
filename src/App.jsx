import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookDetails from "./pages/BookDetails";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/books/:id" element={<BookDetails />} />
    </Routes>
  </Router>
);

export default App;
