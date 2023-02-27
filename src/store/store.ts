import { configureStore } from "@reduxjs/toolkit";
import signUp from "./signUpSlice";
import favor from "./favorSlice";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import search from "./searchSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import review from "./reviewSlice";

const persistConfig = {
  key: "root",
  storage: storage, // 저장 공간
  whitelist: ["favor"], // persist 적용하고 싶은 값
  blacklist: ["signUp"], // persist 적용하지 않을 내용
};

const reducer = combineReducers({
  signUp: signUp,
  favor: favor,
  search: search,
  // review: review,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
