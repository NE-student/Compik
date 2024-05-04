import axios from "../../axiosInstance"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchComparePropertyImpactCategories = createAsyncThunk("property/fetchComparePropertyImpactCategories", async(params) =>{
    const {data} = await axios.post("compare/property/impactCategories/" + params.page, params).catch(function (error) {
      });
    return data;
})

export const createComparePropertyImpactCategory = createAsyncThunk("property/createComparePropertyImpactCategory", async(params) =>{
    const {data} = await axios.post("compare/property/impactCategory", params).catch((error) => {
      });
    return data;
})

export const updateComparePropertyImpactCategory = createAsyncThunk("property/updateComparePropertyImpactCategory", async(params) =>{
    const {data} = await axios.patch("compare/property/impactCategory/" + params.id, params).catch((error) => {
      });
    return data;
})

export const removeComparePropertyImpactCategory = createAsyncThunk("property/removeComparePropertyImpactCategory", async(id) =>{
    const {data} = await axios.delete("compare/property/impactCategory/" + id).catch((error) => {
      });
    return data;
})

const initialState = {
    propertyImpactCategories: null,
    loading: false,
    error: null,
    currentPage: 1
};

export const comparePropertyImpactCategorySlice = createSlice({
    name: "comparePropertyImpactCategory",
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
        builder.addCase(fetchComparePropertyImpactCategories.pending, (state) =>{
            state.propertyImpactCategories = null;
            state.error = null;
            state.loading = true;
        });
        builder.addCase(fetchComparePropertyImpactCategories.fulfilled, (state, action) =>{
            state.propertyImpactCategories = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchComparePropertyImpactCategories.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });

        //Create property value
        builder.addCase(createComparePropertyImpactCategory.pending, (state) =>{
            state.error = null;
            state.loading = true;
        });
        builder.addCase(createComparePropertyImpactCategory.fulfilled, (state, action) =>{
            state.loading = false;
        });
        builder.addCase(createComparePropertyImpactCategory.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });

        //Update property value
         builder.addCase(updateComparePropertyImpactCategory.pending, (state) =>{
            state.error = null;
            state.loading = true;
        });
        builder.addCase(updateComparePropertyImpactCategory.fulfilled, (state, action) =>{
            state.loading = false;
        });
        builder.addCase(updateComparePropertyImpactCategory.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });

        //Delete property value
        builder.addCase(removeComparePropertyImpactCategory.pending, (state) =>{
            state.error = null;
            state.loading = true;
        });
        builder.addCase(removeComparePropertyImpactCategory.fulfilled, (state, action) =>{
            state.loading = false;
        });
        builder.addCase(removeComparePropertyImpactCategory.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });
    }
});

export const {nextPage, previousPage, resetPage} = comparePropertyImpactCategorySlice.actions;