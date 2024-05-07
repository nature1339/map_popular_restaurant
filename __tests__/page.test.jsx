import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LoginPage from "../src/pages/users/login";

describe("Page", () => {
  it("renders a heading", () => {
    render(<LoginPage />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
