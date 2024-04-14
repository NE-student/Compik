import axios from "../../axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProperties = createAsyncThunk("property/fetchProperties", async(page) =>{
    const {data} = await axios.get("properties/" + page).catch(function (error) {
        console.log(error.toJSON());
      });
    return data;
})

export const createProperty = createAsyncThunk("property/createProperty", async(params) =>{
    const {data} = await axios.post("property", params).catch((error) => {
        console.log(error);
      });
    return data;
})

export const updateProperty = createAsyncThunk("property/updateProperty", async(params) =>{
    const {data} = await axios.patch("property/" + params.id, params).catch((error) => {
        console.log(error);
      });
    return data;
})

export const removeProperty = createAsyncThunk("property/removeProperty", async(id) =>{
    const {data} = await axios.delete("property/" + id).catch((error) => {
        console.log(error);
      });
    return data;
})

const initialState = {
    properties: null,
    loading: false,
    error: null,
    currentPage: 1
};

export const propertySlice = createSlice({
    name: "property",
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
        //Paginate propertys
        builder.addCase(fetchProperties.pending, (state) =>{
            state.properties = null;
            state.error = null;
            state.loading = true;
        });
        builder.addCase(fetchProperties.fulfilled, (state, action) =>{
            state.properties = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchProperties.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });

        //Create property
        builder.addCase(createProperty.pending, (state) =>{
            state.error = null;
            state.loading = true;
        });
        builder.addCase(createProperty.fulfilled, (state, action) =>{
            state.loading = false;
        });
        builder.addCase(createProperty.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });

        //Update property
         builder.addCase(updateProperty.pending, (state) =>{
            state.error = null;
            state.loading = true;
        });
        builder.addCase(updateProperty.fulfilled, (state, action) =>{
            state.loading = false;
        });
        builder.addCase(updateProperty.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });

        //Delete property
        builder.addCase(removeProperty.pending, (state) =>{
            state.error = null;
            state.loading = true;
        });
        builder.addCase(removeProperty.fulfilled, (state, action) =>{
            state.loading = false;
        });
        builder.addCase(removeProperty.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });
    }
});

export const {nextPage, previousPage} = propertySlice.actions;