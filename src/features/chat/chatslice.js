import { createSlice } from '@reduxjs/toolkit';
import { ref, push, set, onValue, update, remove } from "firebase/database";

import { db } from '../../firebase.js';

const initialState = {
  messages: [],
  error: null
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    fetchMessagesSuccess: (state, action) => {
      return {
        ...state,
        messages: action.payload,
        error: null
      };
    },
    fetchMessagesFailure: (state, action) => {
      return {
        ...state,
        messages: [],
        error: action.payload
      };
    },
    addMessageSuccess: (state) => {
      return {
        ...state,
        error: null
      };
    },
    addMessageFailure: (state, action) => {
      return {
        ...state,
        error: action.payload
      };
    },
    addParticipantSuccess: (state) => {
      return {
        ...state,
        error: null
      };
    },
    addParticipantFailure: (state, action) => {
      return {
        ...state,
        error: action.payload
      };
    },
    addAttributesSuccess: (state) => {
      return {
        ...state,
        error: null
      };
    },
    addAttributesFailure: (state, action) => {
      return {
        ...state,
        error: action.payload
      };
    }
  }
});

export default chatSlice.reducer ;

export const {
  fetchMessagesSuccess,
  fetchMessagesFailure,
  addMessageSuccess,
  addMessageFailure,
  addParticipantSuccess,
  addParticipantFailure,
  addAttributesSuccess,
  addAttributesFailure,
} = chatSlice.actions;

export const fetchMessages = ( chatId ) => {
  return (dispatch) => {
    const messagesRef = ref(db, `chats/${chatId}/messages`);
    onValue(messagesRef, (snapshot) => {
      const messages = [];
      snapshot.forEach((childSnapshot) => {
        messages.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(fetchMessagesSuccess(messages));
    }, (error) => {
      dispatch(fetchMessagesFailure(error.message));
    });
  };
};

export const addMessage = ({ chatId, messageText, avatar, name, createdAt, uid, userISee, userIISee }) => {
  return (dispatch) => {
    const messagesRef = ref(db, `chats/${chatId}/messages`);
    const newMessageRef = push(messagesRef);
    const newMessage = {
      senderId: uid,
      text: messageText,
      avatar: avatar,
      name: name,
      timestamp: createdAt,
      userISee,
      userIISee
    };
    update(newMessageRef, newMessage)
      .then(() => {
        dispatch(addMessageSuccess());
      })
      .catch((error) => {
        dispatch(addMessageFailure(error.message));
      });
  };
};


export const addUserParticipant = ({ chatId, participantId, avatar, name }) => {
  return (dispatch) => {
    const newChatRef = ref(db, `chats/${chatId}/attributes`);
    const newChat = {
      avatar,
      name,
    };
    const participantRef = ref(db, `chats/${chatId}/participants/${participantId}`);
    set(participantRef, true)
      .then(() => {
      set(newChatRef, newChat);
      dispatch(addParticipantSuccess());
      })
      .catch((error) => {
        dispatch(addParticipantFailure(error.message));
      });
  };
};

export const addOperatorParticipant = ({ chatId, participantId }) => {
  return (dispatch) => {
    const participantRef = ref(db, `chats/${chatId}/participants/${participantId}`);
    set(participantRef, true)
      .then(() => {
      dispatch(addParticipantSuccess());
      })
      .catch((error) => {
        dispatch(addParticipantFailure(error.message));
      });
  };
};

export const markMessageAsuserIISeen = ({ chatId, messageId, userIISeen }) => {
  return () => {
    const messageRef = ref(db, `chats/${chatId}/messages/${messageId}`);
    update(messageRef, { userIISeen })
      .catch((error) => {
        console.log(`Error updating message with ID ${messageId}: ${error.message}`);
      })
  };
};


export const markMessageAsuserISeen = ({ chatId, messageId,  userISeen }) => {
  return () => {
    const messageRef = ref(db, `chats/${chatId}/messages/${messageId}`);
    update(messageRef, {  userISeen })
      .catch((error) => {
        console.log(`Error updating message with ID ${messageId}: ${error.message}`);
      })
  };
};


