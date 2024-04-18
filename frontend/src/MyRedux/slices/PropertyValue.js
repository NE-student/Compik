import axios from "../../axiosInstance"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPropertyValues = createAsyncThunk("property/fetchPropertyValues", async(params) =>{
    const {data} = await axios.post("property/values/" + params.page, params).catch(function (error) {
      });
    return data;
})

export const createPropertyValue = createAsyncThunk("property/createPropertyValue", async(params) =>{
    const {data} = await axios.post("property/value", params).catch((error) => {
      });
    return data;
})

export const updatePropertyValue = createAsyncThunk("property/updatePropertyValue", async(params) =>{
    const {data} = await axios.patch("property/value/" + params.id, params).catch((error) => {
      });
    return data;
})

export const removePropertyValue = createAsyncThunk("property/removePropertyValue", async(id) =>{
    const {data} = await axios.delete("property/value/" + id).catch((error) => {
      });
    return data;
})

const initialState = {
    propertyValues: null,
    loading: false,
    error: null,
    currentPage: 1
};

export const propertyValueSlice = createSlice({
    name: "propertyValue",
    initialState,
    reducers: {
        nextPage : (state) =>{
            state.currentPage += 1
        },
        previousPage: (state) =>{
            if(state.currentPage <= 1) return;
            state.currentPage -= 1
        },
        resetPage: (state) =>{
            state.currentPage = 1
        }
    },
    extraReducers: (builder) => {
        //Paginate property values
        builder.addCase(fetchPropertyValues.pending, (state) =>{
            state.propertyValues = null;
            state.error = null;
            state.loading = true;
        });
        builder.addCase(fetchPropertyValues.fulfilled, (state, action) =>{
            state.propertyValues = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchPropertyValues.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });

        //Create property value
        builder.addCase(createPropertyValue.pending, (state) =>{
            state.error = null;
            state.loading = true;
        });
        builder.addCase(createPropertyValue.fulfilled, (state, action) =>{
            state.loading = false;
        });
        builder.addCase(createPropertyValue.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });

        //Update property value
         builder.addCase(updatePropertyValue.pending, (state) =>{
            state.error = null;
            state.loading = true;
        });
        builder.addCase(updatePropertyValue.fulfilled, (state, action) =>{
            state.loading = false;
        });
        builder.addCase(updatePropertyValue.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });

        //Delete property value
        builder.addCase(removePropertyValue.pending, (state) =>{
            state.error = null;
            state.loading = true;
        });
        builder.addCase(removePropertyValue.fulfilled, (state, action) =>{
            state.loading = false;
        });
        builder.addCase(removePropertyValue.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });
    }
});

export const {nextPage, previousPage, resetPage} = propertyValueSlice.actions;