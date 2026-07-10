import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import AppProviders from "./lib/providers";
import "./app.css";

// Initialize i18n (side-effect import ensures HttpBackend + react-i18next init)
import "./lib/i18n";

// Self-hosted fonts via fontsource
import "@fontsource-variable/public-sans/wght.css";
import "@fontsource/tajawal";

/**
 * Layout component - uses default Arabic RTL for SSR/client hydration consistency.
 * Direction changes are handled by DirectionProvider after mount.
 */
export function Layout({ children }: { children: React.ReactNode }) {
  // Always render with Arabic RTL for SSR/client hydration consistency
  // Direction changes happen client-side via DirectionProvider
  return (
    <html lang="ar-SA" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre style={{ width: "100%", overflowX: "auto" }}>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
