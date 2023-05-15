import { createSlice } from '@reduxjs/toolkit';
import { ref, onValue, get, remove } from "firebase/database";

import { db } from '../../firebase.js';

const initialState = {
  chats: [],
  error: null
};

const chatOperatorSlice = createSlice({
  name: 'operatorChat',
  initialState,
  reducers: {
    fetchChatsSuccess: (state, action) => {
      return {
        ...state,
        chats: action.payload,
        error: null
      };
    },
    fetchChatsFailure: (state, action) => {
      return {
        ...state,
        chats: [],
        error: action.payload
      };
    },
  }
});

export default chatOperatorSlice.reducer;

export const { fetchChatsSuccess, fetchChatsFailure } = chatOperatorSlice.actions;

export const fetchChats = () => {
  return (dispatch) => {
    const chatsRef = ref(db, `chats`);
    onValue(chatsRef, (snapshot) => {
      const chats = [];
      snapshot.forEach((childSnapshot) => {
        const chatData = childSnapshot.val();
        const chat = {
          id: childSnapshot.key,
          ...chatData,
          name: chatData.name,
          avatar: chatData.avatar,
          participants: chatData.participants
        };
        chats.push(chat);
      });
      dispatch(fetchChatsSuccess(chats));
    }, (error) => {
      dispatch(fetchChatsFailure(error.message));
    });
  };
};

export const deleteInvalidMessages = (chatId) => {
  return () => {
    const messagesRef = ref(db, `chats/${chatId}/messages`);
    get(messagesRef).then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const message = childSnapshot.val();
        if (!message.name || !message.avatar || !message.senderId || !message.text) {
          remove(childSnapshot.ref)
          .catch((error) => {
            console.error(`Error deleting message ${childSnapshot.key}: `, error);
          });
        }
      });
    }).catch((error) => {
      console.error("Error fetching messages: ", error);
    });
  };
};

export const deleteUserMessage = ({ messageId, chatId }) => {
  return () => {
    const messageRef = ref(db, `chats/${chatId}/messages/${messageId}`);
    remove(messageRef)
    .catch((error) => {
      console.error("Error deleting message: ", error);
    });
  }
}

export const deleteChat = (chatId) => {
  return () => {
    const chatRef = ref(db, `chats/${chatId}`);
    remove(chatRef)
    .catch((error) => {
      console.error("Error removing chat: ", error);
    });
  }
};
