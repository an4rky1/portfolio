import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import ScrollProgress from "@/components/ScrollProgress";

describe("ScrollProgress", () => {
  beforeEach(() => {
    // Mock window scroll properties
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 2000,
      writable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      value: 800,
      writable: true,
    });
  });

  it("renders progress bar", () => {
    render(<ScrollProgress />);
    const progressBar = document.querySelector(".h-full");
    expect(progressBar).toBeTruthy();
  });

  it("has correct initial width (0%)", () => {
    render(<ScrollProgress />);
    const progressBar = document.querySelector(".h-full") as HTMLElement;
    expect(progressBar.style.width).toBe("0%");
  });
});
