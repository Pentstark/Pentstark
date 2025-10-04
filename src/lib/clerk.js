// Clerk configuration following official React + Vite integration
// Environment variable MUST be prefixed with VITE_ for Vite to expose it to client-side
// Reference: https://clerk.com/docs/quickstarts/react

export const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key. Add VITE_CLERK_PUBLISHABLE_KEY to your .env.local file.");
}
