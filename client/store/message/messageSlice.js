import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: []
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        addMessages: (state, action) => {
            state.messages = action.payload;
        },
        addNewMessage: (state, action) => {
            state.messages.push(action.payload)
        }
    }
})

const { actions, reducer } = messageSlice;
export const { addMessages, addNewMessage } = actions;
export { reducer }