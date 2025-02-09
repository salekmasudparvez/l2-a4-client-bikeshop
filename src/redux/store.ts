import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import { baseApi } from "./api/baseApi";
import authReducer from "./features/auth/authSlice";
import productsReducer from "./features/product/productSlice";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"], 
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer, 
    products: productsReducer,
  },
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(baseApi.middleware),
});

export const persistor = persistStore(store); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
