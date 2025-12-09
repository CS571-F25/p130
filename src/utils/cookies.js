// src/utils/cookies.js

const USER_COOKIE_KEY = "uwDiningUser";

/**
 * Read the current username from the cookie, or null if none.
 */
export function getCurrentUserFromCookie() {
  if (typeof document === "undefined") return null;
  const entry = document.cookie
    .split("; ")
    .find((row) => row.startsWith(USER_COOKIE_KEY + "="));
  if (!entry) return null;
  const value = entry.split("=")[1];
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/**
 * Set the current user cookie (30 day lifetime).
 */
export function setCurrentUserCookie(username) {
  if (typeof document === "undefined") return;
  const encoded = encodeURIComponent(username);
  const maxAgeSeconds = 60 * 60 * 24 * 30; // 30 days
  document.cookie = `${USER_COOKIE_KEY}=${encoded}; path=/; max-age=${maxAgeSeconds}`;
}

/**
 * Clear the current user cookie.
 */
export function clearCurrentUserCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${USER_COOKIE_KEY}=; path=/; max-age=0`;
}
