import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

import { deleteInvalidMessages } from '../features/chat/chatOperatorSlice';
import OperatorChatBox from "../components/operatorChatBox";
import OperatorChatNavigator from "../components/operatorChatNavigator";

const OperatorChatPage = () => {
  const dispatch = useDispatch();
  const [chatId, setChatId] = useState("chatId1");

  useEffect(() => {
    dispatch(deleteInvalidMessages(chatId));
  }, [dispatch, chatId]);

  const handleChatSelect = (selectedChatId) => {
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
