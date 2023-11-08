import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import userReducer from "./userReducer";

const store = configureStore({
    reducer:{
        user:userReducer,
        [userSlice.reducerPath]:userSlice.reducer,
}, 
 middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(userSlice.middleware)
})

export default store