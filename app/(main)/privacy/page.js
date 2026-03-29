export const metadata = {
  title: 'Privacy Policy | DubaiRovers',
  description: 'DubaiRovers privacy policy — how we collect, use and protect your personal data in compliance with UAE PDPL and GDPR.',
};

export default function PrivacyPage() {
  return (
    <div className="container-main py-16 max-w-4xl">
      <h1 className="text-4xl font-black text-brand-navy mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>
        🔒 Privacy Policy
      </h1>
      <p className="text-gray-500 mb-10">Last updated: January 1, 2025 · Effective: January 1, 2025</p>

      <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
        {[
          { title:'1. Who We Are', body:'DubaiRovers ("we", "us", "our") is a tour operator based in Dubai, UAE. We operate dubairovers.com and are committed to protecting your personal data in compliance with the UAE Personal Data Protection Law (PDPL) and the EU General Data Protection Regulation (GDPR).' },
          { title:'2. Data We Collect', body:'We collect: your name, email, phone number, travel dates, and preferences when you make a booking or enquiry; IP address and browser information for security; payment information (processed by secure third-party gateways); communications via WhatsApp, email or our contact form.' },
          { title:'3. How We Use Your Data', body:'We use your data to: process and confirm tour bookings; send booking confirmations and tour information; respond to enquiries and provide customer support; send marketing communications (with your consent); improve our website and services; comply with legal obligations.' },
          { title:'4. Legal Basis for Processing', body:'We process your data under: (a) contract performance — to fulfil your booking; (b) legitimate interests — to improve our services; (c) consent — for marketing communications. You may withdraw consent at any time.' },
          { title:'5. Data Sharing', body:'We do not sell your personal data. We may share data with: tour guides and transport providers (to fulfil your booking); payment processors; email service providers (EmailJS); analytics services (Google Analytics). All third parties are contractually obligated to protect your data.' },
          { title:'6. Data Retention', body:'We retain booking data for 7 years as required by UAE commercial law. Marketing data is retained until you unsubscribe. You may request deletion of your data at any time.' },
          { title:'7. Your Rights', body:'Under GDPR and UAE PDPL, you have the right to: access your data; correct inaccurate data; request deletion ("right to be forgotten"); object to processing; data portability; withdraw consent. Contact us at dbtis.com@gmail.com to exercise any right.' },
          { title:'8. Cookies', body:'We use essential cookies for website functionality, analytics cookies (Google Analytics) to understand usage, and preference cookies to remember your language settings. You can disable cookies in your browser settings.' },
          { title:'9. Security', body:'We implement SSL encryption, secure servers, and access controls to protect your data. Despite these measures, no internet transmission is 100% secure.' },
          { title:'10. Contact Us', body:'For privacy concerns: Email: dbtis.com@gmail.com | WhatsApp: +971544735060 | Dubai, UAE' },
        ].map(s => (
          <div key={s.title}>
            <h2 className="text-xl font-bold text-brand-navy mb-3" style={{ fontFamily:"'Playfair Display',serif" }}>{s.title}</h2>
            <p className="leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
