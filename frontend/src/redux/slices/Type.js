import axios from "../../axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTypes = createAsyncThunk("type/fetchTypes", async(page) =>{
    const {data} = await axios.get("types/" + page).catch(function (error) {
        console.log(error.toJSON());
      });
    return data;
})

export const createType = createAsyncThunk("type/createType", async(params) =>{
    const {data} = await axios.post("type", params).catch((error) => {
        console.log(error);
      });
    return data;
})

export const updateType = createAsyncThunk("type/updateType", async(params) =>{
    const {data} = await axios.patch("type/" + params.id, params).catch((error) => {
        console.log(error);
      });
    return data;
})

export const removeType = createAsyncThunk("type/removeType", async(id) =>{
    const {data} = await axios.delete("type/" + id).catch((error) => {
        console.log(error);
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

        //Create type
        builder.addCase(createType.pending, (state) =>{
            state.error = null;
            state.loading = true;
        });
        builder.addCase(createType.fulfilled, (state, action) =>{
            state.loading = false;
        });
        builder.addCase(createType.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });

        //Update type
         builder.addCase(updateType.pending, (state) =>{
            state.error = null;
            state.loading = true;
        });
        builder.addCase(updateType.fulfilled, (state, action) =>{
            state.loading = false;
        });
        builder.addCase(updateType.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });

        //Delete type
        builder.addCase(removeType.pending, (state) =>{
            state.error = null;
            state.loading = true;
        });
        builder.addCase(removeType.fulfilled, (state, action) =>{
            state.loading = false;
        });
        builder.addCase(removeType.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });
    }
});

export const {nextPage, previousPage} = typeSlice.actions;