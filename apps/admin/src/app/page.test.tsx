import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AdminLoginPage from "./page";

describe("AdminLoginPage", () => {
  it("renders admin login heading", () => {
    render(<AdminLoginPage />);
    expect(screen.getByRole("heading", { name: /pinkshots\.studio — Admin Login/i })).toBeInTheDocument();
  });

  it("renders sign in message", () => {
    render(<AdminLoginPage />);
    expect(screen.getByText(/Sign in to manage your portfolio/i)).toBeInTheDocument();
  });

  it("renders within main element", () => {
    render(<AdminLoginPage />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
