import axios from "../../axiosInstance"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCompareProperties = createAsyncThunk("property/fetchCompareProperties", async(page) =>{
    const {data} = await axios.get("compare/properties/" + page).catch(function (error) {
        console.log(error.toJSON());
      });
    return data;
})

export const createCompareProperty = createAsyncThunk("property/createCompareProperty", async(params) =>{
    const {data} = await axios.post("compare/property", params).catch((error) => {
        console.log(error);
      });
    return data;
})

export const updateCompareProperty = createAsyncThunk("property/updateCompareProperty", async(params) =>{
    const {data} = await axios.patch("compare/property/" + params.id, params).catch((error) => {
        console.log(error);
      });
    return data;
})

export const removeCompareProperty = createAsyncThunk("property/removeCompareProperty", async(id) =>{
    const {data} = await axios.delete("compare/property/" + id).catch((error) => {
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

export const comparePropertySlice = createSlice({
    name: "compareProperty",
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
        //Paginate properties
        builder.addCase(fetchCompareProperties.pending, (state) =>{
            state.properties = null;
            state.error = null;
            state.loading = true;
        });
        builder.addCase(fetchCompareProperties.fulfilled, (state, action) =>{
            state.properties = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchCompareProperties.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });

        //Create property
        builder.addCase(createCompareProperty.pending, (state) =>{
            state.error = null;
            state.loading = true;
        });
        builder.addCase(createCompareProperty.fulfilled, (state, action) =>{
            state.loading = false;
        });
        builder.addCase(createCompareProperty.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });

        //Update property
         builder.addCase(updateCompareProperty.pending, (state) =>{
            state.error = null;
            state.loading = true;
        });
        builder.addCase(updateCompareProperty.fulfilled, (state, action) =>{
            state.loading = false;
        });
        builder.addCase(updateCompareProperty.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });

        //Delete property
        builder.addCase(removeCompareProperty.pending, (state) =>{
            state.error = null;
            state.loading = true;
        });
        builder.addCase(removeCompareProperty.fulfilled, (state, action) =>{
            state.loading = false;
        });
        builder.addCase(removeCompareProperty.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });
    }
});

export const {nextPage, previousPage} = comparePropertySlice.actions;