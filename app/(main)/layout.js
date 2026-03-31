'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import { LanguageProvider } from '../../context/LanguageContext';
import { CurrencyProvider } from '../../context/CurrencyContext';
import { DataProvider } from '../../context/DataContext';

export default function MainLayout({ children }) {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <DataProvider>
          <Header />
          <main style={{ paddingTop: 'var(--header-h)', paddingBottom: '60px' }} className="md:pb-0">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </DataProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
}
