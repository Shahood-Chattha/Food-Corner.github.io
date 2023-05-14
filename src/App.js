import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";

import { auth } from "./firebase";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
import Home from "./pages/home.js";
import Footer from './components/footer.js';
import NavBar from './components/navbar';
import Cart from './pages/cart';
import ItemPage from './pages/itempage.js';
import OperatorChatPage from './pages/operatorChatPage';

function App() {
  const [user, Loading] = useAuthState(auth);
  const location = useLocation();
  const generateChatId = (userId) => {
    return `chatId_${userId}`;
  }
  const chatId = generateChatId(user?.uid);

  return (
    <div className="App pt-5">
      <NavBar />
      {Loading ? <div>loading...</div> : (
        <>
          {location.pathname !== '/operatorchat' && !user && <Welcome />}
            {location.pathname !== '/operatorchat' && user && (
              <>
                <ChatBox chatId={chatId} />
              </>
          )}
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/item/:productId" element={<ItemPage />} />
        <Route path="/operatorchat" element={user?.email === "chatthashahood309@gmail.com" ? (
        <>
          <OperatorChatPage />
        </>
      ) : null} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
