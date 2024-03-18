import axios from "../../axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async(params) =>{
    const {data} = await axios.post("auth/login", params).catch(function (error) {
        console.log(error.toJSON());
      });
    return data;
})

export const fetchRegister = createAsyncThunk("auth/fetchRegister", async(params) =>{
    const {data} = await axios.post("auth/register", params).catch(function (error) {
        console.log(error.toJSON());
      });
    return data;
})

export const fetchEmailVerify = createAsyncThunk("auth/fetchEmailVerify", async(emailToken) =>{
    const {data} = await axios.get("auth/emailVerify",{
        params: {
            emailToken
        }}).catch(function (error) {
        console.log(error.toJSON());
      });
    return data;
})

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async() =>{
    const {data} = await axios.get("auth/me").catch(function (error) {
        console.log(error.toJSON());
      });
    return data;
})

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) =>{
            state.user = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuth.pending, (state) =>{
            state.user = null;
            state.error = null;
            state.loading = true;
        });
        builder.addCase(fetchAuth.fulfilled, (state, action) =>{
            state.user = action.payload;
            state.loading = false;
            window.localStorage.setItem("token", action.payload.token)
        });
        builder.addCase(fetchAuth.rejected, (state, action) =>{
            state.error = action.payload;
            state.user = null;
            state.loading = false;
        });

        builder.addCase(fetchAuthMe.pending, (state) =>{
            state.user = null;
            state.error = null;
            state.loading = true;
        });
        builder.addCase(fetchAuthMe.fulfilled, (state, action) =>{
            state.user = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchAuthMe.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        });

        builder.addCase(fetchRegister.pending, (state) =>{
            state.user = null;
            state.error = null;
            state.loading = true;
        });
        builder.addCase(fetchRegister.fulfilled, (state, action) =>{
            state.user = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchRegister.rejected, (state, action) =>{
            state.error = action.payload;
            state.user = null;
            state.loading = false;
        });

        builder.addCase(fetchEmailVerify.pending, (state) =>{
            state.user = null;
            state.error = null;
            state.loading = true;
        });
        builder.addCase(fetchEmailVerify.fulfilled, (state, action) =>{
            state.user = action.payload;
            state.loading = false;
            window.localStorage.setItem("token", action.payload.token)
        });
        builder.addCase(fetchEmailVerify.rejected, (state, action) =>{
            state.error = action.payload;
            state.user = null;
            state.loading = false;
        });
    }
})

export const selectIsAuth = state => Boolean(state.auth.user?.Nickname);
export const selectIsAuthError = state => Boolean(state.auth.error);

export const authReducer = authSlice.reducer;

export const {logout} = authSlice.actions;