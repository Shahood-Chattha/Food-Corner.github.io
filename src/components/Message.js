import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom';

import { deleteInvalidMessages } from '../features/chat/chatOperatorSlice';
import { deleteUserMessage } from '../features/chat/chatOperatorSlice';
import { auth } from "../firebase";

const Message = ({ message, chatId }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [user] = useAuthState(auth);
  const time = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    dispatch(deleteInvalidMessages(chatId));
  }, [dispatch, chatId]);

  let userSeenIcon;
  if (message.senderId === user.uid) {
    if (message.userIISee) {
      userSeenIcon = <FontAwesomeIcon icon={faCheckDouble} style={{color: 'blue'}} />;
    } else {
      userSeenIcon = <FontAwesomeIcon icon={faCheckDouble} style={{color: 'grey'}} />;
    }
  } else {
    userSeenIcon = null;
  }

  let operatorSeenIcon;
  if (message.senderId === user.uid) {
    if (message.userISee) {
      operatorSeenIcon = <FontAwesomeIcon icon={faCheckDouble} style={{color: 'blue'}} />;
    } else {
      operatorSeenIcon = <FontAwesomeIcon icon={faCheckDouble} style={{color: 'grey'}} />;
    }
  } else {
    operatorSeenIcon = null;
  }

  const deleteMessage = (messageId) => {
    dispatch(deleteUserMessage({ messageId, chatId }))
  };

  return (
    <div
      className={`chat-bubble p-2 px-3 ${message.senderId === user.uid ? "right" : ""}`}>
      <img
        className="chat-bubble__left"
        src={message.avatar}
        alt="user avatar"
      />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message mb-0">{message.text}</p>
        <div className="d-flex align-items-center">
          {location.pathname === "/operatorchat" && (
            <div className="d-flex flex-grow-1 justify-content-start">
              <FontAwesomeIcon
                icon={faTrash}
                style={{ color: 'grey', cursor: 'pointer' }}
                onClick={() => deleteMessage(message.id)}
              />
            </div>
          )}
          <div className="d-flex justify-content-end">
            <p className="message-time mb-0 mr-1">{time}</p>
            {userSeenIcon}
            {operatorSeenIcon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
