import { describe, expect, test, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as hooks from "next-auth/react";
import customHooks from "@/hooks";
import { Navbar } from "./Nav";

describe("Navbar tests", () => {
  test("should render navbar unauthenticated", () => {
    jest
      .spyOn(hooks, "useSession")
      .mockImplementation(() => ({
        data: { user: { image: "" } },
        status: "unauthenticated",
      }));
    const { getByTestId, queryByTestId, queryByText } = render(<Navbar />);
    const profilePictureElem = queryByTestId("profile-shimmer");
    expect(profilePictureElem).not.toBeInTheDocument();
    const loginBtn = getByTestId("login-btn");
    expect(loginBtn).toBeInTheDocument();
    const yourWork = queryByText("Your Work");
    expect(yourWork).not.toBeInTheDocument();
  });

  test("should render navbar authenticated", () => {
    jest
      .spyOn(hooks, "useSession")
      .mockImplementation(() => ({
        data: { user: { image: "" } },
        status: "authenticated",
      }));
    const { getByTestId, getByText, queryByTestId } = render(<Navbar />);
    const profilePictureElem = getByTestId("profile-shimmer");
    expect(profilePictureElem).toBeInTheDocument();
    const loginBtn = queryByTestId("login-btn");
    expect(loginBtn).not.toBeInTheDocument();
    const yourWork = getByText("Your Work");
    expect(yourWork).toBeInTheDocument();
  });

  test("Navbar in mobile view", () => {
    jest
      .spyOn(hooks, "useSession")
      .mockImplementation(() => ({
        data: { user: { image: "" } },
        status: "unauthenticated",
      }));
    jest
      .spyOn(customHooks, "useWindowDimensions")
      .mockImplementation(() => ({
        windowDimensions: { height: 300, width: 300 },
        isDesktop: false,
      }));
    const { getByTestId } = render(<Navbar />);
    const hamburgerIcn = getByTestId("hamburger-icon");
    expect(hamburgerIcn).toBeInTheDocument();
  });
});
