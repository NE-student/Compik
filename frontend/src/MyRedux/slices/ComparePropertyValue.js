import axios from "../../axiosInstance"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchComparePropertyValues = createAsyncThunk("property/fetchComparePropertyValues", async(params) =>{
    const {data} = await axios.post("compare/property/values/" + params.page, params).catch(function (error) {
      });
    return data;
})

export const createComparePropertyValue = createAsyncThunk("property/createComparePropertyValue", async(params) =>{
    const {data} = await axios.post("compare/property/value", params).catch((error) => {
      });
    return data;
})

export const updateComparePropertyValue = createAsyncThunk("property/updateComparePropertyValue", async(params) =>{
    const {data} = await axios.patch("compare/property/value/" + params.id, params).catch((error) => {
      });
    return data;
})

export const removeComparePropertyValue = createAsyncThunk("property/removeComparePropertyValue", async(id) =>{
    const {data} = await axios.delete("compare/property/value/" + id).catch((error) => {
      });
    return data;
})

const initialState = {
    propertyValues: null,
    loading: false,
    error: null,
    currentPage: 1
};

export const comparePropertyValueSlice = createSlice({
    name: "comparePropertyValue",
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
        builder.addCase(fetchComparePropertyValues.pending, (state) =>{
            state.propertyValues = null;
            state.error = null;
            state.loading = true;
        });
        builder.addCase(fetchComparePropertyValues.fulfilled, (state, action) =>{
            state.propertyValues = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchComparePropertyValues.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });

        //Create property value
        builder.addCase(createComparePropertyValue.pending, (state) =>{
            state.error = null;
            state.loading = true;
        });
        builder.addCase(createComparePropertyValue.fulfilled, (state, action) =>{
            state.loading = false;
        });
        builder.addCase(createComparePropertyValue.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });

        //Update property value
         builder.addCase(updateComparePropertyValue.pending, (state) =>{
            state.error = null;
            state.loading = true;
        });
        builder.addCase(updateComparePropertyValue.fulfilled, (state, action) =>{
            state.loading = false;
        });
        builder.addCase(updateComparePropertyValue.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });

        //Delete property value
        builder.addCase(removeComparePropertyValue.pending, (state) =>{
            state.error = null;
            state.loading = true;
        });
        builder.addCase(removeComparePropertyValue.fulfilled, (state, action) =>{
            state.loading = false;
        });
        builder.addCase(removeComparePropertyValue.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });
    }
});

export const {nextPage, previousPage, resetPage} = comparePropertyValueSlice.actions;