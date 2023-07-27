import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import appReducer from "./reducers/appReducer";


const Store = configureStore({
    reducer: {
       User:userReducer,
       App: appReducer
    }
})
export default Store