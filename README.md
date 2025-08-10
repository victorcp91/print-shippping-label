# 📦 USPS Shipping Label Generator – EasyPost API Prototype

This project is a **functional prototype** developed as part of a technical test for a Frontend Software Engineer position.  
The goal is to build a simple web application using **Next.js 14+, React, and TypeScript** that allows the user to **generate and print USPS (United States Postal Service) shipping labels** through the **EasyPost API**.

## 🚀 Application Flow

1. **Shipment Form** – Enter sender and recipient information (**US addresses only**) and package details (weight in ounces, dimensions in inches).
2. **Rate Selection** – Fetch and display available USPS shipping rates, allowing the user to choose one.
3. **Label Preview & Print** – Show the generated shipping label with options to print or download.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Tests

Use Jest with Testing Library (jsdom environment):

```bash
# Run all tests once
npm test

# Watch mode
npm run test:watch

# Coverage report (text + HTML in coverage/)
npm run test:coverage
```

## Running E2E Tests (Cypress)

These commands start a local mock EasyPost server (`scripts/mock-easypost.js`) on port `4010`, boot the Next.js app on port `3002`, and then run Cypress against `http://localhost:3002`.

```bash
# Open Cypress Test Runner (interactive)
npm run e2e

# Run headless (CI-friendly)
npm run e2e:headless
```

Notes:

- The mock server emulates the minimum EasyPost endpoints needed by the app.

## Production Mode

1. Configure environment variables (see Environment Variables below).
2. Build the app:

```bash
npm run build
```

3. Start the production server:

```bash
npm start
```

The app will run with Next.js’ production server. In development mode, some caching behaviors are disabled; use a production build to validate caching.

## Technical Choices: Label Page Caching Strategy

To avoid fetching the EasyPost shipment repeatedly after a label is generated, the label page uses Next.js caching primitives:

- **Incremental Static Regeneration (ISR)**: The page at `src/app/label/[id]/page.tsx` exports `revalidate = 5 * 24 * 60 * 60` (5 days). The `fetch` call uses `next: { revalidate, tags: ["shipment-<id>"] }` to cache per shipment and attach a tag.
- **Tag-based invalidation on purchase**: When a label is bought via `src/app/api/shipping/buy/route.ts`, the server calls `revalidateTag("shipment-<id>")` and `revalidatePath("/label/<id>")` so the cached page is refreshed immediately with the new label URL.
- **Server-to-server EasyPost calls are uncached**: API routes (`src/app/api/shipping/shipment/[id]/route.ts` and the buy route) use `cache: "no-store"` for upstream requests to EasyPost. Caching is handled at the page layer, not at the external API layer.
- **Buy once and refresh UX**: The client component `src/app/label/[id]/BuyOnceAndRefresh.tsx` posts once to `/api/shipping/buy` with the selected `rateId`, then replaces the URL (removing query params) and lets the freshly revalidated page display the cached label.

This approach:

- **Reduces repeated EasyPost requests** once a label is available.
- **Keeps the label page snappy** with cached HTML/data.

## Environment Variables

Set these before building/starting the app (e.g., in `.env`):

- `EASYPOST_API_URL`: Base URL for EasyPost API (e.g., `https://api.easypost.com/v2`).
- `EASYPOST_API_KEY`: Your EasyPost API key.

## What I’d do next

- Address validation with API feedback

  - Map EasyPost/USPS validation errors to field-level errors via `setError` (e.g., invalid ZIP, mismatched city/state).

- Idempotent label purchase

  - Send an idempotency key on “buy” to prevent double charges on retries.
  - Add client-side retry with exponential backoff and a cancel option.

- Data persistence and drafts

  - Persist form progress in localStorage/sessionStorage with clear/reset controls.
  - Restore after refresh or back navigation.

- Observability and error handling

  - Add monitoring (Sentry) for client/server errors; log API latency and failure rates.

- Security and robustness

  - Rate-limit API routes; validate/normalize input on the server.

- Developer experience and CI/CD
  - Pre-commit hooks (lint, test, commitlint for Conventional Commits).
  - CI pipeline running lint, unit, a11y, and e2e headless on PRs.
