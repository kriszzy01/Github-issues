import { combineReducers } from "redux";
import { Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import issuesReducer from "./issuesSlice";

const rootReducer = combineReducers({
    issues: issuesReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;