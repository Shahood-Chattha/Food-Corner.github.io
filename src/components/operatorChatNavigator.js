import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import "./operatorChatBoxStyle.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import { fetchChats } from '../features/chat/chatOperatorSlice';


const OperatorChatNavigator = ({ onChatSelect }) => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chatOperator.chats);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  if (!chats) {
    return <p>Loading...</p>;
  }

  if (chats.length === 0) {
    return <h1 className="text-center text-black" style={{ backgroundColor: "#808080"}}>No chats available</h1>;
  }

  return (
    <div style={{ height: "calc(100vh - 50px)", backgroundColor: "#778899", width: "100%" }}>
        <div className="pt-3">
          <h1 className="text-center text-black" style={{ backgroundColor: "#808080"}}>Chats</h1>
          <div className="overflow-y-auto">
            {chats.map((chat) => {
              let hasUnreadMessages = false; // flag to indicate if chat has any unread messages

              // iterate over messages to check if any messages are unread
              for (const message of Object.values(chat.messages)) {
                if (!message.userISeen) {
                  hasUnreadMessages = true;
                  break;
                }
              }

              return (
                <div key={chat.id} className="my-1 d-flex justify-content-center overflow-x-hidden" >
                  <div className="btn py-2 rounded px-4" onClick={() => onChatSelect(chat.id)} style={{backgroundColor: "#a9a9a9", width: "90%"}}>
                    <div className="d-flex align-items-center position-relative">
                      <img className="chat-bubble__avatar rounded-circle mr-2" src={chat.attributes?.avatar} alt="avatar" style={{ height: "35px", width: "35px" }} />
                      <div className="position-absolute" style={{ left: "-20px" }}>
                        {hasUnreadMessages && <FontAwesomeIcon icon={faBell} className="text-danger m-0 p-0" />}
                      </div>
                      <p className="mb-0 text-truncate overflow-x-hidden">{chat.attributes?.name}</p>
                      {hasUnreadMessages && <span className="ml-2"><i className="fa fa-bell text-danger"></i></span>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
    </div>
  )
}

export default OperatorChatNavigator;
