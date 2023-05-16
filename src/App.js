import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";

import { auth } from "./firebase";
import ChatBox from "./components/ChatBox";
import SignInBanner from "./components/signInBanner";
import Home from "./pages/home.js";
import Footer from './components/footer.js';
import NavBar from './components/navbar';
import Register from './components/Register';
import Reset from './components/Reset';
import Cart from './pages/cart';
import ItemPage from './pages/itempage.js';
import OperatorChatPage from './pages/operatorChatPage';
import LoginPage from './pages/LoginPage';

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
          <div className="position-fixed z-3" style={{ width: "100%"}}>
            {!user && <SignInBanner />}
          </div>
          {location.pathname !== '/operatorchat' && user && (
            <>
              <ChatBox chatId={chatId} />
            </>
          )}
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login_page" element={<LoginPage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/reset" element={<Reset />} />
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
