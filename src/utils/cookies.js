// src/utils/cookies.js

export function setCookie(name, value, days = 30) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )};${expires};path=/`;
}

export function getCookie(name) {
  const nameEQ = name + "=";
  const parts = document.cookie.split(";");
  for (let c of parts) {
    c = c.trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  return null;
}

export function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=-99999999; path=/";
}
