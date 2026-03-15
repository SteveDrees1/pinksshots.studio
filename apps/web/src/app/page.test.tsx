import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders main with site name and login CTA", () => {
    render(<HomePage />);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /pinkshots\.studio/i })).toBeInTheDocument();
    expect(screen.getByText(/Portfolio\. Futuristic\. Yours\./)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Login to manage/i })).toBeInTheDocument();
  });
});
