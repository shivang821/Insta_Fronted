import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";


const Store = configureStore({
    reducer: {
       User:userReducer
    }
})
export default Store