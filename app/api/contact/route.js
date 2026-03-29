import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, email, phone, subject, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required' }, { status: 400 });
    }

    // Try Nodemailer if SMTP configured
    if (process.env.SMTP_HOST && !process.env.SMTP_HOST.startsWith('your-')) {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({
        from:    `"DubaiRovers Website" <${process.env.SMTP_USER}>`,
        to:      'dbtis.com@gmail.com',
        subject: `[Contact] ${subject} — ${name}`,
        html: `
          <h2>New Contact Form Submission — DubaiRovers</h2>
          <table>
            <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
            <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
            <tr><td><strong>Phone:</strong></td><td>${phone || 'N/A'}</td></tr>
            <tr><td><strong>Subject:</strong></td><td>${subject}</td></tr>
          </table>
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });
    }

    // Log to console for development
    console.log('Contact form submission:', { name, email, phone, subject, message });

    return NextResponse.json({ success: true, message: 'Message received. We will reply within 2 hours.' });

  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send message', message: err.message }, { status: 500 });
  }
}
