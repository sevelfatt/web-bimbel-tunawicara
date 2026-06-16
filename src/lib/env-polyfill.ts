// Polyfill process.env for client-side environments (Turbopack leaves it undefined)
if (typeof window !== 'undefined') {
  window.process = window.process || {};
  window.process.env = window.process.env || {};
}
