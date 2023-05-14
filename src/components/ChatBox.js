import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { FaComments } from 'react-icons/fa';

import Message from "./Message";
import SendMessage from "./SendMessage";
import { fetchMessages,  markMessageAsuserISeen } from '../features/chat/chatslice';
import { deleteInvalidMessages } from '../features/chat/chatOperatorSlice';

const ChatBox = ({ chatId }) => {
  const scroll = useRef();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  
  useEffect(() => {
    dispatch(fetchMessages(chatId));
  }, [dispatch, chatId]);

  const handleDeleteInvalidMessages =() => {
    messages.forEach(message => {
      const messageId = message.id
      dispatch(markMessageAsuserISeen({ chatId, messageId: messageId, userISeen: true}))
    });
    dispatch(deleteInvalidMessages(chatId));
  }

  const handleReload = () => {
    dispatch(fetchMessages(chatId));
  };

  return (
    <>
      {/* Chat Button */}
      <button type="button" className="btn btn-primary z-3 position-fixed bottom-0 start-0 m-3" onClick={handleDeleteInvalidMessages} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
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
                {messages.length === 0 ? ( <div className="d-flex justify-content-center btn btn-outline-info" onClick={handleReload}>Reload</div> ) : null}
                {messages?.map((message) => (
                  <Message key={message.id} message={message} chatId={chatId} />
                ))}
                <span ref={scroll}></span>
              </div>
            </div>
            <div className="modal-footer">
              <span ref={scroll}></span>
              <SendMessage chatId={chatId} scroll={scroll}/>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
