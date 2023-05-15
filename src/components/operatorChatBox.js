import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import "./operatorChatBoxStyle.css";

import { deleteInvalidMessages } from '../features/chat/chatOperatorSlice';
import Message from "./Message";
import SendMessage from "./SendMessage";
import { fetchMessages, markMessageAsuserISeen } from '../features/chat/chatslice';
import ChatDeleteModel from "./chatDeleteModel";

const OperatorChatBox = ({ chatId }) => {
  const scroll = useRef();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const prevMessages = useRef([]);

  useEffect(() => {
    dispatch(deleteInvalidMessages(chatId));
  }, [dispatch, chatId]);
  
  useEffect(() => {
    dispatch(fetchMessages(chatId));
  }, [dispatch, chatId]);

  const handleMouseOver = () => {
    messages.forEach(message => {
      const messageId = message.id
      dispatch(markMessageAsuserISeen({ chatId, messageId: messageId, userISeen: true}))
      prevMessages.current = messages;
    });
  };

  return (
    <div className="messages-wrapper position-relative" style={{ height: "calc(100vh - 50px)", width: "100%" }} onMouseOver={handleMouseOver} >
      <ChatDeleteModel chatId={chatId}/>
      <div className="overflow-y-auto px-2 mt-3" style={{ maxHeight: "calc(100vh - 200px)", width: "100%" }}>
        {messages?.map((message) => (
          <div key={message.id}>
            <Message message={message} chatId={chatId} scroll={scroll} />
            <span ref={scroll}></span>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center position-absolute bottom-0 start-50 translate-middle-x w-100 mb-2">
        <div className="container mx-auto">
          <SendMessage chatId={chatId} />
        </div>
      </div>
    </div>
  );
};

export default OperatorChatBox;
