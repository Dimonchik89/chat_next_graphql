import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload
        },
        resetUser: (state) => {
            state.user = ""
        }
    }
})

const { actions, reducer } = userSlice;
export const { addUser, resetUser} = actions;
export { reducer }