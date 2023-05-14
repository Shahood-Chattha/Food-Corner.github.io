import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../features/cart/cartslice";
import productReducer, { fetchProducts } from "../features/product/productslice";
import variantReducer, { fetchVariants } from "../features/product/variantslice";
import flavorReducer, { fetchFlavors } from "../features/product/flavorslice";
import chatReducer, { fetchMessages } from "../features/chat/chatslice";
import chatOperatorReducer, { fetchChats } from "../features/chat/chatOperatorSlice";
import dealReducer, { fetchDeals } from "../features/product/dealslice";
import itemReducer, { fetchItems } from "../features/product/itemslice";
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer)


export const store = configureStore({
    reducer: {
        cart: persistedReducer,
        product: productReducer,
        chatOperator: chatOperatorReducer,
        variant: variantReducer,
        chat: chatReducer,
        item: itemReducer,
        flavor: flavorReducer,
        deal: dealReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    })
});

store.dispatch(fetchProducts());
store.dispatch(fetchVariants());
store.dispatch(fetchChats());
store.dispatch(fetchMessages());
store.dispatch(fetchFlavors());
store.dispatch(fetchItems());
store.dispatch(fetchDeals());

export const persistor = persistStore(store)