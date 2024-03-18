import { combineSlices, createSlice } from "@reduxjs/toolkit";
import { typeSlice } from "./Type";



const initialState = {
    currentMenu: "general"
};

const adminSlice = createSlice({
    name: "adminRoot",
    initialState,
    reducers: {
        switchMenu: (state, action) =>{
            state.currentMenu = action.payload
        }
    },
    extraReducers: (builder) => {
        
    }
})



export const adminReducer = combineSlices(adminSlice, typeSlice);
export const selectCurrentAdminMenu = state => state.admin.adminRoot.currentMenu;

export const {switchMenu} = adminSlice.actions;