import { combineReducers, configureStore } from "@reduxjs/toolkit";
import chatsReducer from "./reducers/ChatsSlice";
import newChatModalReducer from "./reducers/ModalNewChatSlice";
import { chatAPI } from "../services/ChatSirvice";
import dashboardReducer from "./reducers/DashboardSlice";
import currentChatReducer from "./reducers/CurrentChatSlice";

const rootReducer = combineReducers({
  chatsReducer,
  newChatModalReducer,
  dashboardReducer,
  currentChatReducer,
  [chatAPI.reducerPath]: chatAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaulMiddleware) =>
      getDefaulMiddleware().concat(chatAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
