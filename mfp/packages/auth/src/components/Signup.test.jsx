import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Signup from "./Signup";

const renderSignup = (onSignIn = vi.fn()) => {
  render(
    <MemoryRouter>
      <Signup onSignIn={onSignIn} />
    </MemoryRouter>,
  );

  return { onSignIn };
};

describe("Signup", () => {
  it("renders the account creation form", () => {
    renderSignup();

    expect(
      screen.getByRole("heading", { name: /sign up/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /already have an account/i }),
    ).toHaveAttribute("href", "/auth/signin");
  });

  it("calls onSignIn after signup", () => {
    const { onSignIn } = renderSignup();

    userEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(onSignIn).toHaveBeenCalledTimes(1);
  });
});
