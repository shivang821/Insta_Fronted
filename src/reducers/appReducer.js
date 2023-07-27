import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "App",
    initialState: {
        modalOpen:false
    },
    reducers: {
        SET_MODAL_OPEN :(state,action)=>{
            state.modalOpen=action.payload
        }
    }
})
export const { SET_MODAL_OPEN} = appSlice.actions
export default appSlice.reducer