import { combineSlices, createSlice } from "@reduxjs/toolkit";
import { typeSlice } from "./Type";
import { propertySlice } from "./Property";
import { propertyValueSlice } from "./PropertyValue";
import { categorySlice } from "./Category";
import { componentSlice } from "./Component";



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



export const adminReducer = combineSlices(adminSlice, typeSlice, propertySlice, propertyValueSlice, categorySlice, componentSlice);
export const selectCurrentAdminMenu = state => state.admin.adminRoot.currentMenu;

export const {switchMenu} = adminSlice.actions;