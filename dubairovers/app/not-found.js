import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
      <div className="text-center px-6">
        <div className="text-8xl font-black text-brand-gold mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>
          404
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Oops! Page Not Found 🏜️</h1>
        <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
          Looks like you got lost in the desert! Don't worry — our team will help you find your way back.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/" className="btn-gold px-6 py-3">🏠 Back to Home</Link>
          <Link href="/tours" className="btn-outline px-6 py-3">🗺️ Browse Tours</Link>
          <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white"
            style={{ background:'#25D366' }}>
            💬 WhatsApp Help
          </a>
        </div>
      </div>
    </div>
  );
}
