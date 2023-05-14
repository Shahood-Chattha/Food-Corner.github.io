import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import "./operatorChatBoxStyle.css";

import { deleteInvalidMessages } from '../features/chat/chatOperatorSlice';
import Message from "./Message";
import SendMessage from "./SendMessage";
import { fetchMessages } from '../features/chat/chatslice';

const OperatorChatBox = ({ chatId }) => {
  const scroll = useRef();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);

  useEffect(() => {
    dispatch(deleteInvalidMessages(chatId));
  }, [dispatch, chatId]);
  
  useEffect(() => {
    dispatch(fetchMessages(chatId));
  }, [dispatch, chatId]);

  return (
    <div className="messages-wrapper overflow position-relative" style={{ height: "calc(100vh - 50px)", width: "100%" }}>
      <div className="overflow-y-auto px-2" style={{ maxHeight: "calc(100vh - 200px)", width: "100%" }}>
        {messages?.map((message) => (
          <Message key={message.id} message={message} chatId={chatId}/>
        ))}
      </div>
      <div className="d-flex justify-content-center position-absolute bottom-0 start-50 translate-middle-x w-100 mb-2">
        <div className="container mx-auto">
          <SendMessage chatId={chatId} />
        </div>
        <span ref={scroll}></span>
      </div>
    </div>
  );
};

export default OperatorChatBox;
