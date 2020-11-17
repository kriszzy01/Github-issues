import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "../slices";

const renderWithRedux = (ui: React.ReactNode) => {
    const store = configureStore({
        reducer: rootReducer
    });

    return rtlRender(
        <Provider store={store}>{ui}</Provider>
    );
};

export * from "@testing-library/react";
export { renderWithRedux };