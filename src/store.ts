import { configureStore } from "@reduxjs/toolkit";
import appReducers from "./reducers";

const appStore = configureStore({
    reducer: appReducers
});

export default appStore;