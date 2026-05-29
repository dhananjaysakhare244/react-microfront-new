import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Pricing from "./Pricing";

const renderPricing = () =>
  render(
    <MemoryRouter>
      <Pricing />
    </MemoryRouter>,
  );

describe("Pricing", () => {
  it("renders each plan", () => {
    renderPricing();

    expect(
      screen.getByRole("heading", { name: /pricing/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("Enterprise")).toBeInTheDocument();
  });

  it("links plan calls to action to signup", () => {
    renderPricing();

    expect(screen.getByRole("button", { name: /sign up for free/i }))
      .toHaveAttribute("href", "/auth/signup");
    expect(screen.getByRole("button", { name: /get started/i }))
      .toHaveAttribute("href", "/auth/signup");
    expect(screen.getByRole("button", { name: /contact us/i }))
      .toHaveAttribute("href", "/auth/signup");
  });
});
