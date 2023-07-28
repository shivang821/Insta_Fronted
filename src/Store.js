import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import appReducer from "./reducers/appReducer";
import uploadReducer from "./reducers/uploadReducer";


const Store = configureStore({
    reducer: {
       User:userReducer,
       App: appReducer,
       Upload:uploadReducer
    }
})
export default Store