import { rest } from "msw";
import { fakeIssues } from "./fakeData";

const url = "https://api.github.com/repos/rails/rails/issues";

export const handler = [
    rest.get(url, (req, res, ctx) => {
        return res (
            ctx.status(200),
            ctx.json(fakeIssues)
        );
    }),
];

export { rest }