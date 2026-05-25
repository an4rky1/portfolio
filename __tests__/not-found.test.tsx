import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import NotFound from "@/app/not-found";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("404 Page", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  function advanceAllTimers() {
    act(() => {
      vi.advanceTimersByTime(100);
    });
  }

  it("renders 404 text", () => {
    render(<NotFound />);
    expect(screen.getByText(/4 0 4/)).toBeTruthy();
  });

  it("renders NOT_FOUND text", () => {
    render(<NotFound />);
    expect(screen.getByText(/N O T _ F O U N D/)).toBeTruthy();
  });

  it("has a link to home page", () => {
    render(<NotFound />);
    for (let i = 0; i < 500; i++) {
      act(() => { vi.advanceTimersByTime(10); });
    }
    const homeLink = screen.getByText(/go_home/i);
    expect(homeLink).toBeTruthy();
    expect(homeLink.closest("a")?.getAttribute("href")).toBe("/");
  });
});
