import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import surveySlice from "../reducers/surveySlice";
import surveyDataSlice from "../reducers/surverDataSlice";
import localStorageMiddleware from "./loaclStorageMiddleware";

const rootReducer = combineReducers({
    survey:surveySlice,
    
})
const middleware = [...getDefaultMiddleware(), localStorageMiddleware];
const store = configureStore({
    reducer:rootReducer,
    middleware,
})

export default store