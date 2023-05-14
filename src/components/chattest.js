import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages, addMessage } from '../features/chat/chatslice';

function ChatRoom({ chatId }) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    dispatch(fetchMessages(chatId));
  }, [dispatch, chatId]);

  const handleSend = (event) => {
    event.preventDefault();
    dispatch(addMessage({ chatId, messageText }));
    setMessageText('');
  };

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          <p>{message.text}</p>
        </div>
      ))}
      <form onSubmit={handleSend}>
        <input
          type="text"
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatRoom;
