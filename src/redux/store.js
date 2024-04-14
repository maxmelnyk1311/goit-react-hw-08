import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contacts/contactsSlice.js";
import filtersReducer from "./filter/filtersSlice.js";
import authReducer from "./auth/authSlice.js";
import storage from "redux-persist/lib/storage";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";

  const authPersistReducer = persistReducer(
    {
    key: "authSlice",
    storage,
    whitelist: ["token"],
    }, 
    authReducer
);

export const store = configureStore({
    reducer: {
        contacts: contactsReducer,
        filters: filtersReducer,
        auth: authPersistReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
