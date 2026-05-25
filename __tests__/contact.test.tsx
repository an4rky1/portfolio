import { describe, it, expect } from "vitest";
import { validateContactForm, hasErrors } from "@/lib/contact";

describe("validateContactForm", () => {
  it("returns errors for empty fields", () => {
    const errors = validateContactForm({ name: "", email: "", message: "" });
    expect(hasErrors(errors)).toBe(true);
    expect(errors.name).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.message).toBeTruthy();
  });

  it("returns no errors for valid data", () => {
    const errors = validateContactForm({
      name: "Test User",
      email: "test@example.com",
      message: "Hello, this is a test message!",
    });
    expect(hasErrors(errors)).toBe(false);
  });

  it("validates email format", () => {
    const errors = validateContactForm({
      name: "Test",
      email: "invalid-email",
      message: "Hello, this is a test message!",
    });
    expect(errors.email).toBeTruthy();
  });

  it("requires name to be at least 2 characters", () => {
    const errors = validateContactForm({
      name: "A",
      email: "test@example.com",
      message: "Hello, this is a test message!",
    });
    expect(errors.name).toBeTruthy();
  });

  it("requires message to be at least 10 characters", () => {
    const errors = validateContactForm({
      name: "Test",
      email: "test@example.com",
      message: "Short",
    });
    expect(errors.message).toBeTruthy();
  });
});
