import React, { useState } from "react";
import { serverTimestamp } from "firebase/database";
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { auth } from "../firebase";
import { addMessage, addUserParticipant, addOperatorParticipant } from '../features/chat/chatslice';

const SendMessage = ({ chatId, scroll }) => {
  const location = useLocation();
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const sendMessage = (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    dispatch(addMessage({
      chatId,
      messageText: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid, 
    }));
    if(location.pathname === '/operatorchat') {
      dispatch(addOperatorParticipant({ chatId, participantId: uid}));
    } else {
      dispatch(addUserParticipant({ chatId, participantId: uid, avatar: photoURL, name: displayName, }));
    }
    setMessage("");
    if(location.pathname !== '/operatorchat') {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <form onSubmit={(event) => sendMessage(event)} >
      <div className="d-flex justify-content-end">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="form-control me-2 flex-grow-1"
        />
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </div>
    </form>
  );
};

export default SendMessage;
