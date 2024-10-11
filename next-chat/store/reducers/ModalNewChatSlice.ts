import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useRef } from "react";

interface modalNewChatState {
  open: boolean;
  selectedUserId: number | null;
}

const initialState: modalNewChatState = {
  open: false,
  selectedUserId: null,
};

export const modalNewChatSlice = createSlice({
  name: "modal:newChat",
  initialState: initialState,
  reducers: {
    open: (state) => {
      state.open = !state.open;
    },
    close: (state) => {
      state.open = false;
    },
    selectAndAddUser: (state, action: PayloadAction<number>) => {
      state.selectedUserId = action.payload;
    },
  },
});

export default modalNewChatSlice.reducer;
