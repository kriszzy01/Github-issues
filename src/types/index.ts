export interface User {
    login: string;
    avatar_url: string;
}

export interface Label {
    id: number;
    name: string;
    color: string;
}

export interface Issue {
    id: number;
    comments_url: string;
    number: number;
    state: "open" | "closed";
    title: string;
    body: string;
    user: User;
    labels: Label[];
    comments: number;
}

export interface IssuesResult {
    issues: Issue[]
}

export interface IssueResult {
    issue: Issue
}

export interface IssuesState {
    issueByNumber: Record<number, Issue>;
    currentPageIssues: number[];
    status: "idle" | "pending";
    error: string | null
}