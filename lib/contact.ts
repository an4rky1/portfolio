export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 5000;

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name || !data.name.trim()) {
    errors.name = "NAME: field is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "NAME: must be at least 2 characters";
  } else if (data.name.length > MAX_NAME_LENGTH) {
    errors.name = `NAME: must not exceed ${MAX_NAME_LENGTH} characters`;
  }

  if (!data.email || !data.email.trim()) {
    errors.email = "EMAIL: field is required";
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = "EMAIL: invalid format";
  }

  if (!data.message || !data.message.trim()) {
    errors.message = "MESSAGE: field is required";
  } else if (data.message.trim().length < 10) {
    errors.message = "MESSAGE: must be at least 10 characters";
  } else if (data.message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `MESSAGE: must not exceed ${MAX_MESSAGE_LENGTH} characters`;
  }

  return errors;
}

export function hasErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
