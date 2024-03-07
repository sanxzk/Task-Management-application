import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import todoSlice from "./todo/todoSlice";

const store = configureStore({
    reducer: {
        auth:authSlice,
        todo:todoSlice
    },
});

export default store;
