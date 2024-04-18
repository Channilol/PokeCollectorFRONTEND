import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../reducers/user";

const mainReducer = combineReducers({
    user: userReducer
})

const store = configureStore({
    reducer: mainReducer
})

export default store