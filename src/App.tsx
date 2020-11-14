import React, { useEffect } from "react";
import { fetchIssues } from "./slices/issuesSlice";
import { useDispatch } from "react-redux";
import { Issues } from "./components/Issues";

const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIssues("rails", "rails"))
    }, [dispatch]);

    return (
        <>
            <Issues />
        </>
    );
};

export default App;