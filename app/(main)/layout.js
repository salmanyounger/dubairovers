'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import Providers from '../../components/Providers';

export default function MainLayout({ children }) {
  return (
    <Providers>
      <Header />
      <main style={{ paddingTop: 'var(--header-h)', paddingBottom: '60px' }} className="md:pb-0">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </Providers>
  );
}
