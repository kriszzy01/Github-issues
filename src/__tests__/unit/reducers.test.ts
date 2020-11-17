import { PayloadAction } from "@reduxjs/toolkit";
import { IssuesState, Issue } from "../../types";
import { fakeIssue } from "../../tests/fakeData";

import reducer, {
    issuesInitialState,
    fetchIssuePending,
    fetchIssueSuccess,
    fetchIssueRejected,
    fetchIssuesPending,
    fetchIssuesSuccess,
    fetchIssuesRejected
} from "../../slices/issuesSlice";

const mockPayload = fakeIssue() as Issue;

describe("Issues Reducer", () => {
    test("should render initial state on initialization", () => {
        const expectedState = issuesInitialState;
        const action = {} as PayloadAction;

        const result = reducer(undefined, action);

        expect(result).toEqual(expectedState);
    });

    test("should change state status to pending", () => {
        const expectedState: IssuesState = {
            ...issuesInitialState,
            status: "pending"
        };

        const issuesResult = reducer(issuesInitialState, fetchIssuesPending()); //Test Issues Pending Action
        const issueResult = reducer(issuesInitialState, fetchIssuePending());  //Test Issue Pending Action

        expect(issueResult).toEqual(expectedState);
        expect(issuesResult).toEqual(expectedState);
    });

    test("should update state new data if issues fetch was a success", () => {
        const expectedState: IssuesState = {
            issueByNumber: {[mockPayload.number]: mockPayload},
            currentPageIssues: [mockPayload.number],
            status: "idle",
            error: null
        };

        const payload = {issues: [mockPayload]};

        const result = reducer(issuesInitialState, fetchIssuesSuccess(payload));

        expect(result).toEqual(expectedState);
    });

    test("should update state new data if issue fetch was a success", () => {
        const expectedState: IssuesState = {
            issueByNumber: {[mockPayload.number]: mockPayload},
            currentPageIssues: [],
            status: "idle",
            error: null
        };

        const payload = {issue: mockPayload};

        const result = reducer(issuesInitialState, fetchIssueSuccess(payload));

        expect(result).toEqual(expectedState);
    });

    test("should update state with error message if fetch failed", () => {
        const expectedState: IssuesState = {
            ...issuesInitialState,
            error: "Network Error"
        };

        const issueResult = reducer(issuesInitialState, fetchIssueRejected("Network Error")); //Test issue Rejected Action
        const issuesResult = reducer(issuesInitialState, fetchIssuesRejected("Network Error")); //Test issues Rejected Action

        expect(issueResult).toEqual(expectedState);
        expect(issuesResult).toEqual(expectedState);
    });
});