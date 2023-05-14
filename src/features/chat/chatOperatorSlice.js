import { createSlice } from '@reduxjs/toolkit';
import { ref, onValue } from "firebase/database";

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

