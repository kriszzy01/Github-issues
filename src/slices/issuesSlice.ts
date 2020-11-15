import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getIssues, getIssue, Issue, IssuesResult, IssueResult } from "../api";
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

const fetchPending = (state: IssuesState) => {
    state.status = "pending";
}

const fetchRejected = (state: IssuesState, { payload }: PayloadAction<string>) => {
    state.status = "idle";

    state.error = payload;
}

const issues = createSlice({
    name: "issues",
    initialState: IssuesInitialState,
    reducers: {
        fetchIssuePending: fetchPending,

        fetchIssueSuccess: (state, { payload }: PayloadAction<IssueResult>) => {
            const { issue } = payload

            state.issueByNumber[issue.number] = issue;

            state.status = "idle";

            state.error = null;
        },

        fetchIssueRejected: fetchRejected,

        fetchIssuesPending: fetchPending,

        fetchIssuesSuccess: (state, { payload }: PayloadAction<IssuesResult>) => {
            const { issues } = payload;

            issues.forEach(issue => {
                state.issueByNumber[issue.number] = issue; //Object key is issue number, and the value is the issue
            });

            state.currentPageIssues = issues.map(issue => issue.number);

            state.status = "idle";

            state.error = null;
        },

        fetchIssuesRejected: fetchRejected
    }
});

export const {
    fetchIssuesPending,
    fetchIssuesSuccess,
    fetchIssuesRejected,
    fetchIssuePending,
    fetchIssueSuccess,
    fetchIssueRejected
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

export const fetchIssue = (
    owner: string,
    repo: string,
    issueNumber: number
): AppThunk => async dispatch => {
    try {
        dispatch(fetchIssuePending());

        const issueResponse = await getIssue(owner, repo, issueNumber);

        dispatch(fetchIssueSuccess(issueResponse))

    } catch (error) {
        dispatch(fetchIssueRejected(error.message))
    }
};