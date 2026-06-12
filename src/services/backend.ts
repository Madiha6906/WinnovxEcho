export const BACKEND_URL =
  (import.meta as ImportMeta & { env?: Record<string, string> }).env
    ?.VITE_BACKEND_URL ||
  'http://127.0.0.1:8000';
