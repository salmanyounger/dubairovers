'use client';
import { createContext, useContext, useState, useEffect } from 'react';

export const CURRENCIES = [
  { code:'AED', symbol:'AED', rate:1,      flag:'🇦🇪', label:'UAE Dirham' },
  { code:'USD', symbol:'$',   rate:0.272,  flag:'🇺🇸', label:'US Dollar' },
  { code:'EUR', symbol:'€',   rate:0.252,  flag:'🇪🇺', label:'Euro' },
  { code:'GBP', symbol:'£',   rate:0.215,  flag:'🇬🇧', label:'British Pound' },
  { code:'SAR', symbol:'SAR', rate:1.02,   flag:'🇸🇦', label:'Saudi Riyal' },
  { code:'RUB', symbol:'₽',   rate:25.1,   flag:'🇷🇺', label:'Russian Ruble' },
  { code:'CNY', symbol:'¥',   rate:1.97,   flag:'🇨🇳', label:'Chinese Yuan' },
  { code:'INR', symbol:'₹',   rate:22.6,   flag:'🇮🇳', label:'Indian Rupee' },
  { code:'PKR', symbol:'Rs',  rate:75.8,   flag:'🇵🇰', label:'Pakistani Rupee' },
];

const CurrencyContext = createContext({
  currency: CURRENCIES[0],
  setCurrency: () => {},
  convert: (aed) => `AED ${aed}`,
  currencies: CURRENCIES,
});

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState(CURRENCIES[0]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dr_currency');
      if (saved) {
        const found = CURRENCIES.find(c => c.code === saved);
        if (found) setCurrencyState(found);
      }
    } catch {}
  }, []);

  const setCurrency = (code) => {
    const found = CURRENCIES.find(c => c.code === code);
    if (!found) return;
    setCurrencyState(found);
    try { localStorage.setItem('dr_currency', code); } catch {}
  };

  const convert = (aedAmount) => {
    if (!aedAmount) return `${currency.symbol}0`;
    const converted = Math.round(aedAmount * currency.rate);
    if (currency.code === 'AED') return `AED ${aedAmount.toLocaleString()}`;
    return `${currency.symbol}${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert, currencies: CURRENCIES }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
