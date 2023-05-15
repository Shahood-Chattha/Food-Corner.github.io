import React, { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { deleteInvalidMessages } from '../features/chat/chatOperatorSlice';
import { markMessageAsuserISeen } from '../features/chat/chatslice';
import OperatorChatBox from "../components/operatorChatBox";
import OperatorChatNavigator from "../components/operatorChatNavigator";
import notificationSound from '../audio/notificationSound.mp3';

const OperatorChatPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [chatId, setChatId] = useState(null);
  const prevMessages = useRef([]);
  const [lastMessageId, setLastMessageId] = useState(null);

  useEffect(() => {
    dispatch(deleteInvalidMessages(chatId));
  }, [dispatch, chatId]);

  useEffect(() => {
    // play notification sound when a new message is received and userISeen is false
    const unseenMessages = messages.filter(message => !message.userISeen);
    if (unseenMessages.length > 0 && location.pathname === "/operatorchat") {
      const latestMessage = unseenMessages[unseenMessages.length - 1];
      if (latestMessage.id !== lastMessageId) {
        const audio = new Audio(notificationSound);
        audio.play();
        setLastMessageId(latestMessage.id);
      };
    };
    prevMessages.current = messages;
  }, [messages]);

  const handleChatSelect = (selectedChatId) => {
    messages.forEach(message => {
      const messageId = message.id
      dispatch(markMessageAsuserISeen({ chatId, messageId: messageId, userISeen: true}))
      prevMessages.current = messages;
    });
    setChatId(selectedChatId);
  };

  return (
    <div className="d-flex flex-row mx-0">
      <div className="p-0" style={{width: "25%"}}>
        <OperatorChatNavigator onChatSelect={handleChatSelect} />
      </div>
      <div className="p-0" style={{width: "75%"}}>
        <OperatorChatBox chatId={chatId} />
      </div>
    </div>
  );
};

export default OperatorChatPage;
