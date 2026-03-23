"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"

// ─── CONSTANTS ──────────────────────────────────────────────────────────────
const T = {
  bg:"#0d0804", sidebar:"#110c06", canvas:"#1a1008",
  card:"rgba(255,255,255,0.04)", cardBorder:"rgba(255,255,255,0.09)",
  text:"#fff", sub:"rgba(255,255,255,0.45)", accent:"#F59E0B",
}

// ─── BLOCK LIBRARY ──────────────────────────────────────────────────────────
const BLOCK_LIBRARY = [
  {
    category:"Layout",
    blocks:[
      { type:"hero-banner",  icon:"🖼️", label:"Hero Banner",    desc:"Full-screen image + heading + 2 CTA buttons" },
    ]
  },
  {
    category:"Content",
    blocks:[
      { type:"heading",   icon:"🔤", label:"Heading",   desc:"H1, H2, or H3 heading text" },
      { type:"paragraph", icon:"📝", label:"Paragraph",  desc:"Body text block" },
      { type:"button",    icon:"🔘", label:"Button/CTA", desc:"Call-to-action button" },
      { type:"divider",   icon:"➖", label:"Divider",    desc:"Horizontal separator line" },
    ]
  },
  {
    category:"Trust",
    blocks:[
      { type:"trust-bar",  icon:"✅", label:"Trust Bar",  desc:"Security + confirmation badges" },
      { type:"stats-row",  icon:"📊", label:"Stats Row",  desc:"Animated numbers counter" },
    ]
  },
  {
    category:"Promo",
    blocks:[
      { type:"offer-banner",  icon:"🎯", label:"Offer Banner",  desc:"Promotional banner with discount badge" },
      { type:"urgency-strip", icon:"⚠️", label:"Urgency Strip",  desc:"Limited spots / time pressure" },
    ]
  },
]

// ─── DEFAULT BLOCK DATA ──────────────────────────────────────────────────────
const defaultData = {
  "hero-banner":  { heading:"Your Headline Here", subheading:"Supporting text that describes your offer in one sentence", backgroundImage:"https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1600&q=80", overlayOpacity:0.5, textAlign:"center", button1:{text:"Book Now",link:"/booking"}, button2:{text:"Learn More",link:"#packages"} },
  "heading":      { text:"Section Heading", tag:"H2", fontSize:36, color:"#FFFFFF", alignment:"left" },
  "paragraph":    { content:"Click to edit this paragraph text. You can write about your tour details, what's included, or anything you want to share with your visitors.", fontSize:16, alignment:"left", color:"rgba(255,255,255,0.8)" },
  "button":       { text:"Book Now", link:"/booking", style:"primary", alignment:"center" },
  "divider":      { color:"rgba(255,255,255,0.1)", spacing:32 },
  "trust-bar":    { items:["🔒 Secure Booking","✅ Instant Confirmation","🔄 Free Cancellation 24h","⭐ 4.9/5 Rating","💬 24/7 WhatsApp"] },
  "stats-row":    { stats:[{value:"4.9",label:"Rating",icon:"⭐"},{value:"2,800+",label:"Happy Guests",icon:"👥"},{value:"6",label:"Tour Types",icon:"🏜️"},{value:"100%",label:"Verified Reviews",icon:"✅"}] },
  "offer-banner": { badge:"30% OFF", heading:"Special Offer — Book Today", subheading:"Limited time deal — grab your spot before it's gone!", cta:"Claim Offer on WhatsApp", ctaLink:"https://wa.me/971544735060", bg:"linear-gradient(135deg,#7c2d12,#c2410c)" },
  "urgency-strip":{ text:"⚠️ Only 4 spots remaining today", sub:"12 people are viewing this right now", color:"#EF4444" },
}

// ─── SEO SCORE CALCULATOR ───────────────────────────────────────────────────
function calcSeoScore(seo, blocks) {
  let score = 0
  if (seo.metaTitle && seo.metaTitle.length >= 30 && seo.metaTitle.length <= 65) score += 20
  else if (seo.metaTitle) score += 10
  if (seo.metaDescription && seo.metaDescription.length >= 120 && seo.metaDescription.length <= 165) score += 20
  else if (seo.metaDescription) score += 10
  const hasH1 = blocks.some(b => b.type === "heading" && b.data.tag === "H1") || blocks.some(b => b.type === "hero-banner")
  if (hasH1) score += 20
  if (seo.slug) score += 10
  const totalText = blocks.filter(b => b.type === "paragraph").reduce((acc,b) => acc + (b.data.content?.length||0), 0)
  if (totalText > 300) score += 15
  else if (totalText > 100) score += 8
  if (blocks.some(b => b.type === "hero-banner" && b.data.backgroundImage)) score += 15
  return Math.min(score, 100)
}

// ─── BLOCK PREVIEW RENDERER ─────────────────────────────────────────────────
function BlockPreview({ block, isSelected, onSelect, onDelete, onMoveUp, onMoveDown, onDuplicate, canMoveUp, canMoveDown, onContentEdit }) {
  const { type, data } = block
  const [hovered, setHovered] = useState(false)
  const [editing, setEditing] = useState(null)

  const handleTextEdit = (field, value) => {
    onContentEdit(block.id, { ...data, [field]: value })
  }

  const handleNestedEdit = (parent, field, value) => {
    onContentEdit(block.id, { ...data, [parent]: { ...data[parent], [field]: value } })
  }

  const EditableText = ({ value, field, style, tag="div", nested=null }) => {
    const Tag = tag
    return (
      <Tag
        contentEditable
        suppressContentEditableWarning
        onBlur={e => nested ? handleNestedEdit(nested, field, e.target.innerText) : handleTextEdit(field, e.target.innerText)}
        onFocus={() => setEditing(field)}
        style={{ ...style, outline: editing===field ? "2px dashed rgba(245,158,11,0.6)" : "none", borderRadius:3, minWidth:40, display:"inline-block", cursor:"text" }}
      >
        {value}
      </Tag>
    )
  }

  const renderBlock = () => {
    switch (type) {
      case "hero-banner": return (
        <div style={{ position:"relative", minHeight:280, background:`url(${data.backgroundImage}) center/cover no-repeat`, borderRadius:8 }}>
          <div style={{ position:"absolute", inset:0, background:`rgba(0,0,0,${data.overlayOpacity||0.5})`, borderRadius:8 }} />
          <div style={{ position:"relative", zIndex:1, padding:"48px 32px", textAlign:data.textAlign||"center" }}>
            <EditableText value={data.heading} field="heading"
              style={{ fontSize:32, fontWeight:800, color:"#fff", display:"block", marginBottom:12, fontFamily:"'Playfair Display',serif" }} />
            <EditableText value={data.subheading} field="subheading"
              style={{ fontSize:16, color:"rgba(255,255,255,0.8)", display:"block", marginBottom:24 }} />
            <div style={{ display:"flex", gap:10, justifyContent:data.textAlign||"center", flexWrap:"wrap" }}>
              <div style={{ padding:"12px 24px", background:"linear-gradient(135deg,#F59E0B,#D97706)", borderRadius:9, fontWeight:700, fontSize:14, color:"#000", cursor:"pointer" }}>
                {data.button1?.text}
              </div>
              <div style={{ padding:"12px 24px", background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.3)", borderRadius:9, fontWeight:600, fontSize:14, color:"#fff", cursor:"pointer" }}>
                {data.button2?.text}
              </div>
            </div>
          </div>
        </div>
      )

      case "heading": {
        const sizes = { H1:40, H2:32, H3:24 }
        return (
          <div style={{ padding:"8px 0" }}>
            <EditableText value={data.text} field="text"
              style={{ fontSize:sizes[data.tag]||32, fontWeight:800, color:data.color||"#fff", textAlign:data.alignment||"left", fontFamily:"'Playfair Display',serif", display:"block" }} />
            <div style={{ color:T.sub, fontSize:10, marginTop:4 }}>{data.tag} · {data.fontSize}px</div>
          </div>
        )
      }

      case "paragraph": return (
        <div style={{ padding:"4px 0" }}>
          <EditableText value={data.content} field="content"
            style={{ fontSize:data.fontSize||16, color:data.color||"rgba(255,255,255,0.8)", textAlign:data.alignment||"left", lineHeight:1.7, display:"block", whiteSpace:"pre-wrap" }} />
        </div>
      )

      case "button": {
        const styles = { primary:"linear-gradient(135deg,#F59E0B,#D97706)", secondary:"transparent", outline:"transparent" }
        return (
          <div style={{ padding:"8px 0", textAlign:data.alignment||"center" }}>
            <div style={{ display:"inline-block", padding:"12px 28px", background:styles[data.style]||styles.primary, border:data.style==="outline"?"2px solid #F59E0B":"none", borderRadius:10, fontWeight:700, fontSize:15, color:data.style==="primary"?"#000":"#F59E0B", cursor:"pointer" }}>
              {data.text}
            </div>
          </div>
        )
      }

      case "divider": return (
        <div style={{ padding:`${data.spacing||32}px 0` }}>
          <div style={{ height:1, background:data.color||"rgba(255,255,255,0.1)", borderRadius:1 }} />
        </div>
      )

      case "trust-bar": return (
        <div style={{ padding:"16px", background:"rgba(245,158,11,0.05)", border:"1px solid rgba(245,158,11,0.1)", borderRadius:10 }}>
          <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center" }}>
            {(data.items||[]).map((item, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 14px", background:"rgba(255,255,255,0.05)", borderRadius:20, fontSize:12, color:"rgba(255,255,255,0.7)" }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      )

      case "stats-row": return (
        <div style={{ display:"grid", gridTemplateColumns:`repeat(${(data.stats||[]).length},1fr)`, gap:12, padding:"8px 0" }}>
          {(data.stats||[]).map((stat,i) => (
            <div key={i} style={{ textAlign:"center", padding:"20px 12px", background:"rgba(255,255,255,0.04)", borderRadius:12, border:"1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize:24, marginBottom:4 }}>{stat.icon}</div>
              <div style={{ fontSize:28, fontWeight:800, color:"#F59E0B" }}>{stat.value}</div>
              <div style={{ fontSize:11, color:T.sub, marginTop:3 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      )

      case "offer-banner": return (
        <div style={{ padding:"28px 24px", background:data.bg||"linear-gradient(135deg,#7c2d12,#c2410c)", borderRadius:12, textAlign:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:12, right:16, background:"#EF4444", color:"#fff", fontWeight:800, fontSize:13, padding:"4px 12px", borderRadius:20, transform:"rotate(3deg)" }}>{data.badge}</div>
          <div style={{ fontSize:24, fontWeight:800, color:"#fff", marginBottom:8, fontFamily:"'Playfair Display',serif" }}>{data.heading}</div>
          <div style={{ fontSize:14, color:"rgba(255,255,255,0.8)", marginBottom:18 }}>{data.subheading}</div>
          <div style={{ display:"inline-block", padding:"11px 24px", background:"#25D366", borderRadius:9, fontWeight:700, fontSize:14, color:"#fff", cursor:"pointer" }}>
            💬 {data.cta}
          </div>
        </div>
      )

      case "urgency-strip": return (
        <div style={{ padding:"14px 20px", background:`${data.color||"#EF4444"}15`, border:`1px solid ${data.color||"#EF4444"}40`, borderRadius:10, textAlign:"center" }}>
          <div style={{ fontWeight:700, fontSize:15, color:data.color||"#EF4444" }}>{data.text}</div>
          {data.sub && <div style={{ fontSize:12, color:T.sub, marginTop:4 }}>{data.sub}</div>}
        </div>
      )

      default: return (
        <div style={{ padding:20, textAlign:"center", color:T.sub, fontSize:13, background:"rgba(255,255,255,0.03)", borderRadius:8, border:`1px dashed ${T.cardBorder}` }}>
          [{type} block]
        </div>
      )
    }
  }

  return (
    <div
      onClick={() => onSelect(block.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position:"relative", marginBottom:8, borderRadius:10, border:`2px solid ${isSelected?"#F59E0B":hovered?"rgba(245,158,11,0.25)":"transparent"}`, transition:"border-color 0.15s", cursor:"pointer" }}
    >
      {/* Block toolbar on hover/select */}
      {(hovered || isSelected) && (
        <div onClick={e => e.stopPropagation()}
          style={{ position:"absolute", top:-36, left:0, right:0, display:"flex", alignItems:"center", gap:4, zIndex:20, height:32 }}>
          <div style={{ display:"flex", alignItems:"center", gap:3, background:"#0d0804", border:"1px solid rgba(245,158,11,0.3)", borderRadius:7, padding:"3px 8px", fontSize:12 }}>
            <span style={{ color:T.sub, fontSize:11, marginRight:4, cursor:"grab" }}>≡</span>
            <span style={{ color:"rgba(255,255,255,0.6)", fontSize:11, fontWeight:600, marginRight:8 }}>
              {BLOCK_LIBRARY.flatMap(c=>c.blocks).find(b=>b.type===type)?.label || type}
            </span>
            <button onClick={() => onMoveUp(block.id)} disabled={!canMoveUp}
              style={{ background:"none", border:"none", color:canMoveUp?"rgba(255,255,255,0.6)":"rgba(255,255,255,0.15)", cursor:canMoveUp?"pointer":"default", fontSize:12, padding:"0 3px" }}>↑</button>
            <button onClick={() => onMoveDown(block.id)} disabled={!canMoveDown}
              style={{ background:"none", border:"none", color:canMoveDown?"rgba(255,255,255,0.6)":"rgba(255,255,255,0.15)", cursor:canMoveDown?"pointer":"default", fontSize:12, padding:"0 3px" }}>↓</button>
            <button onClick={() => onDuplicate(block.id)}
              style={{ background:"none", border:"none", color:"rgba(255,255,255,0.6)", cursor:"pointer", fontSize:12, padding:"0 3px" }}>⧉</button>
            <button onClick={() => onDelete(block.id)}
              style={{ background:"none", border:"none", color:"#F87171", cursor:"pointer", fontSize:12, padding:"0 3px" }}>🗑️</button>
          </div>
        </div>
      )}
      <div style={{ padding:"4px" }}>
        {renderBlock()}
      </div>
    </div>
  )
}

// ─── RIGHT PANEL — BLOCK SETTINGS ───────────────────────────────────────────
function BlockSettingsPanel({ block, onChange }) {
  if (!block) return (
    <div style={{ padding:20, textAlign:"center" }}>
      <div style={{ fontSize:32, marginBottom:12 }}>👆</div>
      <div style={{ color:T.sub, fontSize:13, lineHeight:1.6 }}>Click any block on the canvas to edit its settings here</div>
    </div>
  )

  const { type, data } = block
  const update = (patch) => onChange(block.id, { ...data, ...patch })
  const updateNested = (parent, patch) => onChange(block.id, { ...data, [parent]: { ...data[parent], ...patch } })

  const Field = ({ label, children }) => (
    <div style={{ marginBottom:12 }}>
      <label style={{ color:T.sub, fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:5 }}>{label}</label>
      {children}
    </div>
  )

  const Input = ({ value, onChange, placeholder, type="text" }) => (
    <input type={type} value={value||""} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ width:"100%", padding:"8px 11px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:7, color:"#fff", fontSize:12, fontFamily:"'Outfit',sans-serif", outline:"none", boxSizing:"border-box" }} />
  )

  const Slider = ({ value, min=0, max=100, step=1, onChange, label }) => (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
        <label style={{ color:T.sub, fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em" }}>{label}</label>
        <span style={{ color:"#F59E0B", fontSize:11, fontWeight:600 }}>{value}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ width:"100%", accentColor:"#F59E0B" }} />
    </div>
  )

  if (type === "hero-banner") return (
    <div style={{ padding:"0 4px" }}>
      <Field label="Heading">
        <Input value={data.heading} onChange={v => update({heading:v})} placeholder="Main headline" />
      </Field>
      <Field label="Subheading">
        <textarea value={data.subheading||""} onChange={e => update({subheading:e.target.value})}
          rows={2} placeholder="Supporting text"
          style={{ width:"100%", padding:"8px 11px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:7, color:"#fff", fontSize:12, fontFamily:"'Outfit',sans-serif", outline:"none", resize:"vertical", boxSizing:"border-box" }} />
      </Field>
      <Field label="Background Image URL">
        <Input value={data.backgroundImage} onChange={v => update({backgroundImage:v})} placeholder="https://images.unsplash.com/..." />
      </Field>
      <div style={{ marginBottom:16 }}>
        <Slider label="Overlay Opacity" value={data.overlayOpacity||0.5} min={0} max={0.9} step={0.05} onChange={v => update({overlayOpacity:v})} />
      </div>
      <Field label="Text Alignment">
        <div style={{ display:"flex", gap:5 }}>
          {["left","center","right"].map(a => (
            <button key={a} onClick={() => update({textAlign:a})}
              style={{ flex:1, padding:"7px", background:data.textAlign===a?"rgba(245,158,11,0.15)":"rgba(255,255,255,0.04)", border:`1px solid ${data.textAlign===a?"rgba(245,158,11,0.4)":"rgba(255,255,255,0.1)"}`, borderRadius:6, color:data.textAlign===a?"#F59E0B":"rgba(255,255,255,0.5)", fontSize:11, cursor:"pointer", fontFamily:"'Outfit',sans-serif", textTransform:"capitalize" }}>
              {a}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Button 1 Text">
        <Input value={data.button1?.text} onChange={v => updateNested("button1",{text:v})} placeholder="Book Now" />
      </Field>
      <Field label="Button 1 Link">
        <Input value={data.button1?.link} onChange={v => updateNested("button1",{link:v})} placeholder="/booking" />
      </Field>
      <Field label="Button 2 Text">
        <Input value={data.button2?.text} onChange={v => updateNested("button2",{text:v})} placeholder="Learn More" />
      </Field>
      <Field label="Button 2 Link">
        <Input value={data.button2?.link} onChange={v => updateNested("button2",{link:v})} placeholder="#packages" />
      </Field>
    </div>
  )

  if (type === "heading") return (
    <div style={{ padding:"0 4px" }}>
      <Field label="Heading Text">
        <Input value={data.text} onChange={v => update({text:v})} placeholder="Your heading..." />
      </Field>
      <Field label="Tag (H1/H2/H3)">
        <div style={{ display:"flex", gap:5 }}>
          {["H1","H2","H3"].map(t => (
            <button key={t} onClick={() => update({tag:t})}
              style={{ flex:1, padding:"8px", background:data.tag===t?"rgba(245,158,11,0.15)":"rgba(255,255,255,0.04)", border:`1px solid ${data.tag===t?"rgba(245,158,11,0.4)":"rgba(255,255,255,0.1)"}`, borderRadius:6, color:data.tag===t?"#F59E0B":"rgba(255,255,255,0.5)", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
              {t}
            </button>
          ))}
        </div>
      </Field>
      <div style={{ marginBottom:16 }}>
        <Slider label="Font Size" value={data.fontSize||36} min={16} max={72} step={2} onChange={v => update({fontSize:v})} />
      </div>
      <Field label="Color">
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <input type="color" value={data.color||"#ffffff"} onChange={e => update({color:e.target.value})}
            style={{ width:36, height:32, borderRadius:6, border:"none", cursor:"pointer", background:"none" }} />
          <Input value={data.color||"#ffffff"} onChange={v => update({color:v})} placeholder="#FFFFFF" />
        </div>
      </Field>
      <Field label="Alignment">
        <div style={{ display:"flex", gap:5 }}>
          {["left","center","right"].map(a => (
            <button key={a} onClick={() => update({alignment:a})}
              style={{ flex:1, padding:"7px", background:data.alignment===a?"rgba(245,158,11,0.15)":"rgba(255,255,255,0.04)", border:`1px solid ${data.alignment===a?"rgba(245,158,11,0.4)":"rgba(255,255,255,0.1)"}`, borderRadius:6, color:data.alignment===a?"#F59E0B":"rgba(255,255,255,0.5)", fontSize:11, cursor:"pointer", fontFamily:"'Outfit',sans-serif", textTransform:"capitalize" }}>
              {a}
            </button>
          ))}
        </div>
      </Field>
    </div>
  )

  if (type === "paragraph") return (
    <div style={{ padding:"0 4px" }}>
      <Field label="Content">
        <textarea value={data.content||""} onChange={e => update({content:e.target.value})}
          rows={6} placeholder="Paragraph text..."
          style={{ width:"100%", padding:"8px 11px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:7, color:"#fff", fontSize:12, fontFamily:"'Outfit',sans-serif", outline:"none", resize:"vertical", boxSizing:"border-box", lineHeight:1.6 }} />
      </Field>
      <div style={{ marginBottom:16 }}>
        <Slider label="Font Size" value={data.fontSize||16} min={12} max={28} step={1} onChange={v => update({fontSize:v})} />
      </div>
      <Field label="Alignment">
        <div style={{ display:"flex", gap:5 }}>
          {["left","center","right"].map(a => (
            <button key={a} onClick={() => update({alignment:a})}
              style={{ flex:1, padding:"7px", background:data.alignment===a?"rgba(245,158,11,0.15)":"rgba(255,255,255,0.04)", border:`1px solid ${data.alignment===a?"rgba(245,158,11,0.4)":"rgba(255,255,255,0.1)"}`, borderRadius:6, color:data.alignment===a?"#F59E0B":"rgba(255,255,255,0.5)", fontSize:11, cursor:"pointer", fontFamily:"'Outfit',sans-serif", textTransform:"capitalize" }}>
              {a}
            </button>
          ))}
        </div>
      </Field>
    </div>
  )

  return (
    <div style={{ padding:"0 4px", color:T.sub, fontSize:12, textAlign:"center" }}>
      <div style={{ marginBottom:8 }}>⚙️ Settings for <strong style={{color:"#fff"}}>{type}</strong></div>
      <div style={{ color:T.sub, fontSize:11 }}>Advanced settings for this block type coming in Session 2.</div>
    </div>
  )
}

// ─── RIGHT PANEL — AI ENGINE ─────────────────────────────────────────────────
function AiPanel({ seo, onSeoChange, blocks, aiMode, onAiModeChange }) {
  const [topic, setTopic] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [keywords, setKeywords] = useState([])
  const [variations, setVariations] = useState([])
  const [activeGen, setActiveGen] = useState(null)
  const seoScore = calcSeoScore(seo, blocks)

  const analyzeKeywords = async () => {
    if (!topic.trim()) return
    setAnalyzing(true)
    setKeywords([])
    if (aiMode === "premium" && typeof window !== "undefined") {
      try {
        const res = await fetch("/api/anthropic", {
          method:"POST", headers:{"Content-Type":"application/json"},
          body: JSON.stringify({ prompt: `You are an SEO expert for Dubai tourism. Given the topic "${topic}", generate 8 keyword suggestions. Return ONLY valid JSON array: [{"keyword":"...","volume":"X,XXX","difficulty":55,"opportunity":"high/medium/low","trending":false}]. No markdown, no explanation.` })
        })
        const d = await res.json()
        const text = d.content?.[0]?.text || "[]"
        const cleaned = text.replace(/```json?|```/g,"").trim()
        setKeywords(JSON.parse(cleaned))
      } catch {
        setKeywords(getFreeKeywords(topic))
      }
    } else {
      await new Promise(r => setTimeout(r, 900))
      setKeywords(getFreeKeywords(topic))
    }
    setAnalyzing(false)
  }

  const getFreeKeywords = (t) => {
    const base = t.toLowerCase().replace(/[^a-z0-9\s]/g,"").trim()
    return [
      { keyword:base, volume:"10,000+", difficulty:60, opportunity:"medium", trending:false },
      { keyword:`${base} dubai`, volume:"8,500", difficulty:55, opportunity:"medium", trending:false },
      { keyword:`best ${base}`, volume:"5,200", difficulty:48, opportunity:"high", trending:false },
      { keyword:`${base} booking`, volume:"3,100", difficulty:35, opportunity:"high", trending:true },
      { keyword:`${base} price`, volume:"2,800", difficulty:32, opportunity:"high", trending:false },
      { keyword:`cheap ${base}`, volume:"2,100", difficulty:28, opportunity:"high", trending:false },
      { keyword:`${base} near me`, volume:"1,800", difficulty:25, opportunity:"high", trending:true },
      { keyword:`private ${base}`, volume:"1,200", difficulty:22, opportunity:"high", trending:false },
    ]
  }

  const generate = async (genType) => {
    if (!topic.trim()) { alert("Enter a topic first"); return }
    setGenerating(true)
    setActiveGen(genType)
    setVariations([])

    const prompts = {
      h1: `Generate 3 H1 title variations for a Dubai tourism page about "${topic}". JSON only: [{"text":"...","chars":50,"score":"high"}]. No markdown.`,
      h2: `Generate 3 H2 subtitle variations for a Dubai page about "${topic}". JSON only: [{"text":"...","chars":60,"score":"medium"}]. No markdown.`,
      paragraph: `Generate 3 short paragraph variations (2-3 sentences) for a Dubai tourism page about "${topic}". JSON only: [{"text":"...","words":45,"score":"high"}]. No markdown.`,
      metaTitle: `Generate 3 SEO meta title variations (50-65 chars) for a Dubai tourism page about "${topic}". JSON only: [{"text":"...","chars":58,"score":"high"}]. No markdown.`,
      metaDesc: `Generate 3 meta description variations (140-160 chars) for a Dubai tourism page about "${topic}". Include call-to-action. JSON only: [{"text":"...","chars":155,"score":"high"}]. No markdown.`,
    }

    if (aiMode === "premium") {
      try {
        const res = await fetch("/api/anthropic", {
          method:"POST", headers:{"Content-Type":"application/json"},
          body: JSON.stringify({ prompt: prompts[genType] || prompts.h1 })
        })
        const d = await res.json()
        const text = d.content?.[0]?.text || "[]"
        const cleaned = text.replace(/```json?|```/g,"").trim()
        setVariations(JSON.parse(cleaned))
      } catch {
        setVariations(getFreeVariations(genType, topic))
      }
    } else {
      await new Promise(r => setTimeout(r, 700))
      setVariations(getFreeVariations(genType, topic))
    }
    setGenerating(false)
  }

  const getFreeVariations = (type, topic) => {
    const t = topic
    const map = {
      h1: [
        { text:`${t} Dubai — Book Online`, chars:38, score:"high" },
        { text:`Best ${t} Dubai | From AED 150`, chars:32, score:"high" },
        { text:`#1 Rated ${t} in Dubai | DubaiRovers`, chars:40, score:"medium" },
      ],
      h2: [
        { text:`Why Choose Our ${t}?`, chars:20, score:"high" },
        { text:`Everything Included — ${t} Dubai`, chars:33, score:"medium" },
        { text:`Discover ${t} with DubaiRovers`, chars:31, score:"high" },
      ],
      paragraph: [
        { text:`Experience the best ${t} in Dubai with DubaiRovers. Fully guided, hotel pickup included, instant WhatsApp confirmation.`, words:22, score:"high" },
        { text:`Book your ${t} experience today and discover why we're Dubai's most trusted tour operator with 4.9★ rating.`, words:20, score:"high" },
        { text:`From thrilling adventures to cultural discoveries — our ${t} packages are designed to create memories that last a lifetime.`, words:22, score:"medium" },
      ],
      metaTitle: [
        { text:`${t} Dubai — Book Online | DubaiRovers`, chars:40, score:"high" },
        { text:`Best ${t} Dubai from AED 150 | DubaiRovers`, chars:43, score:"high" },
        { text:`${t} Dubai — #1 Rated Tours | DubaiRovers`, chars:43, score:"medium" },
      ],
      metaDesc: [
        { text:`Book ${t} in Dubai from AED 150/person. Hotel pickup included. Instant WhatsApp confirmation. Free cancellation 24h. 4.9★ rated.`, chars:130, score:"high" },
        { text:`Experience ${t} in Dubai with DubaiRovers — Dubai's trusted tour operator. Book online now and get instant confirmation.`, chars:123, score:"high" },
        { text:`Best ${t} Dubai offers by DubaiRovers. Fully guided experience with hotel transfers, amazing views and memories for life.`, chars:122, score:"medium" },
      ],
    }
    return map[type] || map.h1
  }

  const applyVariation = (text, genType) => {
    if (genType === "metaTitle") onSeoChange({ ...seo, metaTitle: text })
    else if (genType === "metaDesc") onSeoChange({ ...seo, metaDescription: text })
    setVariations([])
    setActiveGen(null)
  }

  const oppColor = { high:"#10B981", medium:"#F59E0B", low:"#EF4444" }

  return (
    <div style={{ padding:"0 4px" }}>
      {/* Mode toggle */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:16 }}>
        {[["free","🆓","Free","No API key needed"],["premium","🤖","Claude AI","Needs ANTHROPIC_API_KEY"]].map(([id,ic,lb,desc]) => (
          <div key={id} onClick={() => onAiModeChange(id)}
            style={{ padding:"10px 10px", background:aiMode===id?"rgba(245,158,11,0.08)":"rgba(255,255,255,0.02)", border:`2px solid ${aiMode===id?"rgba(245,158,11,0.4)":"rgba(255,255,255,0.07)"}`, borderRadius:9, cursor:"pointer", transition:"all 0.15s", textAlign:"center" }}>
            <div style={{ fontSize:18 }}>{ic}</div>
            <div style={{ fontSize:11, fontWeight:700, color:"#fff", marginTop:3 }}>{lb}</div>
            <div style={{ fontSize:9, color:T.sub, lineHeight:1.3, marginTop:2 }}>{desc}</div>
            {aiMode===id && <div style={{ fontSize:9, color:"#F59E0B", fontWeight:600, marginTop:4 }}>● Active</div>}
          </div>
        ))}
      </div>

      {/* Topic input */}
      <div style={{ marginBottom:12 }}>
        <label style={{ color:T.sub, fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:5 }}>Topic / Keyword</label>
        <div style={{ display:"flex", gap:6 }}>
          <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Desert Safari Dubai"
            onKeyDown={e => e.key==="Enter" && analyzeKeywords()}
            style={{ flex:1, padding:"8px 10px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:7, color:"#fff", fontSize:12, fontFamily:"'Outfit',sans-serif", outline:"none" }} />
          <button onClick={analyzeKeywords} disabled={analyzing || !topic.trim()}
            style={{ padding:"8px 10px", background:analyzing?"rgba(245,158,11,0.2)":"rgba(245,158,11,0.15)", border:"1px solid rgba(245,158,11,0.3)", borderRadius:7, color:"#F59E0B", fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif", whiteSpace:"nowrap" }}>
            {analyzing ? "⏳" : "🔍 Analyze"}
          </button>
        </div>
      </div>

      {/* Keywords table */}
      {keywords.length > 0 && (
        <div style={{ marginBottom:14 }}>
          <div style={{ color:T.sub, fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>🔑 Keyword Intelligence</div>
          <div style={{ background:"rgba(0,0,0,0.3)", borderRadius:8, overflow:"hidden", border:"1px solid rgba(255,255,255,0.07)" }}>
            {keywords.map((kw, i) => (
              <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 55px 55px 24px", gap:4, padding:"7px 10px", borderBottom:i<keywords.length-1?"1px solid rgba(255,255,255,0.05)":"none", alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                  {kw.trending && <span style={{ fontSize:9 }}>🔥</span>}
                  <span style={{ color:"#fff", fontSize:11, lineHeight:1.3 }}>{kw.keyword}</span>
                </div>
                <div style={{ color:T.sub, fontSize:10 }}>{kw.volume}</div>
                <div style={{ color:T.sub, fontSize:10 }}>{kw.difficulty}/100</div>
                <div style={{ width:8, height:8, borderRadius:"50%", background:oppColor[kw.opportunity]||"#F59E0B" }} />
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:10, marginTop:6 }}>
            {Object.entries(oppColor).map(([k,c]) => (
              <div key={k} style={{ display:"flex", alignItems:"center", gap:4, fontSize:9, color:T.sub }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:c }} />
                {k}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content generator buttons */}
      <div style={{ marginBottom:14 }}>
        <div style={{ color:T.sub, fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>✨ Generate Content</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:5 }}>
          {[["h1","H1 Title"],["h2","H2 Sub"],["paragraph","Paragraph"],["metaTitle","Meta Title"],["metaDesc","Meta Desc"]].map(([id,lb]) => (
            <button key={id} onClick={() => generate(id)} disabled={generating}
              style={{ padding:"7px 8px", background:activeGen===id&&generating?"rgba(245,158,11,0.2)":"rgba(255,255,255,0.04)", border:`1px solid ${activeGen===id&&generating?"rgba(245,158,11,0.4)":"rgba(255,255,255,0.1)"}`, borderRadius:7, color:activeGen===id&&generating?"#F59E0B":"rgba(255,255,255,0.6)", fontSize:10, cursor:"pointer", fontFamily:"'Outfit',sans-serif", fontWeight:600, transition:"all 0.15s" }}>
              {generating && activeGen===id ? "⏳" : ""} {lb}
            </button>
          ))}
        </div>
      </div>

      {/* Variations */}
      {variations.length > 0 && (
        <div style={{ marginBottom:14 }}>
          <div style={{ color:T.sub, fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Choose a variation:</div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {variations.map((v, i) => (
              <div key={i} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:8, padding:"10px 12px" }}>
                <div style={{ color:"#fff", fontSize:12, lineHeight:1.5, marginBottom:6 }}>{v.text}</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:10, color:T.sub }}>{v.chars||v.words} {v.chars?"chars":"words"} · Score: {v.score}</span>
                  <button onClick={() => applyVariation(v.text, activeGen)}
                    style={{ padding:"4px 10px", background:"rgba(245,158,11,0.15)", border:"1px solid rgba(245,158,11,0.3)", borderRadius:5, color:"#F59E0B", fontSize:10, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
                    Use This →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEO score */}
      <div style={{ background:"rgba(0,0,0,0.3)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, padding:"14px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <div style={{ color:T.sub, fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em" }}>📊 Live SEO Score</div>
          <div style={{ fontSize:18, fontWeight:800, color: seoScore>=80?"#10B981":seoScore>=60?"#F59E0B":"#EF4444" }}>{seoScore}/100</div>
        </div>
        <div style={{ height:6, background:"rgba(255,255,255,0.08)", borderRadius:3, overflow:"hidden", marginBottom:12 }}>
          <div style={{ height:"100%", width:`${seoScore}%`, background:seoScore>=80?"#10B981":seoScore>=60?"#F59E0B":"#EF4444", borderRadius:3, transition:"width 0.5s ease" }} />
        </div>
        {[
          { label:"Title tag", val: seo.metaTitle?.length >= 30 ? 100 : seo.metaTitle ? 50 : 0 },
          { label:"Meta desc", val: seo.metaDescription?.length >= 120 ? 100 : seo.metaDescription ? 50 : 0 },
          { label:"H1 present", val: blocks.some(b=>b.type==="hero-banner"||( b.type==="heading"&&b.data.tag==="H1")) ? 100 : 0 },
          { label:"Content", val: Math.min((blocks.filter(b=>b.type==="paragraph").reduce((a,b)=>a+(b.data.content?.length||0),0)/300)*100,100) },
        ].map(item => (
          <div key={item.label} style={{ display:"grid", gridTemplateColumns:"70px 1fr 28px", gap:6, alignItems:"center", marginBottom:5 }}>
            <span style={{ color:T.sub, fontSize:10 }}>{item.label}</span>
            <div style={{ height:3, background:"rgba(255,255,255,0.08)", borderRadius:2, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${item.val}%`, background:item.val>=80?"#10B981":item.val>=40?"#F59E0B":"#EF4444", transition:"width 0.4s ease" }} />
            </div>
            <span style={{ color:item.val===100?"#10B981":T.sub, fontSize:10, textAlign:"right" }}>{item.val===100?"✅":Math.round(item.val)+"%"}</span>
          </div>
        ))}
      </div>

      {/* SEO settings */}
      <div style={{ marginTop:14 }}>
        <div style={{ color:T.sub, fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>🔗 SEO Settings</div>
        {[
          { key:"metaTitle", label:"Page Title", placeholder:"Best Desert Safari Dubai | DubaiRovers", rows:1 },
          { key:"metaDescription", label:"Meta Description", placeholder:"Book desert safari from AED 150...", rows:2 },
          { key:"slug", label:"URL Slug", placeholder:"desert-safari-dubai", rows:1 },
        ].map(f => (
          <div key={f.key} style={{ marginBottom:10 }}>
            <label style={{ color:T.sub, fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:4 }}>
              {f.label}
              {f.key==="metaTitle" && seo[f.key] && <span style={{ marginLeft:6, color:seo[f.key].length<=65?"#10B981":"#EF4444" }}>{seo[f.key].length}/65</span>}
              {f.key==="metaDescription" && seo[f.key] && <span style={{ marginLeft:6, color:seo[f.key].length<=165?"#10B981":"#EF4444" }}>{seo[f.key].length}/165</span>}
            </label>
            {f.rows > 1 ? (
              <textarea value={seo[f.key]||""} onChange={e => onSeoChange({...seo,[f.key]:e.target.value})} placeholder={f.placeholder} rows={f.rows}
                style={{ width:"100%", padding:"8px 10px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:7, color:"#fff", fontSize:11, fontFamily:"'Outfit',sans-serif", outline:"none", resize:"vertical", boxSizing:"border-box" }} />
            ) : (
              <input value={seo[f.key]||""} onChange={e => onSeoChange({...seo,[f.key]:e.target.value})} placeholder={f.placeholder}
                style={{ width:"100%", padding:"8px 10px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:7, color:"#fff", fontSize:11, fontFamily:"'Outfit',sans-serif", outline:"none", boxSizing:"border-box" }} />
            )}
          </div>
        ))}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:6 }}>
          <label style={{ color:T.sub, fontSize:10 }}>Index this page</label>
          <div onClick={() => onSeoChange({...seo, index:!seo.index})}
            style={{ width:34, height:18, borderRadius:9, background:seo.index?"#F59E0B":"rgba(255,255,255,0.15)", cursor:"pointer", position:"relative", transition:"background 0.2s" }}>
            <div style={{ position:"absolute", top:2, left:seo.index?18:2, width:14, height:14, borderRadius:"50%", background:"#fff", transition:"left 0.2s" }} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN EDITOR ─────────────────────────────────────────────────────────────
export default function PageEditor({ params }) {
  const pageId = params?.pageId || "new"
  const [blocks, setBlocks] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [title, setTitle] = useState("Untitled Page")
  const [editingTitle, setEditingTitle] = useState(false)
  const [seo, setSeo] = useState({ metaTitle:"", metaDescription:"", slug:"", schemaType:"TouristAttraction", ogImage:"", index:true })
  const [rightTab, setRightTab] = useState("settings")
  const [aiMode, setAiMode] = useState("free")
  const [dragOver, setDragOver] = useState(false)
  const [dragOverIndex, setDragOverIndex] = useState(null)
  const [draggingBlockId, setDraggingBlockId] = useState(null)
  const [saved, setSaved] = useState(false)
  const [notif, setNotif] = useState("")
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [publishStatus, setPublishStatus] = useState("draft")
  const canvasRef = useRef(null)

  // Load existing page
  useEffect(() => {
    const stored = localStorage.getItem("dr_custom_pages")
    if (stored) {
      try {
        const pages = JSON.parse(stored)
        const page = pages.find(p => p.id === pageId)
        if (page) {
          setTitle(page.title)
          setBlocks(page.fullBlocks || page.blocks && typeof page.blocks === "object" && !Array.isArray(page.blocks) ? [] : (page.fullBlocks || []))
          setSeo(page.seo || seo)
          setPublishStatus(page.status || "draft")
        }
      } catch {}
    }
    // Load block data
    const blockData = localStorage.getItem(`dr_blocks_${pageId}`)
    if (blockData) {
      try { setBlocks(JSON.parse(blockData)) } catch {}
    }
  }, [pageId])

  // Auto-save every 30s
  useEffect(() => {
    const t = setInterval(() => saveAll(false), 30000)
    return () => clearInterval(t)
  }, [blocks, title, seo])

  const toast = (msg) => { setNotif(msg); setTimeout(() => setNotif(""), 3000) }

  const saveAll = (showToast = true) => {
    localStorage.setItem(`dr_blocks_${pageId}`, JSON.stringify(blocks))
    const stored = localStorage.getItem("dr_custom_pages")
    if (stored) {
      try {
        const pages = JSON.parse(stored)
        const updated = pages.map(p => p.id === pageId ? { ...p, title, seo, status:publishStatus, updatedAt:new Date().toISOString().split("T")[0], blocks:blocks.length, fullBlocks:blocks } : p)
        if (!updated.find(p => p.id === pageId)) {
          updated.push({ id:pageId, title, slug:seo.slug||pageId, type:"landing", status:publishStatus, createdAt:new Date().toISOString().split("T")[0], updatedAt:new Date().toISOString().split("T")[0], blocks:blocks.length, fullBlocks:blocks, seo })
        }
        localStorage.setItem("dr_custom_pages", JSON.stringify(updated))
      } catch {}
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    if (showToast) toast("✅ Draft saved!")
  }

  const publish = () => {
    setPublishStatus("published")
    saveAll(false)
    setShowPublishModal(false)
    toast("🚀 Page published live!")
  }

  // Block operations
  const addBlock = (type, insertAtIndex = null) => {
    const id = "block_" + Date.now()
    const block = { id, type, order: blocks.length + 1, data: { ...defaultData[type] } }
    if (insertAtIndex !== null) {
      const newBlocks = [...blocks]
      newBlocks.splice(insertAtIndex, 0, block)
      setBlocks(newBlocks.map((b,i) => ({...b,order:i+1})))
    } else {
      setBlocks(prev => [...prev, block])
    }
    setSelectedId(id)
    setRightTab("settings")
  }

  const deleteBlock = (id) => {
    setBlocks(prev => prev.filter(b => b.id !== id).map((b,i) => ({...b,order:i+1})))
    if (selectedId === id) setSelectedId(null)
  }

  const moveBlock = (id, dir) => {
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id === id)
      if (dir === "up" && idx === 0) return prev
      if (dir === "down" && idx === prev.length-1) return prev
      const next = [...prev]
      const swap = dir === "up" ? idx-1 : idx+1
      ;[next[idx], next[swap]] = [next[swap], next[idx]]
      return next.map((b,i) => ({...b,order:i+1}))
    })
  }

  const duplicateBlock = (id) => {
    const block = blocks.find(b => b.id === id)
    if (!block) return
    const newBlock = { ...block, id:"block_"+Date.now(), data:{...block.data} }
    const idx = blocks.findIndex(b => b.id === id)
    const next = [...blocks]
    next.splice(idx+1, 0, newBlock)
    setBlocks(next.map((b,i) => ({...b,order:i+1})))
  }

  const updateBlockData = (id, data) => {
    setBlocks(prev => prev.map(b => b.id === id ? {...b, data} : b))
  }

  // Drag from library
  const handleLibraryDragStart = (e, type) => {
    e.dataTransfer.setData("blockType", type)
    e.dataTransfer.effectAllowed = "copy"
  }

  const handleCanvasDrop = (e) => {
    e.preventDefault()
    const type = e.dataTransfer.getData("blockType")
    if (type) addBlock(type, dragOverIndex)
    setDragOver(false)
    setDragOverIndex(null)
  }

  // Canvas block reordering drag
  const handleBlockDragStart = (e, id) => {
    e.dataTransfer.setData("reorderBlockId", id)
    e.dataTransfer.effectAllowed = "move"
    setDraggingBlockId(id)
  }

  const handleBlockDropReorder = (e, targetId) => {
    e.preventDefault()
    const fromId = e.dataTransfer.getData("reorderBlockId")
    if (!fromId || fromId === targetId) return
    setBlocks(prev => {
      const from = prev.findIndex(b => b.id === fromId)
      const to = prev.findIndex(b => b.id === targetId)
      const next = [...prev]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next.map((b,i) => ({...b,order:i+1}))
    })
    setDraggingBlockId(null)
  }

  const selectedBlock = blocks.find(b => b.id === selectedId)

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:T.bg, fontFamily:"'Outfit',sans-serif", color:T.text, overflow:"hidden" }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(245,158,11,0.3);border-radius:2px}
        .lib-block:hover{background:rgba(245,158,11,0.08)!important;border-color:rgba(245,158,11,0.3)!important}
        @keyframes si{from{opacity:0;transform:scale(0.97)}to{opacity:1;transform:scale(1)}}
        @keyframes ni{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* TOP BAR */}
      <div style={{ height:54, background:"rgba(0,0,0,0.6)", borderBottom:`1px solid ${T.cardBorder}`, display:"flex", alignItems:"center", gap:12, padding:"0 16px", flexShrink:0, backdropFilter:"blur(12px)", zIndex:50 }}>
        <Link href="/admin/page-builder" style={{ color:T.sub, fontSize:12, textDecoration:"none", display:"flex", alignItems:"center", gap:5, whiteSpace:"nowrap" }}>
          ← Pages
        </Link>
        <span style={{ color:"rgba(255,255,255,0.1)" }}>|</span>

        {/* Page title inline edit */}
        {editingTitle ? (
          <input value={title} autoFocus
            onChange={e => setTitle(e.target.value)}
            onBlur={() => setEditingTitle(false)}
            onKeyDown={e => e.key==="Enter" && setEditingTitle(false)}
            style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(245,158,11,0.4)", borderRadius:6, padding:"4px 10px", color:"#fff", fontSize:14, fontWeight:600, outline:"none", fontFamily:"'Outfit',sans-serif", minWidth:200 }} />
        ) : (
          <div onClick={() => setEditingTitle(true)} style={{ fontSize:14, fontWeight:600, color:"#fff", cursor:"text", padding:"4px 8px", borderRadius:6, border:"1px solid transparent", display:"flex", alignItems:"center", gap:6 }}>
            {title} <span style={{ color:T.sub, fontSize:10 }}>✏️</span>
          </div>
        )}

        <div style={{ display:"flex", alignItems:"center", gap:5, flex:1 }}>
          <span style={{ color:"rgba(245,158,11,0.5)", fontSize:11, fontFamily:"monospace" }}>/{seo.slug || "untitled"}</span>
          <span style={{ padding:"2px 8px", background:publishStatus==="published"?"rgba(16,185,129,0.12)":"rgba(99,102,241,0.12)", border:`1px solid ${publishStatus==="published"?"rgba(16,185,129,0.3)":"rgba(99,102,241,0.3)"}`, borderRadius:10, fontSize:10, color:publishStatus==="published"?"#10B981":"#818CF8", fontWeight:600 }}>
            {publishStatus}
          </span>
        </div>

        <div style={{ display:"flex", gap:7, flexShrink:0 }}>
          <button onClick={() => saveAll()}
            style={{ padding:"7px 14px", background:saved?"rgba(16,185,129,0.15)":"rgba(255,255,255,0.06)", border:`1px solid ${saved?"rgba(16,185,129,0.3)":T.cardBorder}`, borderRadius:8, color:saved?"#10B981":T.sub, fontSize:12, cursor:"pointer", fontFamily:"'Outfit',sans-serif", fontWeight:600, transition:"all 0.2s" }}>
            {saved ? "✅ Saved" : "💾 Save Draft"}
          </button>
          <a href={`/${seo.slug||"preview"}`} target="_blank" rel="noopener noreferrer"
            style={{ padding:"7px 14px", background:"rgba(255,255,255,0.06)", border:`1px solid ${T.cardBorder}`, borderRadius:8, color:T.sub, fontSize:12, cursor:"pointer", fontFamily:"'Outfit',sans-serif", fontWeight:600, textDecoration:"none", display:"flex", alignItems:"center", gap:5 }}>
            👁️ Preview
          </a>
          <button onClick={() => setShowPublishModal(true)}
            style={{ padding:"7px 16px", background:"linear-gradient(135deg,#F59E0B,#D97706)", border:"none", borderRadius:8, color:"#000", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif", display:"flex", alignItems:"center", gap:5 }}>
            🚀 Publish
          </button>
        </div>
      </div>

      {/* 3-PANEL MAIN AREA */}
      <div style={{ flex:1, display:"flex", overflow:"hidden" }}>

        {/* ── LEFT SIDEBAR — Block Library ── */}
        <div style={{ width:230, background:T.sidebar, borderRight:`1px solid ${T.cardBorder}`, display:"flex", flexDirection:"column", flexShrink:0, overflow:"hidden" }}>
          <div style={{ padding:"12px 14px 8px", borderBottom:`1px solid ${T.cardBorder}`, flexShrink:0 }}>
            <div style={{ color:T.sub, fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em", fontWeight:600 }}>Block Library</div>
            <div style={{ color:"rgba(255,255,255,0.3)", fontSize:9, marginTop:2 }}>Drag onto canvas →</div>
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:"10px 10px" }}>
            {BLOCK_LIBRARY.map(cat => (
              <div key={cat.category} style={{ marginBottom:14 }}>
                <div style={{ color:"rgba(245,158,11,0.6)", fontSize:9, textTransform:"uppercase", letterSpacing:"0.12em", fontWeight:700, marginBottom:6, padding:"0 4px" }}>
                  {cat.category}
                </div>
                {cat.blocks.map(block => (
                  <div key={block.type}
                    draggable
                    onDragStart={e => handleLibraryDragStart(e, block.type)}
                    onClick={() => addBlock(block.type)}
                    className="lib-block"
                    style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 10px", marginBottom:3, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:7, cursor:"grab", transition:"all 0.15s", userSelect:"none" }}>
                    <span style={{ fontSize:16, flexShrink:0 }}>{block.icon}</span>
                    <div>
                      <div style={{ fontSize:11, fontWeight:600, color:"rgba(255,255,255,0.8)" }}>{block.label}</div>
                      <div style={{ fontSize:9, color:T.sub, lineHeight:1.3, marginTop:1 }}>{block.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Block count */}
          <div style={{ padding:"10px 14px", borderTop:`1px solid ${T.cardBorder}`, flexShrink:0 }}>
            <div style={{ color:T.sub, fontSize:11 }}>{blocks.length} block{blocks.length!==1?"s":""} on canvas</div>
          </div>
        </div>

        {/* ── CENTER CANVAS ── */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", background:"#0d0804" }}>
          {/* Canvas controls */}
          <div style={{ padding:"8px 16px", borderBottom:`1px solid ${T.cardBorder}`, display:"flex", alignItems:"center", gap:10, background:"rgba(0,0,0,0.3)", flexShrink:0 }}>
            <div style={{ color:T.sub, fontSize:11 }}>🖥️ Desktop Preview — 900px</div>
            <div style={{ flex:1 }} />
            <div style={{ color:T.sub, fontSize:11 }}>Click text to edit inline · Drag ≡ to reorder</div>
          </div>

          {/* Scrollable canvas area */}
          <div style={{ flex:1, overflowY:"auto", padding:"24px" }}>
            <div
              ref={canvasRef}
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => { setDragOver(false); setDragOverIndex(null) }}
              onDrop={handleCanvasDrop}
              style={{ maxWidth:900, margin:"0 auto", minHeight:"100%", background:T.canvas, borderRadius:12, border:`2px ${dragOver?"dashed":"solid"} ${dragOver?"rgba(245,158,11,0.5)":T.cardBorder}`, padding:24, transition:"border-color 0.2s", position:"relative" }}
              onClick={() => { if (!blocks.length) return; setSelectedId(null) }}
            >
              {blocks.length === 0 ? (
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:320, gap:16 }}>
                  <div style={{ fontSize:48 }}>🏗️</div>
                  <div style={{ color:T.sub, fontSize:16, fontWeight:600 }}>Start building your page</div>
                  <div style={{ color:"rgba(255,255,255,0.25)", fontSize:13, textAlign:"center", maxWidth:340, lineHeight:1.6 }}>
                    Drag blocks from the left sidebar onto this canvas, or click any block to add it instantly
                  </div>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center", marginTop:8 }}>
                    {BLOCK_LIBRARY[0].blocks.concat(BLOCK_LIBRARY[1].blocks.slice(0,3)).map(b => (
                      <button key={b.type} onClick={e => { e.stopPropagation(); addBlock(b.type) }}
                        style={{ padding:"8px 14px", background:"rgba(255,255,255,0.05)", border:`1px solid ${T.cardBorder}`, borderRadius:8, color:"rgba(255,255,255,0.6)", fontSize:12, cursor:"pointer", fontFamily:"'Outfit',sans-serif", transition:"all 0.15s" }}>
                        {b.icon} {b.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  {blocks.map((block, idx) => (
                    <div key={block.id}
                      draggable
                      onDragStart={e => handleBlockDragStart(e, block.id)}
                      onDragOver={e => { e.preventDefault(); setDragOverIndex(idx); e.dataTransfer.dropEffect="move" }}
                      onDrop={e => { const fromId = e.dataTransfer.getData("reorderBlockId"); fromId ? handleBlockDropReorder(e, block.id) : handleCanvasDrop(e) }}
                      style={{ opacity: draggingBlockId === block.id ? 0.4 : 1, transition:"opacity 0.15s" }}>
                      <BlockPreview
                        block={block}
                        isSelected={selectedId === block.id}
                        onSelect={setSelectedId}
                        onDelete={deleteBlock}
                        onMoveUp={id => moveBlock(id, "up")}
                        onMoveDown={id => moveBlock(id, "down")}
                        onDuplicate={duplicateBlock}
                        canMoveUp={idx > 0}
                        canMoveDown={idx < blocks.length-1}
                        onContentEdit={updateBlockData}
                      />
                    </div>
                  ))}
                  {/* Add block button */}
                  <div style={{ marginTop:16, textAlign:"center" }}>
                    <button onClick={() => { const type = "paragraph"; addBlock(type) }}
                      style={{ padding:"10px 24px", background:"rgba(255,255,255,0.04)", border:`1px dashed rgba(245,158,11,0.3)`, borderRadius:9, color:"rgba(245,158,11,0.6)", fontSize:12, cursor:"pointer", fontFamily:"'Outfit',sans-serif", transition:"all 0.15s" }}>
                      + Add Block
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={{ width:300, background:T.sidebar, borderLeft:`1px solid ${T.cardBorder}`, display:"flex", flexDirection:"column", flexShrink:0, overflow:"hidden" }}>
          {/* Tabs */}
          <div style={{ display:"flex", borderBottom:`1px solid ${T.cardBorder}`, flexShrink:0 }}>
            {[["settings","⚙️ Settings"],["ai","🤖 AI Engine"]].map(([id,lb]) => (
              <button key={id} onClick={() => setRightTab(id)}
                style={{ flex:1, padding:"12px 8px", background:rightTab===id?"rgba(245,158,11,0.08)":"transparent", border:"none", borderBottom:rightTab===id?"2px solid #F59E0B":"2px solid transparent", color:rightTab===id?"#F59E0B":T.sub, fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif", transition:"all 0.15s" }}>
                {lb}
              </button>
            ))}
          </div>
          {/* Panel content */}
          <div style={{ flex:1, overflowY:"auto", padding:"14px 12px" }}>
            {rightTab === "settings" ? (
              <BlockSettingsPanel block={selectedBlock} onChange={updateBlockData} />
            ) : (
              <AiPanel seo={seo} onSeoChange={setSeo} blocks={blocks} aiMode={aiMode} onAiModeChange={setAiMode} />
            )}
          </div>
        </div>
      </div>

      {/* PUBLISH MODAL */}
      {showPublishModal && (
        <div onClick={() => setShowPublishModal(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", zIndex:400, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div onClick={e => e.stopPropagation()} style={{ background:"#110c06", border:"1px solid rgba(245,158,11,0.2)", borderRadius:20, padding:28, maxWidth:420, width:"100%", animation:"si 0.2s ease" }}>
            <div style={{ textAlign:"center", marginBottom:20 }}>
              <div style={{ fontSize:40 }}>🚀</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"#fff", marginTop:8 }}>Publish Page</div>
              <div style={{ color:T.sub, fontSize:13, marginTop:6 }}>"{title}" will go live immediately</div>
            </div>
            <div style={{ background:"rgba(245,158,11,0.06)", border:"1px solid rgba(245,158,11,0.15)", borderRadius:10, padding:"14px 16px", marginBottom:20 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:12 }}>
                <span style={{ color:T.sub }}>URL</span>
                <span style={{ color:"#F59E0B", fontFamily:"monospace" }}>dubairovers.com/{seo.slug || "page"}</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginTop:6 }}>
                <span style={{ color:T.sub }}>Blocks</span>
                <span style={{ color:"#fff" }}>{blocks.length} blocks</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginTop:6 }}>
                <span style={{ color:T.sub }}>SEO Score</span>
                <span style={{ color:calcSeoScore(seo,blocks)>=70?"#10B981":"#F59E0B" }}>{calcSeoScore(seo,blocks)}/100</span>
              </div>
            </div>
            {calcSeoScore(seo,blocks) < 60 && (
              <div style={{ background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:8, padding:"10px 14px", marginBottom:16, fontSize:12, color:"rgba(245,158,11,0.9)" }}>
                ⚠️ SEO score is low ({calcSeoScore(seo,blocks)}/100). Add a meta title, meta description and H1 heading for best results.
              </div>
            )}
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => setShowPublishModal(false)}
                style={{ flex:1, padding:"12px", background:"transparent", border:`1px solid ${T.cardBorder}`, borderRadius:10, color:T.sub, fontSize:13, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
                Cancel
              </button>
              <button onClick={publish}
                style={{ flex:2, padding:"12px", background:"linear-gradient(135deg,#F59E0B,#D97706)", border:"none", borderRadius:10, color:"#000", fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
                🚀 Publish Live Now
              </button>
            </div>
          </div>
        </div>
      )}

      {notif && (
        <div style={{ position:"fixed", top:16, right:16, zIndex:9999, padding:"11px 18px", borderRadius:10, fontSize:13, fontWeight:600, background:"rgba(16,185,129,0.95)", color:"#fff", boxShadow:"0 8px 28px rgba(0,0,0,0.4)", animation:"ni 0.25s ease" }}>
          {notif}
        </div>
      )}
    </div>
  )
}
