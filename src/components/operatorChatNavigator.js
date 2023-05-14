import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchChats } from '../features/chat/chatOperatorSlice';
import "./operatorChatBoxStyle.css"

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
            {chats.map((chat) => (
                <div key={chat.id} className="my-1 d-flex justify-content-center overflow-x-hidden" >
                  <div className="btn px-4 py-2 rounded" onClick={() => onChatSelect(chat.id)} style={{backgroundColor: "#a9a9a9", width: "90%"}}>
                    <div className="d-flex align-items-center">
                      <img className="chat-bubble__avatar rounded-circle mr-2" src={chat.attributes?.avatar} alt="avatar" style={{ height: "35px", width: "35px" }} />
                      <p className="mb-0 text-truncate overflow-x-hidden">{chat.attributes?.name}</p>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default OperatorChatNavigator;
