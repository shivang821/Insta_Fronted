import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {

        user: null,
        isAuthenticate: false,
        loading: false,
        error: null
    },
    reducers: {
        setUserLoading: (state) => {
            state.loading = true;
        },
        loadUser: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.isAuthenticate = true;
        },
        userFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;

        },
        clearUserError: (state) => {
            state.error = null
        }
    }
})
export const { setUserLoading, loadUser, userFail, clearUserError } = userSlice.actions
export default userSlice.reducer