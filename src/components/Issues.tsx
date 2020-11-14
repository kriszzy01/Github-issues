import React from "react";
import { UserWithAvatar } from "./UserWithAvatar";
import { getIssues } from "../selectors";
import { useSelector } from "react-redux";

export const Issues: React.FC = () => {
    const {
        issueByNumber,
        currentPageIssues,
        status,
        error: fetchError
    } = useSelector(getIssues);

    const issues = currentPageIssues.map(issueNumber => issueByNumber[issueNumber]);

    const listItem = issues.map(issue => {
        const { user, number, title, comments, body, id } = issue;

        return (
            <li key={id}>
                <UserWithAvatar user={user} />
                <div>
                    <h2><span>{`#${number}`}</span>{title}</h2>
                    <p>{comments} {comments > 1 ? "comments" : "comment"}</p>
                    <p>{body}</p>
                </div>
            </li>
        );
    });

    const renderedLists = (
        <>
            {status === "pending" ?
                <h3>Loading...</h3> :
                <ul>{listItem}</ul>
            }
        </>
    )

    return (
        <>
            {fetchError ?
                <h1>Something went wrong</h1> :
                renderedLists
            }
        </>
    );
};
