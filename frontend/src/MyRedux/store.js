import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "MyRedux/slices/Auth";
import { adminReducer } from "MyRedux/slices/Admin";
import { configurationReducer } from "./slices/Configuration";


const store = configureStore({
    reducer: { 
        auth: authReducer,
        admin: adminReducer,
        configuration: configurationReducer,
    },
});

export default store;
