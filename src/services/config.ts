// Centralized API base URL
// Override via Vite env: VITE_API_BASE_URL
const rawBase = (import.meta as any).env?.VITE_API_BASE_URL ?? 'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/';

// Normalize to remove trailing slashes to avoid double slashes when joining paths
export const API_BASE_URL: string = String(rawBase).replace(/\/+$/, '');

// Separate base URL for auth endpoints (login/signup/me). Falls back to API_BASE_URL,
// and finally to the previously working auth group if not provided.
const rawAuthBase = (import.meta as any).env?.VITE_AUTH_BASE_URL ?? API_BASE_URL ?? 'https://x8ki-letl-twmt.n7.xano.io/api:uvT-ex56';
export const AUTH_BASE_URL: string = String(rawAuthBase).replace(/\/+$/, '');


