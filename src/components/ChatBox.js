import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { FaComments } from 'react-icons/fa';

const ChatBox = () => {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* Chat Button */}
      <button type="button" className="btn btn-primary z-3 position-fixed bottom-0 start-0 m-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <FaComments />
      </button>
      {/* Chat Model  */}
      <div className="modal fade modal-dark" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Chat Box</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="messages-wrapper">
                {messages?.map((message) => (
                  <Message key={message.id} message={message} />
                ))}
                <span ref={scroll}></span>
              </div>
            </div>
            <div className="modal-footer">
              <SendMessage scroll={scroll} />
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
