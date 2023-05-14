import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  const time = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


  const userSeenIcon = message.senderId === user.uid ? (
    message.userIISee ? ( 
      <FontAwesomeIcon icon={faCheckDouble} style={{color: 'blue'}} />
    ) : ( 
      <FontAwesomeIcon icon={faCheckDouble} style={{color: 'grey'}} />
    )
  ) : (
    null
  )

  const operatorSeenIcon = message.senderId === user.uid ? (
    message.userISee ? (
      <FontAwesomeIcon icon={faCheckDouble} style={{color: 'blue'}} />
    ) : (
      <FontAwesomeIcon icon={faCheckDouble} style={{color: 'grey'}} />
    )
  ) : (
    null
  );

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
