import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "../../axiosInstance"

export const fetchCategories = createAsyncThunk("category/fetchCategories", async(page) =>{
    const {data} = await axios.get("categories/" + page).catch(function (error) {
        console.log(error.toJSON());
      });
    return data;
})

export const fetchPropertiesByCategory = createAsyncThunk("configuration/fetchPropertiesByCategory", async(id) =>{
    const {data} = await axios.get("component/properties/" + id).catch(function (error) {
        console.log(error.toJSON());
      });
    return data;
})

export const fetchComparePropertiesByCategory = createAsyncThunk("configuration/fetchComparePropertiesByCategory", async(id) =>{
    const {data} = await axios.get("component/compare/properties/" + id).catch(function (error) {
        console.log(error.toJSON());
      });
    return data;
})

export const fetchComponents = createAsyncThunk("configuration/fetchComponents", async(params) =>{
    const {data} = await axios.post("componentsByFilters/", params).catch(function (error) {
        console.log(error.toJSON());
      });
    return data;
})

const initialState = {
    properties: null,
    compareProperties: null,
    components: null,
    configurationComponents: {},
    filters : {properties:{}, compareProperties:{}, additionalCompareProperties:{}, price:{minNumber:0, maxNumber:100000}},
    currentCategory: null,
    categories :null,
};

const configurationSlice = createSlice({
    name: "configuration",
    initialState,
    reducers: {
        setCategory: (state, action) =>{
            state.currentCategory = action.payload
            state.filters.properties = initialState.filters.properties;
            state.filters.compareProperties = initialState.filters.compareProperties;
            state.filters.price = initialState.filters.price;
        },
        addComponent: (state, action) =>{
            state.configurationComponents[action.payload.category] = action.payload.component;
            state.filters.properties = initialState.filters.properties;
            state.filters.compareProperties = initialState.filters.compareProperties;
            state.filters.price = initialState.filters.price;
            state.filters.additionalCompareProperties[action.payload.category] = {}
            for (const [_, comp] of Object.entries(state.configurationComponents)) {
                console.log(comp.compareProperties);
                comp.compareProperties.forEach((compareProperty)=>{
                    state.filters.additionalCompareProperties[action.payload.category][compareProperty.property?.id] = compareProperty.value?.id || compareProperty.boolValue
                })
              }
        },
        addFilter: (state, action) =>{
            state.filters[action.payload.type][action.payload.property] = action.payload.propertyValue
        },
        resetFilters: (state) =>{
            state.filters.properties = initialState.filters.properties;
            state.filters.compareProperties = initialState.filters.compareProperties;
            state.filters.price = initialState.filters.price;
        },
        setMinPrice: (state, action) =>{
            state.filters.price.minNumber = action.payload
        },
        setMaxPrice: (state, action) =>{
            state.filters.price.maxNumber = action.payload
        },
    },
    extraReducers: (builder) => {

        //Paginate
        builder.addCase(fetchComponents.pending, (state) =>{
            state.components = null;
            state.error = null;
            state.loading = true;
        });
        builder.addCase(fetchComponents.fulfilled, (state, action) =>{
            state.components = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchComponents.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });

        //Get properties
        builder.addCase(fetchComparePropertiesByCategory.pending, (state) =>{
            state.compareProperties = null
            state.error = null;
            state.loading = true;
        });
        builder.addCase(fetchComparePropertiesByCategory.fulfilled, (state, action) =>{
            state.compareProperties = action.payload.data;
            state.loading = false;
        });
        builder.addCase(fetchComparePropertiesByCategory.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });


        //Get properties
        builder.addCase(fetchPropertiesByCategory.pending, (state) =>{
            state.properties = null
            state.error = null;
            state.loading = true;
        });
        builder.addCase(fetchPropertiesByCategory.fulfilled, (state, action) =>{
            state.properties = action.payload.data;
            state.loading = false;
        });
        builder.addCase(fetchPropertiesByCategory.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });

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
})



export const configurationReducer = configurationSlice.reducer;

export const {setCategory, addFilter, resetFilters, setMinPrice, setMaxPrice, addComponent} = configurationSlice.actions;