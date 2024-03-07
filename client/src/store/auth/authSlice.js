import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const authToken = localStorage.getItem("authToken");
const user = localStorage.getItem("user");

const initialState = {
  isLoggedIn: authToken === null ? false : true,
  isLoading: false,
  user: JSON.parse(user),
  authToken: authToken ? authToken : null,
  isError: false,
  errorMessage: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      console.log(userData);
      const response = await authService.login(userData);
      if (response.success) return response;
      else {
        throw new Error(response.error.error);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.signup(userData);
      if (response.success) return response;
      else {
        throw new Error(response.error.error);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getuser",
  async (authToken, thunkAPI) => {
    try {
      const response = await authService.getUser(authToken);
      // console.log(response);
      if (response.success) return response;
      else {
        throw new Error(response.message);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.user = null;
      state.authToken = null;
      localStorage.removeItem("authToken");
    },
    setErrorNull: (state) => {
      state.isError = false;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.isLoggedIn = true;
          state.authToken = action.payload.authToken;
          state.user = action.payload.user;
          localStorage.setItem("authToken", state.authToken);

          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.authToken = null;
        state.user = null;
        state.isError = true;
        state.errorMessage = "Please enter correct credentials";
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.isLoggedIn = true;
          state.authToken = action.payload.authToken;
          state.user = action.payload.user;
          localStorage.setItem("authToken", state.authToken);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.authToken = null;
        state.user = null;
        state.isError = true;
        state.errorMessage = "error" + JSON.stringify(action);
      })
      .addCase(getUser.pending, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.authToken = null;
        state.user = null;
        state.isError = true;
        state.errorMessage = action.payload;
        localStorage.removeItem("authToken");
      });
  },
});

export const { reset, logout, setErrorNull } = authSlice.actions;
export default authSlice.reducer;
