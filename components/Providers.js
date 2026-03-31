'use client';
import { LanguageProvider } from '../context/LanguageContext';
import { CurrencyProvider } from '../context/CurrencyContext';
import { DataProvider } from '../context/DataContext';

export default function Providers({ children }) {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <DataProvider>
          {children}
        </DataProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
}
