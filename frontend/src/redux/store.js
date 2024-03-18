import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/Auth";
import { adminReducer } from "./slices/Admin";


const store = configureStore({
    reducer: { 
        auth: authReducer,
        admin: adminReducer,
    },
});

export default store;
