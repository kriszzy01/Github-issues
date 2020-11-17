import React from "react";
import "@testing-library/jest-dom/extend-expect";
import App from "../../App";
import { renderWithRedux, screen } from "../../tests/test-utils";
import { setupServer } from "msw/node";
import { handler, rest } from "../../tests/server-handler";
import { fakeIssues } from "../../tests/fakeData";

const server = setupServer(...handler);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

//beforeEach(() => renderWithRedux(<App />));   //for some reason this retains state for each test. I had to call the custom render for each test.

describe("App", () => {
    test("fetches and renders all issues", async () => {
        renderWithRedux(<App />);

        expect(screen.queryByText(/loading/i)).toBeInTheDocument();

        expect(await screen.findAllByRole("listitem")).toHaveLength(fakeIssues.length);

        expect(screen.queryByText(/loading/i)).toBeNull();
    });

    test("shows error message if fetch was unsuccessfull", async () => {
        renderWithRedux(<App />);

        server.use(
            rest.get("https://api.github.com/repos/rails/rails/issues", (req, res, ctx) => {
                return res(
                    ctx.status(500),
                    ctx.json({ message: "Error" })
                )
            })
        );

        expect(screen.queryByText(/loading/i)).toBeInTheDocument();

        expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
        
        expect(screen.queryByText(/loading/i)).toBeNull();
    });
});