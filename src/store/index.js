import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../features/cart/cartslice";
import { fetchProducts } from "../features/product/productslice";
import productReducer from "../features/product/productslice";
import { fetchVariants } from "../features/product/variantslice";
import variantReducer from "../features/product/variantslice";
import { fetchFlavors } from "../features/product/flavorslice";
import flavorReducer from "../features/product/flavorslice";
import { fetchDeals } from "../features/product/dealslice";
import dealReducer from "../features/product/dealslice";
import { fetchItems } from "../features/product/itemslice";
import itemReducer from "../features/product/itemslice";
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
        variant: variantReducer,
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
store.dispatch(fetchFlavors());
store.dispatch(fetchItems());
store.dispatch(fetchDeals());

export const persistor = persistStore(store)