import axios from "axios";
import {
    IssuesResult,
    IssueResult,
    Issue
} from "../types";

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