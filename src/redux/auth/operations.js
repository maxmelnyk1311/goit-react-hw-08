import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// axios.defaults.baseURL = "https://connections-api.herokuapp.com";
const setAuthHeader = (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const clearAuthHeader = () => {
    axios.defaults.headers.common['Authorization'] = "";
}

export const register = createAsyncThunk(
    "users/signup",
    async (userInfo, thunkAPI) => {
        try {
            const response = await axios.post("https://connections-api.herokuapp.com/users/signup", userInfo);
            setAuthHeader(response.data.token);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }

    }
);

export const logIn = createAsyncThunk(
    "users/login",
    async (userInfo, thunkAPI) => {
        try {
            const response = await axios.post("https://connections-api.herokuapp.com/users/login", userInfo);
            setAuthHeader(response.data.token);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }

    }
);

export const logOut = createAsyncThunk(
    "users/logout",
    async (_, thunkAPI) => {
        try {
            const response = await axios.post("https://connections-api.herokuapp.com/users/logout");
            clearAuthHeader();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }

    }
);

export const refreshUser = createAsyncThunk(
    "users/refresh",
    async (_, thunkAPI) => {
        try {
            const reduxState = thunkAPI.getState();
            const savedToken = reduxState.auth.token;
            setAuthHeader(savedToken);
            const response = await axios.get("https://connections-api.herokuapp.com/users/current");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }

    },
    {
        condition: (_, {getState}) => {
            const reduxState = getState();
            const savedToken = reduxState.auth.token;
            return savedToken !== null;
        }
    }
);