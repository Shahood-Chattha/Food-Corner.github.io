import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { deleteInvalidMessages } from '../features/chat/chatOperatorSlice';
import { markMessageAsuserIISeen } from '../features/chat/chatslice';
import OperatorChatBox from "../components/operatorChatBox";
import OperatorChatNavigator from "../components/operatorChatNavigator";

const OperatorChatPage = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [chatId, setChatId] = useState("chatId1");
  const prevMessages = useRef([]);

  useEffect(() => {
    dispatch(deleteInvalidMessages(chatId));
  }, [dispatch, chatId]);

  const handleChatSelect = (selectedChatId) => {
    messages.forEach(message => {
      const messageId = message.id
      dispatch(markMessageAsuserIISeen({ chatId, messageId: messageId, userIISeen: true}))
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
