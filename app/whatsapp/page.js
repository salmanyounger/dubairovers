"use client";
import { useState } from "react";
import Link from "next/link";
import { getAllTours } from "../data/tours";

export default function WhatsApp() {
  const [msg, setMsg] = useState("");
  const tours = getAllTours();
  const link = m => `https://wa.me/971544735060?text=${encodeURIComponent(m)}`;
  const quick = ["Hi! I want to book a desert safari.","What packages do you have for families?","What is your best deal this weekend?","Do you have availability tomorrow?","Can I get a group discount for 8 people?"];
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><span className="text-2xl">🏜️</span><span className="font-black text-xl bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">DubaiRovers</span></Link>
          <Link href="/" className="text-gray-400 hover:text-white text-sm">← Home</Link>
        </div>
      </nav>
      <div className="max-w-2xl mx-auto px-4 pt-28 pb-16">
        <div className="text-center mb-10">
          <div className="text-6xl mb-3">💬</div>
          <h1 className="text-4xl font-black mb-2">WhatsApp <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Support</span></h1>
          <p className="text-gray-400">Replies within 15 minutes · 7 days a week</p>
        </div>
        <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-500 text-white font-black text-xl py-5 rounded-2xl hover:scale-[1.02] transition-all mb-8 shadow-xl shadow-green-900/30">
          💬 Open WhatsApp · +971 544 735 060
        </a>
        <div className="mb-8">
          <h2 className="text-xl font-black mb-4">Quick Messages</h2>
          <div className="grid grid-cols-1 gap-2">
            {quick.map(q => (
              <a key={q} href={link(q)} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-300 text-sm hover:border-green-500/30 hover:text-white transition-all">
                <span className="text-green-400">💬</span>{q}
              </a>
            ))}
          </div>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-3xl p-6">
          <h2 className="text-xl font-black mb-4">Custom Message</h2>
          <select onChange={e => { const t = tours.find(t => t.id === e.target.value); if (t) setMsg(`Hi! I am interested in ${t.title}. Can you share pricing and availability?`); }}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400 mb-3">
            <option value="">-- Pick a tour (optional) --</option>
            {tours.map(t => <option key={t.id} value={t.id}>{t.emoji} {t.title}</option>)}
          </select>
          <textarea rows={3} value={msg} onChange={e => setMsg(e.target.value)} placeholder="Type your message..."
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-green-400 resize-none placeholder-gray-600 mb-3" />
          <a href={link(msg || "Hi! I want to book a tour with Dubai Rovers.")} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-black py-3.5 rounded-2xl transition-colors">
            💬 Send on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
