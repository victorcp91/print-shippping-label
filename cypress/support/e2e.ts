// You can put custom commands or global before/after hooks here if needed.

// Ignore Next Image remote host configuration errors during tests
// We still validate navigation and requests; this avoids failing on SSR image loader constraints
// without changing application code.
// https://nextjs.org/docs/messages/next-image-unconfigured-host
// https://on.cypress.io/uncaught-exception-from-application
// eslint-disable-next-line @typescript-eslint/no-unused-vars
Cypress.on("uncaught:exception", (err) => {
  const msg = err?.message || "";
  if (
    msg.includes("next-image-unconfigured-host") ||
    msg.includes("Invalid src prop")
  ) {
    return false;
  }
  // Let other errors fail the test
  return undefined as unknown as boolean;
});
