import axios from "axios";

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

export const getIssues = async (
    owner: string,
    repo: string
): Promise<IssuesResult> => {
    const url = `https://api.github.com/repos/${owner}/${repo}/issues`;

    try {
        const issuesResponse = await axios.get<Issue[]>(url);

        return {
            issues: issuesResponse.data
        };
        
    } catch (err) {
        throw err
    }
};

export const getIssue = async (
    owner: string,
    repo: string,
    issueNumber: number
): Promise<IssueResult> => {
    const url = `https://github.com/${owner}/${repo}/issues/${issueNumber}`;

    try {
        const issuesResponse = await axios.get(url);

        return {
            issue: issuesResponse.data
        };

    } catch (error) {
        throw error;
    }
};