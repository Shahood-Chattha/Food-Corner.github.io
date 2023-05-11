import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";

import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
import Home from "./pages/home.js";
import Footer from './components/footer.js';
import NavBar from './components/navbar';
import Cart from './pages/cart';
import ItemPage from './pages/itempage.js';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App pt-5">
      <NavBar />
      {!user ? (
        <Welcome />
      ) : (
        <>
          <ChatBox />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/item/:productId" element={<ItemPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
