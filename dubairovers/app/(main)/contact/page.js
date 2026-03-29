// Server component — metadata works here, no 'use client'
import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact DubaiRovers | WhatsApp, Email & Phone',
  description: 'Contact DubaiRovers for tour bookings, enquiries and support. Reach us via WhatsApp +971544735060, email, or our online contact form.',
};

export default function ContactPage() {
  return <ContactClient />;
}
