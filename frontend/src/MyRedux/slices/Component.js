import axios from "../../axiosInstance"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchComponent = createAsyncThunk("component/fetchComponent", async(id) =>{
    const {data} = await axios.get("component/" + id).catch(function (error) {
        console.log(error.toJSON());
      });
    return data;
})


export const fetchComponents = createAsyncThunk("component/fetchComponents", async(params) =>{
    const {data} = await axios.post("components/" + params.page, params).catch(function (error) {
        console.log(error.toJSON());
      });
    return data;
})

export const createComponent = createAsyncThunk("component/createComponent", async(params) =>{
    const {data} = await axios.post("component", params).catch((error) => {
        console.log(error);
      });
    return data;
})

export const updateComponent = createAsyncThunk("component/updateComponent", async(params) =>{
    console.log(params);
    const {data} = await axios.patch("component/" + params.id, params).catch((error) => {
        console.log(error);
      });
    return data;
})

export const removeComponent = createAsyncThunk("component/removeComponent", async(id) =>{
    const {data} = await axios.delete("component/" + id).catch((error) => {
        console.log(error);
      });
    return data;
})

const initialState = {
    currentComponent: null,
    components: null,
    loading: false,
    error: null,
    currentPage: 1
};

export const componentSlice = createSlice({
    name: "component",
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
        //Get
        builder.addCase(fetchComponent.pending, (state) =>{
            state.currentComponent = null;
            state.error = null;
            state.loading = true;
        });
        builder.addCase(fetchComponent.fulfilled, (state, action) =>{
            state.currentComponent = action.payload.component;
            state.loading = false;
        });
        builder.addCase(fetchComponent.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });


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

        //Create

        builder.addCase(createComponent.pending, (state) =>{
            state.currentComponent = null;
            state.error = null;
            state.loading = true;
        });
        builder.addCase(createComponent.fulfilled, (state, action) =>{
            state.currentComponent = action.payload.component;
            state.loading = false;
        });
        builder.addCase(createComponent.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });

        //Update
        builder.addCase(updateComponent.pending, (state) =>{
            state.error = null;
            state.loading = true;
        });
        builder.addCase(updateComponent.fulfilled, (state, action) =>{
            state.currentComponent = action.payload.component;
            state.loading = false;
        });
        builder.addCase(updateComponent.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });

        //Delete
        builder.addCase(removeComponent.pending, (state) =>{
            state.error = null;
            state.loading = true;
        });
        builder.addCase(removeComponent.fulfilled, (state) =>{
            state.currentComponent = null;
            state.loading = false;
        });
        builder.addCase(removeComponent.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });
    }
});

export const {nextPage, previousPage} = componentSlice.actions;