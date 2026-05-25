import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ScrollToTop from "@/components/ScrollToTop";

describe("ScrollToTop", () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });
  });

  it("is hidden when at top of page (scrollY = 0)", () => {
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
    render(<ScrollToTop />);
    const button = screen.getByLabelText("Scroll to top");
    expect(button.className).toContain("opacity-0");
  });

  it("is visible when scrolled past 500px", () => {
    Object.defineProperty(window, "scrollY", { value: 600, writable: true });
    render(<ScrollToTop />);
    fireEvent.scroll(window);
    const button = screen.getByLabelText("Scroll to top");
    expect(button.className).toContain("opacity-100");
  });
});
