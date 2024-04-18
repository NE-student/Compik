import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "MyRedux/slices/Auth";
import { adminReducer } from "MyRedux/slices/Admin";


const store = configureStore({
    reducer: { 
        auth: authReducer,
        admin: adminReducer,
    },
});

export default store;
