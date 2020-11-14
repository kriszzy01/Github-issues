import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getIssues, Issue, IssuesResult } from "../api";
import { AppThunk } from ".";

export interface IssuesState {
    issueByNumber: Record<number, Issue>;
    currentPageIssues: number[];
    status: "idle" | "pending";
    error: string | null
}

export const IssuesInitialState: IssuesState = {
    issueByNumber: {},
    currentPageIssues: [],
    status: "idle",
    error: null
};

const issues = createSlice({
    name: "issues",
    initialState: IssuesInitialState,
    reducers: {
        fetchIssuesPending: (state) => {
            state.status = "pending";
        },

        fetchIssuesSuccess: (state, { payload }: PayloadAction<IssuesResult>) => {
            const { issues } = payload;

            issues.forEach(issue => {
                state.issueByNumber[issue.number] = issue; //Object key is issue number, and the value is the issue
            });

            state.currentPageIssues = issues.map(issue => issue.number);

            state.status = "idle";

            state.error = null;
        },

        fetchIssuesRejected: (state, action: PayloadAction<string>) => {
            state.status = "idle";

            state.error = action.payload;
        }
    }
});

export const { 
    fetchIssuesPending,
    fetchIssuesSuccess, 
    fetchIssuesRejected
} = issues.actions; //Actions

export default issues.reducer; //Issues Reducer

/****************************************** REDUX THUNKS *******************************************/

export const fetchIssues = (
    owner: string,
    repo: string
): AppThunk => async dispatch => {
    try {
        dispatch(fetchIssuesPending());

        const issues = await getIssues(owner, repo);

        dispatch(fetchIssuesSuccess(issues));

    } catch (error) {
        dispatch(fetchIssuesRejected(error.message));
    }
};