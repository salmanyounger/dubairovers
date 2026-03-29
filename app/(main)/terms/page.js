export const metadata = {
  title: 'Terms & Conditions | DubaiRovers',
  description: 'DubaiRovers terms and conditions for tour bookings, cancellations, liability and service usage.',
};

export default function TermsPage() {
  return (
    <div className="container-main py-16 max-w-4xl">
      <h1 className="text-4xl font-black text-brand-navy mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>
        📋 Terms & Conditions
      </h1>
      <p className="text-gray-500 mb-10">Last updated: January 1, 2025</p>

      <div className="space-y-8 text-gray-700">
        {[
          { title:'1. Booking & Confirmation', body:'All bookings are confirmed once DubaiRovers sends a written confirmation via WhatsApp or email. A booking is only guaranteed upon receipt of confirmation. Prices are quoted in UAE Dirhams (AED) and include VAT at 5%.' },
          { title:'2. Cancellation Policy', body:'Free cancellation is available up to 24 hours before the tour start time for most tours. Overnight desert safaris and worldwide packages require 48–72 hours notice. No refund is provided for cancellations within 24 hours of the tour or no-shows. Cancellations must be submitted in writing via WhatsApp or email.' },
          { title:'3. Changes & Amendments', body:'We reserve the right to amend or cancel tours due to extreme weather, force majeure, or insufficient participants. In such cases, we offer a full refund or alternative tour date. We are not liable for costs arising from such changes (e.g. flights, hotel).' },
          { title:'4. Health & Safety', body:'Guests must disclose any medical conditions that may affect participation. DubaiRovers reserves the right to exclude guests from activities where safety may be compromised. All passengers must follow guide instructions at all times.' },
          { title:'5. Liability', body:'DubaiRovers is not liable for: personal injury during tours (except where caused by our negligence); loss or damage to personal belongings; delays due to traffic, weather or circumstances beyond our control; indirect or consequential losses.' },
          { title:'6. Pricing & Payments', body:'All prices are per person unless stated otherwise. Infant (0–2 years) fares are free on most tours. Group discounts apply for parties of 10 or more. Payment accepted in AED cash, bank transfer, or card.' },
          { title:'7. Photography', body:'DubaiRovers may photograph or film tours for marketing purposes. By booking, you consent to this unless you notify us in writing before the tour. Guest photographs may not be used commercially without written consent.' },
          { title:'8. Conduct', body:'Guests are expected to behave respectfully toward guides, other guests, and local customs. DubaiRovers reserves the right to remove guests from tours without refund for disruptive, dangerous, or illegal behaviour.' },
          { title:'9. Governing Law', body:'These terms are governed by the laws of the UAE. Any disputes will be subject to the jurisdiction of Dubai courts.' },
          { title:'10. Contact', body:'Questions about these terms: dbtis.com@gmail.com | +971544735060 | Dubai, UAE' },
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
