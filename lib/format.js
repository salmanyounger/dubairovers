// lib/format.js — consistent number formatting for server & client
// Uses 'en-US' locale explicitly so SSR and browser produce identical output

export function fmtNum(n) {
  if (n == null || isNaN(n)) return '0';
  return Number(n).toLocaleString('en-US');
}

export function fmtAED(n) {
  if (n == null || isNaN(n)) return 'AED 0';
  return `AED ${Number(n).toLocaleString('en-US')}`;
}
