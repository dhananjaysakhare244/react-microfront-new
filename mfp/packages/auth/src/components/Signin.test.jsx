import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Signin from "./Signin";

const renderSignin = (onSignIn = vi.fn()) => {
  render(
    <MemoryRouter>
      <Signin onSignIn={onSignIn} />
    </MemoryRouter>,
  );

  return { onSignIn };
};

describe("Signin", () => {
  it("renders the expected fields and signup link", () => {
    renderSignin();

    expect(
      screen.getByRole("heading", { name: /sign in with account/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /don't have an account/i }),
    ).toHaveAttribute("href", "/auth/signup");
  });

  it("calls onSignIn when the form is submitted", () => {
    const { onSignIn } = renderSignin();

    userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(onSignIn).toHaveBeenCalledTimes(1);
  });
});
