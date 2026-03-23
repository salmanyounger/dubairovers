"use client";

// Simple wrapper - works without next-auth installed
// When you're ready for Google login: run  npm install next-auth
// Then replace this file with the full version
export function AuthProvider({ children }) {
  return <>{children}</>;
}
