import axios from "../../axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTypes = createAsyncThunk("type/fetchTypes", async(page) =>{
    const {data} = await axios.get("types/" + page).catch(function (error) {
        console.log(error.toJSON());
      });
    return data;
})



const initialState = {
    types: null,
    loading: false,
    error: null,
    currentPage: 1
};

export const typeSlice = createSlice({
    name: "type",
    initialState,
    reducers: {
        nextPage : (state) =>{
            state.currentPage += 1
        },
        previousPage: (state) =>{
            if(state.currentPage <= 1) return;
            state.currentPage -= 1
        }
    },
    extraReducers: (builder) => {
        //Paginate types
        builder.addCase(fetchTypes.pending, (state) =>{
            state.types = null;
            state.error = null;
            state.loading = true;
        });
        builder.addCase(fetchTypes.fulfilled, (state, action) =>{
            state.types = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchTypes.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });
    }
});

export const {nextPage, previousPage} = typeSlice.actions;