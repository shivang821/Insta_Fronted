import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import appReducer from "./reducers/appReducer";
import uploadReducer from "./reducers/uploadReducer";
import reelsReducer from "./reducers/reelsReducer";
import UserProfileReducer from "./reducers/UserProfileReducer";


const Store = configureStore({
    reducer: {
       User:userReducer,
       UserProfile:UserProfileReducer,
       App: appReducer,
       Upload:uploadReducer,
       Reels:reelsReducer
    }
})
export default Store