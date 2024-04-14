import axios from "../../axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk("category/fetchCategories", async(page) =>{
    const {data} = await axios.get("categories/" + page).catch(function (error) {
        console.log(error.toJSON());
      });
    return data;
})



const initialState = {
    categories: null,
    loading: false,
    error: null,
    currentPage: 1
};

export const categorySlice = createSlice({
    name: "category",
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
        builder.addCase(fetchCategories.pending, (state) =>{
            state.categories = null;
            state.error = null;
            state.loading = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) =>{
            state.categories = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchCategories.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });
    }
});

export const {nextPage, previousPage} = categorySlice.actions;