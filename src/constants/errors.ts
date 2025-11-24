export const ERROR_CODES = {
  invalid_credentials: "invalid_credentials",
  user_not_found: "user_not_found",
  email_already_exists: "email_already_exists",
};

export const ERROR_MESSAGES: Record<string, string> = {
  [ERROR_CODES.invalid_credentials]: "The provided credentials are invalid.",
  [ERROR_CODES.user_not_found]: "No user found with the given information.",
  [ERROR_CODES.email_already_exists]:
    "An account with this email already exists.",
};
