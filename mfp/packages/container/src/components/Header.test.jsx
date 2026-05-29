import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

const renderHeader = (props) =>
  render(
    <MemoryRouter>
      <Header {...props} />
    </MemoryRouter>,
  );

describe("Header", () => {
  it("links guests to sign in", () => {
    renderHeader({ isSignedIn: false });

    expect(screen.getByRole("link", { name: "App" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("button", { name: /login/i })).toHaveAttribute(
      "href",
      "/auth/signin",
    );
  });

  it("calls onSignOut when the signed-in user logs out", () => {
    const onSignOut = vi.fn();

    renderHeader({ isSignedIn: true, onSignOut });
    const logoutLink = screen.getByRole("button", { name: /logout/i });

    expect(logoutLink).toHaveAttribute("href", "/");
    userEvent.click(logoutLink);
    expect(onSignOut).toHaveBeenCalledTimes(1);
  });
});
