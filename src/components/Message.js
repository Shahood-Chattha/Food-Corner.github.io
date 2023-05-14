import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  const time = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

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
          <p className="message-time mb-0 mr-1">{time}</p>
          {userSeenIcon}
          {operatorSeenIcon}
        </div>
      </div>
    </div>
  );
};

export default Message;
