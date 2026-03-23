"use client"
import { useState, useRef, useEffect, useCallback } from "react"

const PAGES = [
  { label:"🏠 Homepage",         path:"/" },
  { label:"🏜️ Desert Safari",   path:"/desert-safari-dubai" },
  { label:"🎈 Hot Air Balloon",  path:"/hot-air-balloon-dubai" },
  { label:"⛵ Dhow Cruise",      path:"/dhow-cruise-dubai" },
  { label:"🚵 Quad Bike",        path:"/quad-bike-dubai" },
  { label:"🐪 Camel Riding",     path:"/camel-riding-dubai" },
  { label:"🏙️ City Tour",       path:"/private-city-tour-dubai" },
  { label:"📝 Blog",             path:"/blog" },
  { label:"📞 Contact",          path:"/contact" },
  { label:"ℹ️ About",            path:"/about" },
  { label:"👤 Client Portal",    path:"/client" },
]

const TOUR_SLUGS = [
  { slug:"desert-safari-dubai",    label:"🏜️ Desert Safari",   name:"Desert Safari Dubai",   keywords:"desert safari dunes camel Dubai" },
  { slug:"quad-bike-dubai",        label:"🚵 Quad Bike",         name:"Quad Bike Dubai",        keywords:"quad bike ATV dunes adventure Dubai" },
  { slug:"dhow-cruise-dubai",      label:"⛵ Dhow Cruise",       name:"Dhow Cruise Dubai",      keywords:"dhow cruise marina creek sunset Dubai" },
  { slug:"hot-air-balloon-dubai",  label:"🎈 Hot Air Balloon",  name:"Hot Air Balloon Dubai",  keywords:"hot air balloon sunrise aerial view Dubai" },
  { slug:"camel-riding-dubai",     label:"🐪 Camel Riding",     name:"Camel Riding Dubai",     keywords:"camel riding desert experience Dubai" },
  { slug:"private-city-tour-dubai",label:"🏙️ City Tour",        name:"Private City Tour Dubai",keywords:"city tour Burj Khalifa skyline Dubai" },
]

const DEFAULT_HERO_SLIDES = [
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1800&q=80",
  "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1800&q=80",
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1800&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1800&q=80",
  "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1800&q=80",
  "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1800&q=80",
]

const DEFAULT_TOUR_SLIDES = {
  "desert-safari-dubai":     ["https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1600&q=80","https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?w=1600&q=80","https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1600&q=80"],
  "quad-bike-dubai":         ["https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1600&q=80","https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1600&q=80"],
  "dhow-cruise-dubai":       ["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80","https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600&q=80"],
  "hot-air-balloon-dubai":   ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80","https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?w=1600&q=80"],
  "camel-riding-dubai":      ["https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1600&q=80","https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1600&q=80"],
  "private-city-tour-dubai": ["https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600&q=80","https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80"],
}

const DEFAULT_CARD_IMAGES = {
  "desert-safari-dubai":     "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
  "quad-bike-dubai":         "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=800&q=80",
  "dhow-cruise-dubai":       "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
  "hot-air-balloon-dubai":   "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  "camel-riding-dubai":      "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&q=80",
  "private-city-tour-dubai": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80",
}

const FLYER_TEMPLATES = [
  { id:"summer",  label:"☀️ Summer Deal",  bg:"linear-gradient(135deg,#FF6B35,#F7931E)", accent:"#fff" },
  { id:"luxury",  label:"👑 Luxury",        bg:"linear-gradient(135deg,#0A0A0F,#1A1A2E)", accent:"#F59E0B" },
  { id:"family",  label:"👨‍👩‍👧 Family",     bg:"linear-gradient(135deg,#11998E,#38EF7D)", accent:"#fff" },
  { id:"weekend", label:"🌙 Weekend",        bg:"linear-gradient(135deg,#141E30,#243B55)", accent:"#F59E0B" },
  { id:"vip",     label:"💎 VIP",            bg:"linear-gradient(135deg,#2C1654,#8B5CF6)", accent:"#FFD700" },
  { id:"flash",   label:"⚡ Flash Sale",    bg:"linear-gradient(135deg,#C0392B,#8E44AD)", accent:"#fff" },
]

const SECTION_BLOCKS = [
  { id:"hero",       icon:"🖼️", label:"Hero Banner",      desc:"Full-width hero with title, subtitle, CTA button" },
  { id:"toursgrid",  icon:"🗂️", label:"Tours Grid",       desc:"3-column tour cards with image, price, book button" },
  { id:"cta",        icon:"📣", label:"Call to Action",   desc:"Bold CTA section with WhatsApp button" },
  { id:"features",   icon:"✅", label:"Features / Why Us",desc:"6 icon feature cards (pickup, safety, guides...)" },
  { id:"testimonial",icon:"⭐", label:"Reviews",          desc:"3-column guest review cards with rating stars" },
  { id:"faq",        icon:"❓", label:"FAQ Section",      desc:"Expandable FAQ accordion" },
  { id:"gallery",    icon:"📸", label:"Photo Gallery",    desc:"Masonry image gallery grid" },
  { id:"mapcontact", icon:"📍", label:"Map + Contact",    desc:"Google Maps embed + contact details side by side" },
  { id:"pricing",    icon:"💰", label:"Pricing Table",    desc:"3-tier pricing cards (Basic / Standard / Premium)" },
  { id:"countdown",  icon:"⏰", label:"Countdown Timer",  desc:"Urgency countdown for limited-time deals" },
  { id:"whatsapp",   icon:"💬", label:"WhatsApp Float",   desc:"Fixed floating WhatsApp button (bottom right)" },
  { id:"divider",    icon:"〰️", label:"Section Divider",  desc:"Decorative wave/line divider between sections" },
]

const INJECT = `
(function(){
  if(window.__DR_EDIT)return;window.__DR_EDIT=true;
  var s=document.createElement('style');
  s.textContent='.__e{cursor:pointer!important;position:relative!important;transition:outline .1s!important;}.__e:hover{outline:2px dashed rgba(245,158,11,.75)!important;outline-offset:3px!important;}.__e:hover::before{content:attr(data-lbl);position:absolute;top:-22px;left:0;z-index:2147483647;background:#F59E0B;color:#000;font-size:10px;font-weight:700;padding:2px 8px;border-radius:3px;white-space:nowrap;font-family:Arial,sans-serif;pointer-events:none;}.__sel{outline:2.5px solid #F59E0B!important;outline-offset:3px!important;}#__drbdg{position:fixed;top:8px;left:50%;transform:translateX(-50%);z-index:2147483647;background:rgba(245,158,11,.96);color:#000;font-size:11px;font-weight:700;padding:5px 16px;border-radius:20px;font-family:Arial,sans-serif;pointer-events:none;box-shadow:0 3px 12px rgba(0,0,0,.3);}';
  document.head.appendChild(s);
  var b=document.createElement('div');b.id='__drbdg';b.textContent='✏️ EDIT MODE — Click any element';document.body.appendChild(b);
  function sel(el){var path=[];var c=el;for(var d=0;d<6&&c&&c.tagName&&c!==document.documentElement;d++){var tag=c.tagName.toLowerCase();var par=c.parentElement;if(!par){path.unshift(tag);break;}var sibs=Array.from(par.children).filter(function(x){return x.tagName===c.tagName;});path.unshift(sibs.length>1?tag+':nth-of-type('+(sibs.indexOf(c)+1)+')':tag);c=par;}return path.join(' > ');}
  function hasBg(el){var bg=window.getComputedStyle(el).backgroundImage;return bg&&bg!=='none'&&bg.startsWith('url');}
  function getBg(el){return window.getComputedStyle(el).backgroundImage.replace(/url\(["']?([^"')]+)["']?\).*/,'$1');}
  function type(el){var t=el.tagName.toLowerCase();if(t==='img')return'image';if(hasBg(el))return'bgimage';if(t==='a')return'link';if(t.match(/^h[1-6]$/))return'heading';if((t==='p'||t==='span'||t==='div'||t==='li'||t==='button')&&el.textContent.trim().length>0&&el.children.length<3)return'text';return null;}
  var L={image:'📷 Image',bgimage:'🖼️ BG Image',link:'🔗 Link',heading:'📝 Heading',text:'✏️ Text'};
  document.querySelectorAll('*').forEach(function(el){var t2=el.tagName.toLowerCase();if(['script','style','meta','noscript','html','body','head'].includes(t2))return;if(el.id==='__drbdg')return;var tp=type(el);if(!tp)return;el.classList.add('__e');el.setAttribute('data-lbl',L[tp]||'✏️');el.setAttribute('data-type',tp);el.setAttribute('data-sel',sel(el));});
  document.addEventListener('click',function(e){var el=e.target.closest('.__e');if(!el)return;e.preventDefault();e.stopPropagation();document.querySelectorAll('.__sel').forEach(function(x){x.classList.remove('__sel');});el.classList.add('__sel');var tp=el.getAttribute('data-type');var cs=window.getComputedStyle(el);window.parent.postMessage({type:'DR_SELECT',editType:tp,tag:el.tagName,selector:el.getAttribute('data-sel'),styles:{color:el.style.color||cs.color,background:el.style.background||cs.backgroundColor,fontSize:el.style.fontSize||cs.fontSize,fontWeight:el.style.fontWeight||cs.fontWeight,padding:el.style.padding||cs.padding,margin:el.style.margin||cs.margin,borderRadius:el.style.borderRadius||cs.borderRadius,textAlign:el.style.textAlign||cs.textAlign,lineHeight:el.style.lineHeight||cs.lineHeight,opacity:el.style.opacity||cs.opacity},src:tp==='image'?el.src:tp==='bgimage'?getBg(el):'',alt:tp==='image'?el.alt:'',text:el.textContent.trim(),href:tp==='link'?el.href:''},'*');window.__selEl=el;},true);
  window.addEventListener('message',function(e){var el=window.__selEl;if(!el)return;if(e.data.type==='DR_TEXT')el.textContent=e.data.v;if(e.data.type==='DR_IMAGE'){el.src=e.data.v;if(e.data.alt)el.alt=e.data.alt;}if(e.data.type==='DR_BGIMAGE'){el.style.backgroundImage='url('+e.data.v+')';el.style.backgroundSize='cover';el.style.backgroundPosition='center';}if(e.data.type==='DR_HREF')el.href=e.data.v;if(e.data.type==='DR_STYLE')Object.assign(el.style,e.data.styles||{});if(e.data.type==='DR_CLEAR'){document.querySelectorAll('.__sel').forEach(function(x){x.classList.remove('__sel');});window.__selEl=null;}});
})();`

const SF = [
  {k:"color",l:"Text Color",t:"color"},{k:"background",l:"Background",t:"color"},
  {k:"fontSize",l:"Font Size",t:"text",p:"16px"},{k:"fontWeight",l:"Weight",t:"sel",o:["300","400","500","600","700","800"]},
  {k:"textAlign",l:"Align",t:"sel",o:["left","center","right","justify"]},
  {k:"lineHeight",l:"Line Height",t:"text",p:"1.6"},{k:"borderRadius",l:"Radius",t:"text",p:"8px"},
  {k:"padding",l:"Padding",t:"text",p:"12px 20px",f:1},{k:"margin",l:"Margin",t:"text",p:"0",f:1},{k:"opacity",l:"Opacity",t:"text",p:"1"},
]

// ─── FREE WebP converter + SEO alt generator (no API needed) ─────────────────
function convertToWebP(file, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      reject(new Error("Not a valid image file")); return
    }
    const reader = new FileReader()
    reader.onerror = () => reject(new Error("Could not read file"))
    reader.onload = (e) => {
      const dataURL = e.target?.result
      if (!dataURL) { reject(new Error("File read returned empty")); return }
      const img = new Image()
      img.onerror = () => reject(new Error("Could not load image — try a different file"))
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas")
          // Cap resolution at 1920px wide to keep file sizes sane
          const maxW = 1920
          let w = img.width, h = img.height
          if (w > maxW) { h = Math.round(h * maxW / w); w = maxW }
          canvas.width = w
          canvas.height = h
          const ctx = canvas.getContext("2d")
          if (!ctx) { reject(new Error("Canvas not supported in this browser")); return }
          ctx.drawImage(img, 0, 0, w, h)

          // Try WebP first, fall back to JPEG if browser doesn't support WebP encoding
          const tryMime = canvas.toDataURL("image/webp").startsWith("data:image/webp")
          const mime = tryMime ? "image/webp" : "image/jpeg"
          const label = tryMime ? "WebP" : "JPEG"

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                // Last resort: use the dataURL directly from canvas
                const fallbackDataUrl = canvas.toDataURL(mime, quality)
                const approxSize = Math.round(fallbackDataUrl.length * 0.75)
                resolve({
                  dataUrl: fallbackDataUrl,
                  blob: null,
                  width: w, height: h,
                  originalSize: file.size,
                  webpSize: approxSize,
                  saving: Math.max(0, Math.round((1 - approxSize / file.size) * 100)),
                  format: label,
                })
                return
              }
              const reader2 = new FileReader()
              reader2.onerror = () => reject(new Error("Could not read converted image"))
              reader2.onload = (e2) => resolve({
                dataUrl: e2.target.result,
                blob,
                width: w, height: h,
                originalSize: file.size,
                webpSize: blob.size,
                saving: Math.max(0, Math.round((1 - blob.size / file.size) * 100)),
                format: label,
              })
              reader2.readAsDataURL(blob)
            },
            mime,
            quality
          )
        } catch(err) {
          reject(new Error("Conversion error: " + (err.message || "unknown")))
        }
      }
      img.src = dataURL
    }
    reader.readAsDataURL(file)
  })
}

// ─── Smart free ALT text generator based on context ──────────────────────────
function generateAltText(filename, context) {
  // Clean filename — remove extension, timestamps, camera prefixes
  const name = (filename || "")
    .replace(/\.[^.]+$/, "")              // remove extension
    .replace(/[-_]/g, " ")               // dashes/underscores to spaces
    .replace(/\b\d{4,}\b/g, "")          // remove long numbers (timestamps like 1774020403510)
    .replace(/\b(IMG|DSC|photo|image|pic|screenshot|file)\b/gi, "") // camera prefixes
    .replace(/\s+/g, " ")                // collapse multiple spaces
    .trim()

  const tourInfo = TOUR_SLUGS.find(t => t.slug === context.tourSlug)
  const tourName = tourInfo?.name || "Dubai Desert Safari"
  const keywords = tourInfo?.keywords || "Dubai adventure tour experience"
  const tab = context.imgTab  // will always be "hero" | "cards" | "tours" — never "upload"

  // Always build a meaningful alt — use name if available, else use tour context
  if (tab === "hero") {
    return name
      ? `${name} - Dubai Adventure Experience | Dubai Rovers`
      : `${tourName} - Stunning Dubai Landscape Hero Background | Dubai Rovers`
  } else if (tab === "cards") {
    return name
      ? `${name} - ${tourName} | Book from AED 149 | Dubai Rovers`
      : `${tourName} - ${keywords} | Dubai Rovers Tours`
  } else {
    // tours
    return name
      ? `${name} - ${tourName} Dubai Experience | Dubai Rovers`
      : `${tourName} - Hero Image | ${keywords} | Dubai Rovers`
  }
}

// ─── Auto Schema ImageObject generator ───────────────────────────────────────
function generateSchema(altText, dataUrl, width, height, context) {
  const url = `https://dubairovers.com/images/${altText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.webp`
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "name": altText,
    "description": altText,
    "url": url,
    "width": width,
    "height": height,
    "encodingFormat": "image/webp",
    "contentUrl": url,
    "creator": {
      "@type": "Organization",
      "name": "Dubai Rovers",
      "url": "https://dubairovers.com"
    }
  }, null, 2)
}

export default function VisualEditor() {
  const iframeRef = useRef(null)
  const uploadRef = useRef(null)

  const [page,    setPage]    = useState("/")
  const [tool,    setTool]    = useState("edit")
  const [sel,     setSel]     = useState(null)
  const [text,    setText]    = useState("")
  const [href,    setHref]    = useState("")
  const [imgSrc,  setImgSrc]  = useState("")
  const [imgAlt,  setImgAlt]  = useState("")
  const [bgSrc,   setBgSrc]   = useState("")
  const [styles,  setStyles]  = useState({})
  const [panel,   setPanel]   = useState("content")
  const [loading, setLoading] = useState(true)
  const [saves,   setSaves]   = useState([])
  const [notif,   setNotif]   = useState(null)
  const [view,    setView]    = useState("desktop")
  const [zoom,    setZoom]    = useState(100)
  const [flyerT,  setFlyerT]  = useState(FLYER_TEMPLATES[0])
  const [flyerD,  setFlyerD]  = useState({ title:"🔥 Limited Time Offer!", subtitle:"Dubai Desert Safari", discount:"30% OFF", price:"AED 149", oldPrice:"AED 199", cta:"Book Now", phone:"+971 54 473 5060", validity:"Valid until March 31, 2025", image:"https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80" })
  const [pageBlocks, setPageBlocks] = useState([])
  const [linkTarget, setLinkTarget] = useState("/")

  // ── IMAGE MANAGER STATE ──
  const [imgTab,     setImgTab]     = useState("hero")
  const [heroSlides, setHeroSlides] = useState([...DEFAULT_HERO_SLIDES])
  const [cardImages, setCardImages] = useState({...DEFAULT_CARD_IMAGES})
  const [tourSlides, setTourSlides] = useState({...DEFAULT_TOUR_SLIDES})
  const [activeTour, setActiveTour] = useState("desert-safari-dubai")
  const [newHeroUrl, setNewHeroUrl] = useState("")
  const [newCardUrl, setNewCardUrl] = useState("")
  const [newTourUrl, setNewTourUrl] = useState("")
  const [imgSaved,   setImgSaved]   = useState(false)

  // ── UPLOAD / CONVERT STATE ──
  const [uploading,    setUploading]    = useState(false)
  const [converted,    setConverted]    = useState(null)
  const [genAlt,       setGenAlt]       = useState("")
  const [genSchema,    setGenSchema]    = useState("")
  const [showSchema,   setShowSchema]   = useState(false)
  const [webpQuality,  setWebpQuality]  = useState(82)
  const [copied,       setCopied]       = useState("")
  // uploadDest is SEPARATE from imgTab so it stays valid when imgTab="upload"
  const [uploadDest,   setUploadDest]   = useState("hero")  // "hero" | "cards" | "tours"

  const toast = (msg, ok=true) => { setNotif({msg,ok}); setTimeout(()=>setNotif(null),3500) }

  useEffect(() => {
    try {
      const h = JSON.parse(localStorage.getItem("dr_hero_slides") || "null")
      if (h && h.length > 0) setHeroSlides(h)
      const c = JSON.parse(localStorage.getItem("dr_card_images") || "null")
      if (c) setCardImages(prev => ({...prev, ...c}))
      const t = JSON.parse(localStorage.getItem("dr_tour_slides") || "null")
      if (t) setTourSlides(prev => ({...prev, ...t}))
    } catch {}
  }, [])

  const inject = useCallback(() => {
    const f = iframeRef.current; if(!f) return
    try {
      const doc = f.contentDocument || f.contentWindow?.document; if(!doc) return
      const sc = doc.createElement("script"); sc.textContent = INJECT; doc.body.appendChild(sc)
      setLoading(false)
    } catch { setLoading(false) }
  },[])

  useEffect(() => {
    const h = (e) => {
      if (e.data?.type === "DR_SELECT") {
        setSel(e.data); setText(e.data.text||""); setHref(e.data.href||"")
        setImgSrc(e.data.src||""); setImgAlt(e.data.alt||""); setBgSrc(e.data.src||"")
        setStyles(e.data.styles||{}); setPanel("content")
      }
    }
    window.addEventListener("message", h)
    return () => window.removeEventListener("message", h)
  },[])

  const send = (type, data) => iframeRef.current?.contentWindow?.postMessage({type,...data},"*")
  const loadPage = (p) => { setPage(p); setSel(null); setLoading(true) }
  const pageSaves = saves.filter(s=>s.page===page)

  // ── Handle file upload + convert ──
  const handleUpload = async (file) => {
    if (!file) return
    if (!file.type.startsWith("image/")) { toast("❌ Please select an image file", false); return }
    setUploading(true)
    setConverted(null)
    setGenAlt("")
    setGenSchema("")
    try {
      const result = await convertToWebP(file, webpQuality / 100)
      setConverted(result)

      // Generate ALT — always use uploadDest (never "upload"), always produce non-empty string
      const context = { imgTab: uploadDest, tourSlug: activeTour }
      const alt = generateAltText(file.name, context)
      setGenAlt(alt)

      // Generate Schema — always produce output
      const schema = generateSchema(alt, result.dataUrl, result.width, result.height, context)
      setGenSchema(schema)

      toast(`✅ Converted! Saved ${result.saving}% — ${result.format || "WebP"} ready`)
    } catch(e) {
      toast("❌ Conversion failed: " + e.message, false)
    }
    setUploading(false)
  }

  // ── Add converted image to chosen destination ──
  const useConvertedImage = () => {
    if (!converted) return
    const dataUrl = converted.dataUrl
    if (uploadDest === "hero") {
      setHeroSlides(s => [...s, dataUrl])
      toast("✅ Added to Hero Slideshow!")
    } else if (uploadDest === "cards") {
      setCardImages(prev => ({...prev, [activeTour]: dataUrl}))
      toast("✅ Set as Tour Card Image!")
    } else if (uploadDest === "tours") {
      setTourSlides(prev => ({...prev, [activeTour]: [...(prev[activeTour] || DEFAULT_TOUR_SLIDES[activeTour] || []), dataUrl]}))
      toast("✅ Added to Tour Hero Slides!")
    }
  }

  const saveImages = () => {
    try {
      localStorage.setItem("dr_hero_slides", JSON.stringify(heroSlides))
      localStorage.setItem("dr_card_images", JSON.stringify(cardImages))
      localStorage.setItem("dr_tour_slides", JSON.stringify(tourSlides))
      window.dispatchEvent(new StorageEvent("storage", { key:"dr_hero_slides" }))
      setImgSaved(true)
      setTimeout(() => setImgSaved(false), 2500)
      toast("✅ Images saved! Site updated automatically.")
    } catch(e) { toast("❌ Save failed: " + e.message, false) }
  }

  const resetImages = () => {
    setHeroSlides([...DEFAULT_HERO_SLIDES])
    setCardImages({...DEFAULT_CARD_IMAGES})
    setTourSlides({...DEFAULT_TOUR_SLIDES})
    localStorage.removeItem("dr_hero_slides")
    localStorage.removeItem("dr_card_images")
    localStorage.removeItem("dr_tour_slides")
    toast("🔄 All images reset to defaults.")
  }

  const copyText = (text, key) => {
    navigator.clipboard?.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(""), 2000)
  }

  const I = (ex={}) => ({ width:"100%", padding:"8px 10px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:7, color:"#fff", fontSize:12, fontFamily:"'Outfit',sans-serif", boxSizing:"border-box", outline:"none", ...ex })
  const LB = { display:"block", fontSize:10, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }
  const W = { desktop:"100%", tablet:"768px", mobile:"390px" }
  const fmtSize = (bytes) => bytes > 1024*1024 ? (bytes/(1024*1024)).toFixed(1)+"MB" : (bytes/1024).toFixed(0)+"KB"

  const TOOL_BTNS = [
    {id:"edit",    icon:"✏️", label:"Edit Elements"},
    {id:"builder", icon:"🧱", label:"Page Builder"},
    {id:"images",  icon:"🖼️", label:"Image Manager"},
    {id:"flyer",   icon:"🎨", label:"Flyer Creator"},
  ]

  const printFlyer = () => {
    const w = window.open("","_blank","width=600,height=900")
    w.document.write(`<!DOCTYPE html><html><head><title>Flyer</title><style>body{margin:0;font-family:sans-serif;}</style></head>
    <body><div style="width:500px;min-height:700px;background:${flyerT.bg};padding:40px;color:${flyerT.accent};text-align:center;">
    ${flyerD.image?`<div style="width:100%;height:200px;background:url(${flyerD.image}) center/cover;border-radius:12px;margin-bottom:20px;"></div>`:""}
    <div style="font-size:24px;font-weight:900;margin-bottom:8px;">${flyerD.title}</div>
    <div style="font-size:14px;opacity:0.8;margin-bottom:16px;">${flyerD.subtitle}</div>
    <div style="font-size:48px;font-weight:900;margin-bottom:8px;">${flyerD.discount}</div>
    <div style="font-size:22px;font-weight:700;margin-bottom:4px;">${flyerD.price} <span style="font-size:14px;text-decoration:line-through;opacity:0.5;">${flyerD.oldPrice}</span></div>
    <div style="display:inline-block;margin-top:16px;padding:10px 28px;background:${flyerT.accent};color:#000;border-radius:25px;font-size:15px;font-weight:800;">${flyerD.cta}</div>
    <div style="margin-top:16px;font-size:13px;opacity:0.7;">${flyerD.phone}</div>
    <div style="font-size:11px;opacity:0.4;margin-top:6px;">${flyerD.validity}</div>
    </div></body></html>`)
    w.document.close(); w.print()
  }

  const imgRowStyle = { display:"flex", gap:8, alignItems:"center", marginBottom:8, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:8, padding:"8px 10px" }
  const btnStyle = (color="#F59E0B", bg="rgba(245,158,11,0.15)") => ({ padding:"7px 12px", background:bg, border:`1px solid ${color}40`, borderRadius:7, color, fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif" })

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100vh", background:"#0a0a0a", color:"#fff", fontFamily:"'Outfit',sans-serif", overflow:"hidden" }}>

      {/* ── TOP BAR ── */}
      <div style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 14px", background:"#111", borderBottom:"1px solid rgba(255,255,255,0.08)", flexShrink:0, flexWrap:"wrap" }}>
        <div style={{ fontFamily:"serif", fontSize:16, color:"#F59E0B", fontWeight:700, marginRight:4, whiteSpace:"nowrap" }}>🧩 Visual Editor</div>

        {TOOL_BTNS.map(b => (
          <button key={b.id} onClick={()=>setTool(b.id)}
            style={{ display:"flex", alignItems:"center", gap:5, padding:"6px 13px", borderRadius:8, border:"none", background:tool===b.id?"rgba(245,158,11,0.18)":"rgba(255,255,255,0.04)", color:tool===b.id?"#F59E0B":"rgba(255,255,255,0.5)", fontSize:12, fontWeight:tool===b.id?700:400, cursor:"pointer", fontFamily:"'Outfit',sans-serif", whiteSpace:"nowrap" }}>
            {b.icon} {b.label}
          </button>
        ))}

        <select value={page} onChange={e=>loadPage(e.target.value)}
          style={{ padding:"6px 10px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#fff", fontSize:12, fontFamily:"'Outfit',sans-serif", maxWidth:170, cursor:"pointer" }}>
          {PAGES.map(p=><option key={p.path} value={p.path}>{p.label}</option>)}
        </select>

        <div style={{ display:"flex", gap:4, marginLeft:"auto" }}>
          {["desktop","tablet","mobile"].map(v=>(
            <button key={v} onClick={()=>setView(v)}
              style={{ padding:"5px 10px", borderRadius:7, border:"none", background:view===v?"rgba(245,158,11,0.2)":"rgba(255,255,255,0.04)", color:view===v?"#F59E0B":"rgba(255,255,255,0.4)", fontSize:11, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
              {v==="desktop"?"🖥️":v==="tablet"?"📱":"📲"}
            </button>
          ))}
          <button onClick={()=>setZoom(z=>Math.max(50,z-10))} style={{ padding:"5px 8px", borderRadius:7, border:"none", background:"rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.4)", fontSize:13, cursor:"pointer" }}>−</button>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)", padding:"5px 4px", minWidth:32, textAlign:"center" }}>{zoom}%</span>
          <button onClick={()=>setZoom(z=>Math.min(150,z+10))} style={{ padding:"5px 8px", borderRadius:7, border:"none", background:"rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.4)", fontSize:13, cursor:"pointer" }}>+</button>
        </div>

        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:4, fontSize:11, color:"#10B981" }}><div style={{ width:6,height:6,borderRadius:"50%",background:"#10B981" }}/>Live</div>
          <button onClick={()=>window.location.href="/"} style={{ padding:"5px 12px", borderRadius:7, border:"1px solid rgba(239,68,68,0.3)", background:"rgba(239,68,68,0.1)", color:"#ef4444", fontSize:11, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>✕ Exit</button>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>

        {/* ── PREVIEW / CENTER ── */}
        <div style={{ flex:1, overflow:"auto", background:"#1a1a1a", display:"flex", alignItems:"flex-start", justifyContent:"center", padding:tool==="images"?0:16 }}>
          {tool === "images" ? (
            <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:20, padding:40 }}>
              <div style={{ fontSize:64 }}>🖼️</div>
              <div style={{ fontSize:22, fontWeight:800, color:"#F59E0B" }}>Image Manager</div>
              <div style={{ fontSize:14, color:"rgba(255,255,255,0.4)", textAlign:"center", maxWidth:440, lineHeight:1.7 }}>
                Upload your own photos OR paste image URLs.<br/>
                All photos are <strong style={{color:"#10B981"}}>auto-converted to WebP</strong> — smaller file, same quality.<br/>
                SEO alt text & schema are generated <strong style={{color:"#F59E0B"}}>automatically</strong>.
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, marginTop:4 }}>
                {[
                  {icon:"📸", title:"Upload & Convert", desc:"Upload any photo → auto WebP conversion → 60-80% smaller"},
                  {icon:"🔤", title:"Auto Alt Text", desc:"SEO alt text generated automatically from filename + context"},
                  {icon:"📋", title:"Auto Schema", desc:"ImageObject JSON-LD schema generated for Google SEO"},
                ].map(c => (
                  <div key={c.title} style={{ background:"rgba(245,158,11,0.07)", border:"1px solid rgba(245,158,11,0.18)", borderRadius:14, padding:"20px 18px", textAlign:"center" }}>
                    <div style={{ fontSize:32, marginBottom:8 }}>{c.icon}</div>
                    <div style={{ fontSize:13, fontWeight:700, color:"#F59E0B", marginBottom:4 }}>{c.title}</div>
                    <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", lineHeight:1.6 }}>{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ width:W[view], transform:`scale(${zoom/100})`, transformOrigin:"top center", transition:"width 0.3s", flexShrink:0 }}>
              {loading && <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", color:"rgba(255,255,255,0.3)", fontSize:13 }}>Loading...</div>}
              <iframe ref={iframeRef} src={page} onLoad={inject}
                style={{ width:"100%", height:"85vh", border:"none", borderRadius:10, display:"block" }} title="Preview" />
            </div>
          )}
        </div>

        {/* ── EDIT PANEL ── */}
        {tool==="edit" && sel && (
          <div style={{ width:300, background:"#111", borderLeft:"1px solid rgba(255,255,255,0.07)", overflow:"auto", flexShrink:0 }}>
            <div style={{ padding:"11px 14px", borderBottom:"1px solid rgba(255,255,255,0.07)", display:"flex", gap:6 }}>
              {["content","style"].map(p=>(
                <button key={p} onClick={()=>setPanel(p)} style={{ flex:1, padding:"6px", borderRadius:7, border:"none", background:panel===p?"rgba(245,158,11,0.18)":"rgba(255,255,255,0.04)", color:panel===p?"#F59E0B":"rgba(255,255,255,0.4)", fontSize:11, fontWeight:panel===p?700:400, cursor:"pointer", fontFamily:"'Outfit',sans-serif", textTransform:"capitalize" }}>
                  {p==="content"?"📝 Content":"🎨 Style"}
                </button>
              ))}
            </div>
            <div style={{ padding:13 }}>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.25)", marginBottom:10, display:"flex", alignItems:"center", gap:5 }}>
                <span style={{ background:"rgba(245,158,11,0.15)", color:"#F59E0B", padding:"2px 7px", borderRadius:4, fontSize:10, fontWeight:700 }}>{sel.editType?.toUpperCase()}</span>
                <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{sel.tag?.toLowerCase()}</span>
              </div>
              {panel==="content" && (
                <>
                  {(sel.editType==="text"||sel.editType==="heading") && (
                    <div style={{ marginBottom:12 }}>
                      <label style={LB}>Content</label>
                      <textarea value={text} onChange={e=>setText(e.target.value)} style={{ ...I(), minHeight:72, resize:"vertical", lineHeight:1.5 }} />
                      <button onClick={()=>send("DR_TEXT",{v:text})} style={{ ...btnStyle(), width:"100%", marginTop:7, padding:"8px" }}>Apply</button>
                    </div>
                  )}
                  {sel.editType==="image" && (
                    <div style={{ marginBottom:12 }}>
                      <label style={LB}>Image URL</label>
                      <input value={imgSrc} onChange={e=>setImgSrc(e.target.value)} style={I({marginBottom:6})} placeholder="https://..." />
                      <label style={LB}>Alt Text</label>
                      <input value={imgAlt} onChange={e=>setImgAlt(e.target.value)} style={I({marginBottom:8})} />
                      {imgSrc && <img src={imgSrc} alt="" style={{ width:"100%", height:80, objectFit:"cover", borderRadius:6, marginBottom:8 }} onError={e=>e.target.style.display="none"} />}
                      <button onClick={()=>send("DR_IMAGE",{v:imgSrc,alt:imgAlt})} style={{ ...btnStyle(), width:"100%", padding:"8px" }}>Apply Image</button>
                    </div>
                  )}
                  {sel.editType==="bgimage" && (
                    <div style={{ marginBottom:12 }}>
                      <label style={LB}>Background Image URL</label>
                      <input value={bgSrc} onChange={e=>setBgSrc(e.target.value)} style={I({marginBottom:8})} placeholder="https://..." />
                      {bgSrc && <img src={bgSrc} alt="" style={{ width:"100%", height:80, objectFit:"cover", borderRadius:6, marginBottom:8 }} onError={e=>e.target.style.display="none"} />}
                      <button onClick={()=>send("DR_BGIMAGE",{v:bgSrc})} style={{ ...btnStyle(), width:"100%", padding:"8px" }}>Apply BG Image</button>
                    </div>
                  )}
                  {sel.editType==="link" && (
                    <div style={{ marginBottom:12 }}>
                      <label style={LB}>Link Text</label>
                      <input value={text} onChange={e=>setText(e.target.value)} style={I({marginBottom:6})} />
                      <label style={LB}>Link URL</label>
                      <select value={linkTarget} onChange={e=>setLinkTarget(e.target.value)} style={I({marginBottom:6})}>
                        {PAGES.map(p=><option key={p.path} value={p.path}>{p.label} — {p.path}</option>)}
                      </select>
                      <input value={href} onChange={e=>setHref(e.target.value)} style={I({marginBottom:8})} placeholder="Or type custom URL..." />
                      <button onClick={()=>{send("DR_TEXT",{v:text});send("DR_HREF",{v:href||linkTarget})}} style={{ ...btnStyle(), width:"100%", padding:"8px" }}>Apply Link</button>
                    </div>
                  )}
                </>
              )}
              {panel==="style" && (
                <div>
                  {SF.map(f=>(
                    <div key={f.k} style={{ marginBottom:10 }}>
                      <label style={LB}>{f.l}</label>
                      {f.t==="sel"
                        ? <select value={styles[f.k]||""} onChange={e=>{const s={...styles,[f.k]:e.target.value};setStyles(s);send("DR_STYLE",{styles:s})}} style={I()}>
                            {f.o.map(o=><option key={o} value={o}>{o}</option>)}
                          </select>
                        : <input type={f.t} value={styles[f.k]||""} onChange={e=>{const s={...styles,[f.k]:e.target.value};setStyles(s);send("DR_STYLE",{styles:s})}} placeholder={f.p} style={I()} />
                      }
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {tool==="edit"&&!sel&&(
          <div style={{ width:280, padding:20, background:"#111", borderLeft:"1px solid rgba(255,255,255,0.07)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", textAlign:"center" }}>
            <div style={{ fontSize:36,marginBottom:12,opacity:0.15 }}>✏️</div>
            <div style={{ fontSize:12,color:"rgba(255,255,255,0.2)",lineHeight:1.7 }}>Click any element on the preview to start editing</div>
            <div style={{ marginTop:12,padding:10,background:"rgba(245,158,11,0.05)",border:"1px solid rgba(245,158,11,0.12)",borderRadius:8,width:"100%",textAlign:"left" }}>
              <div style={{ fontSize:10,color:"#F59E0B",fontWeight:600,marginBottom:3 }}>💡 To change images</div>
              <div style={{ fontSize:10,color:"rgba(255,255,255,0.3)",lineHeight:1.6 }}>Use the 🖼️ Image Manager tab to upload photos or paste URLs.</div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────
            🖼️ IMAGE MANAGER PANEL — Full featured with upload
        ───────────────────────────────────────────────────────── */}
        {tool==="images" && (
          <div style={{ width:400, background:"#111", borderLeft:"1px solid rgba(255,255,255,0.07)", overflow:"auto", flexShrink:0, display:"flex", flexDirection:"column" }}>

            {/* Header */}
            <div style={{ padding:"14px 16px", borderBottom:"1px solid rgba(255,255,255,0.07)", flexShrink:0 }}>
              <div style={{ fontSize:15, fontWeight:800, color:"#F59E0B", marginBottom:2 }}>🖼️ Image Manager</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)" }}>Upload photos or paste URLs · Auto WebP · Auto SEO Alt</div>
            </div>

            {/* Sub-tabs */}
            <div style={{ display:"flex", borderBottom:"1px solid rgba(255,255,255,0.07)", flexShrink:0 }}>
              {[
                {id:"hero",   label:"🏠 Hero"},
                {id:"cards",  label:"🗂️ Cards"},
                {id:"tours",  label:"🏜️ Tour Hero"},
                {id:"upload", label:"📸 Upload"},
              ].map(t=>(
                <button key={t.id} onClick={()=>setImgTab(t.id)}
                  style={{ flex:1, padding:"10px 4px", border:"none", borderBottom: imgTab===t.id ? "2px solid #F59E0B":"2px solid transparent", background: imgTab==="upload"&&t.id==="upload" ? "rgba(245,158,11,0.06)" :"transparent", color: imgTab===t.id ? "#F59E0B":"rgba(255,255,255,0.35)", fontSize:11, fontWeight: imgTab===t.id ? 700:400, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
                  {t.label}
                </button>
              ))}
            </div>

            <div style={{ padding:14, flex:1, overflow:"auto" }}>

              {/* ── 📸 UPLOAD TAB ── */}
              {imgTab==="upload" && (
                <div>
                  {/* Context selector */}
                  <div style={{ marginBottom:14, padding:"10px 12px", background:"rgba(245,158,11,0.06)", border:"1px solid rgba(245,158,11,0.15)", borderRadius:10 }}>
                    <div style={{ fontSize:10, color:"#F59E0B", fontWeight:700, marginBottom:8 }}>WHERE WILL THIS IMAGE GO?</div>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:8 }}>
                      {[
                        {id:"hero",  label:"🏠 Hero Slides"},
                        {id:"cards", label:"🗂️ Tour Cards"},
                        {id:"tours", label:"🏜️ Tour Hero"},
                      ].map(t=>(
                        <button key={t.id} onClick={()=>setUploadDest(t.id)}
                          style={{ padding:"6px 12px", borderRadius:20, border:"none",
                            background: uploadDest===t.id ? "rgba(245,158,11,0.3)":"rgba(255,255,255,0.07)",
                            color: uploadDest===t.id ? "#F59E0B":"rgba(255,255,255,0.6)",
                            fontSize:11, cursor:"pointer", fontFamily:"'Outfit',sans-serif",
                            fontWeight: uploadDest===t.id ? 700:400,
                            outline: uploadDest===t.id ? "1px solid rgba(245,158,11,0.5)":"none"
                          }}>
                          {t.label}
                        </button>
                      ))}
                    </div>
                    <div style={{ fontSize:10, color:"rgba(255,255,255,0.35)" }}>
                      Selected: <strong style={{color:"#F59E0B"}}>{uploadDest==="hero"?"Hero Slideshow":uploadDest==="cards"?"Tour Card Image":"Tour Hero Slides"}</strong>
                      {(uploadDest==="cards"||uploadDest==="tours") && <span style={{color:"rgba(255,255,255,0.3)"}}> → {TOUR_SLUGS.find(t=>t.slug===activeTour)?.label}</span>}
                    </div>
                  </div>

                  {/* Quality slider */}
                  <div style={{ marginBottom:14 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                      <label style={LB}>WebP Quality</label>
                      <span style={{ fontSize:11, color:"#F59E0B", fontWeight:700 }}>{webpQuality}%</span>
                    </div>
                    <input type="range" min="50" max="95" value={webpQuality} onChange={e=>setWebpQuality(Number(e.target.value))}
                      style={{ width:"100%", accentColor:"#F59E0B" }} />
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"rgba(255,255,255,0.25)", marginTop:3 }}>
                      <span>50% = smaller file</span>
                      <span>82% = recommended</span>
                      <span>95% = near lossless</span>
                    </div>
                  </div>

                  {/* Upload drop zone */}
                  <div
                    onClick={()=>uploadRef.current?.click()}
                    onDragOver={e=>e.preventDefault()}
                    onDrop={e=>{ e.preventDefault(); const f=e.dataTransfer.files[0]; if(f) handleUpload(f) }}
                    style={{ border:"2px dashed rgba(245,158,11,0.4)", borderRadius:14, padding:"28px 20px", textAlign:"center", cursor:"pointer", background:"rgba(245,158,11,0.04)", marginBottom:14, transition:"all 0.2s" }}
                    onMouseEnter={e=>{e.currentTarget.style.background="rgba(245,158,11,0.1)";e.currentTarget.style.borderColor="rgba(245,158,11,0.7)"}}
                    onMouseLeave={e=>{e.currentTarget.style.background="rgba(245,158,11,0.04)";e.currentTarget.style.borderColor="rgba(245,158,11,0.4)"}}>
                    <div style={{ fontSize:40, marginBottom:10 }}>📸</div>
                    <div style={{ fontSize:14, fontWeight:700, color:"#F59E0B", marginBottom:4 }}>
                      {uploading ? "⏳ Converting to WebP..." : "Tap to upload or drag & drop"}
                    </div>
                    <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", lineHeight:1.6 }}>
                      JPG, PNG, HEIC from your mobile or PC<br/>
                      Auto-converted to WebP · SEO alt text generated
                    </div>
                    <input ref={uploadRef} type="file" accept="image/*" style={{ display:"none" }}
                      onChange={e=>{ const f=e.target.files?.[0]; if(f) handleUpload(f) }} />
                  </div>

                  {/* ── RESULT after conversion ── */}
                  {converted && (
                    <div>
                      {/* Preview + Stats */}
                      <div style={{ background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.25)", borderRadius:12, padding:14, marginBottom:12 }}>
                        <div style={{ display:"flex", gap:12, marginBottom:12 }}>
                          <img src={converted.dataUrl} alt="preview" style={{ width:90, height:65, objectFit:"cover", borderRadius:8, flexShrink:0 }} />
                          <div style={{ flex:1 }}>
                            <div style={{ fontSize:12, fontWeight:700, color:"#10B981", marginBottom:6 }}>✅ {converted.format || "WebP"} Converted!</div>
                            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4 }}>
                              {[
                                {l:"Original", v:fmtSize(converted.originalSize), c:"rgba(255,255,255,0.4)"},
                                {l:"WebP size", v:fmtSize(converted.webpSize), c:"#10B981"},
                                {l:"Saved",     v:`${converted.saving}% smaller`, c:"#F59E0B"},
                                {l:"Resolution",v:`${converted.width}×${converted.height}`, c:"rgba(255,255,255,0.4)"},
                              ].map(s=>(
                                <div key={s.l}>
                                  <div style={{ fontSize:9, color:"rgba(255,255,255,0.3)", textTransform:"uppercase" }}>{s.l}</div>
                                  <div style={{ fontSize:12, fontWeight:700, color:s.c }}>{s.v}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Use image button */}
                        <button onClick={useConvertedImage}
                          style={{ width:"100%", padding:"10px", background:"linear-gradient(135deg,#10B981,#059669)", border:"none", borderRadius:9, color:"#fff", fontWeight:800, fontSize:13, cursor:"pointer", fontFamily:"'Outfit',sans-serif", marginBottom:6 }}>
                          ➕ Add to {uploadDest==="hero"?"Hero Slides":uploadDest==="cards"?"Tour Card Image":"Tour Hero Slides"}
                        </button>
                        <div style={{ fontSize:10, color:"rgba(255,255,255,0.25)", textAlign:"center" }}>Then click "💾 Save All Images" below</div>
                      </div>

                      {/* Auto Alt Text */}
                      <div style={{ background:"rgba(59,130,246,0.08)", border:"1px solid rgba(59,130,246,0.25)", borderRadius:12, padding:12, marginBottom:12 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                          <div style={{ fontSize:12, fontWeight:700, color:"#60a5fa" }}>🔤 Auto SEO Alt Text</div>
                          <button onClick={()=>copyText(genAlt,"alt")} style={{ ...btnStyle("#60a5fa","rgba(59,130,246,0.15)"), padding:"4px 8px", fontSize:10 }}>
                            {copied==="alt"?"✅ Copied!":"📋 Copy"}
                          </button>
                        </div>
                        <textarea value={genAlt} onChange={e=>setGenAlt(e.target.value)}
                          style={{ ...I(), minHeight:56, resize:"vertical", fontSize:11, lineHeight:1.5, color:"#c8d8ff" }} />
                        <div style={{ fontSize:10, color:"rgba(255,255,255,0.25)", marginTop:4 }}>✏️ Edit this text if needed, then copy and use in your img alt="" tag</div>
                      </div>

                      {/* Schema */}
                      <div style={{ background:"rgba(139,92,246,0.08)", border:"1px solid rgba(139,92,246,0.25)", borderRadius:12, padding:12, marginBottom:12 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                          <div style={{ fontSize:12, fontWeight:700, color:"#a78bfa" }}>📋 JSON-LD Image Schema</div>
                          <div style={{ display:"flex", gap:5 }}>
                            <button onClick={()=>setShowSchema(s=>!s)} style={{ ...btnStyle("#a78bfa","rgba(139,92,246,0.15)"), padding:"4px 8px", fontSize:10 }}>
                              {showSchema?"Hide":"Show"}
                            </button>
                            <button onClick={()=>copyText(genSchema,"schema")} style={{ ...btnStyle("#a78bfa","rgba(139,92,246,0.15)"), padding:"4px 8px", fontSize:10 }}>
                              {copied==="schema"?"✅ Copied!":"📋 Copy"}
                            </button>
                          </div>
                        </div>
                        {showSchema && (
                          <pre style={{ fontSize:10, color:"#c4b5fd", overflow:"auto", maxHeight:180, background:"rgba(0,0,0,0.3)", borderRadius:6, padding:8, margin:0 }}>{genSchema}</pre>
                        )}
                        <div style={{ fontSize:10, color:"rgba(255,255,255,0.25)", marginTop:6, lineHeight:1.5 }}>
                          Paste this in your page's &lt;Head&gt; inside a &lt;script type="application/ld+json"&gt; tag for Google SEO
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── HERO SLIDES ── */}
              {imgTab==="hero" && (
                <div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginBottom:12, lineHeight:1.6 }}>
                    These <strong style={{color:"#F59E0B"}}>6 background images</strong> slide on your homepage hero.
                    <span style={{ display:"block", marginTop:4, color:"rgba(245,158,11,0.6)", fontSize:10 }}>💡 Go to 📸 Upload tab to add your own photos!</span>
                  </div>
                  {heroSlides.map((url, i) => (
                    <div key={i} style={imgRowStyle}>
                      <img src={url} alt="" style={{ width:54, height:38, objectFit:"cover", borderRadius:6, flexShrink:0 }} onError={e=>e.target.style.opacity="0.2"} />
                      <input value={url} onChange={e=>{const u=[...heroSlides];u[i]=e.target.value;setHeroSlides(u)}} style={{ ...I(), flex:1, fontSize:11 }} placeholder="Paste URL..." />
                      <button onClick={()=>setHeroSlides(s=>s.filter((_,j)=>j!==i))} style={{ background:"rgba(239,68,68,0.15)", border:"none", borderRadius:6, color:"#ef4444", padding:"4px 7px", cursor:"pointer", fontSize:12, flexShrink:0 }}>✕</button>
                    </div>
                  ))}
                  <div style={{ display:"flex", gap:8, marginTop:4 }}>
                    <input value={newHeroUrl} onChange={e=>setNewHeroUrl(e.target.value)} placeholder="Paste new URL..." style={{ ...I(), flex:1, fontSize:11 }} />
                    <button onClick={()=>{ if(newHeroUrl.trim()){setHeroSlides(s=>[...s,newHeroUrl.trim()]);setNewHeroUrl("")} }} style={{ ...btnStyle("#10B981","rgba(16,185,129,0.15)"), fontSize:12, padding:"6px 10px", flexShrink:0 }}>+ Add</button>
                  </div>
                </div>
              )}

              {/* ── CARD IMAGES ── */}
              {imgTab==="cards" && (
                <div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginBottom:12, lineHeight:1.6 }}>
                    <strong style={{color:"#F59E0B"}}>Card thumbnails</strong> shown in the tours grid on homepage.
                    <span style={{ display:"block", marginTop:4, color:"rgba(245,158,11,0.6)", fontSize:10 }}>💡 Go to 📸 Upload tab to use your own photos!</span>
                  </div>
                  {TOUR_SLUGS.map(({slug, label}) => (
                    <div key={slug} style={{ marginBottom:12 }}>
                      <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.6)", marginBottom:5 }}>{label}</div>
                      <div style={imgRowStyle}>
                        <img src={cardImages[slug]||DEFAULT_CARD_IMAGES[slug]} alt="" style={{ width:54, height:38, objectFit:"cover", borderRadius:6, flexShrink:0 }} onError={e=>e.target.style.opacity="0.2"} />
                        <input value={cardImages[slug]||""} onChange={e=>setCardImages(prev=>({...prev,[slug]:e.target.value}))} style={{ ...I(), flex:1, fontSize:11 }} placeholder={DEFAULT_CARD_IMAGES[slug]} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── TOUR HERO SLIDES ── */}
              {imgTab==="tours" && (
                <div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginBottom:10, lineHeight:1.6 }}>
                    Hero slideshow on each <strong style={{color:"#F59E0B"}}>tour listing page</strong>.
                    <span style={{ display:"block", marginTop:4, color:"rgba(245,158,11,0.6)", fontSize:10 }}>💡 Go to 📸 Upload tab to use your own photos!</span>
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:12 }}>
                    {TOUR_SLUGS.map(({slug, label}) => (
                      <button key={slug} onClick={()=>setActiveTour(slug)}
                        style={{ padding:"5px 10px", borderRadius:20, border:"none", background: activeTour===slug?"rgba(245,158,11,0.2)":"rgba(255,255,255,0.05)", color: activeTour===slug?"#F59E0B":"rgba(255,255,255,0.4)", fontSize:11, cursor:"pointer", fontFamily:"'Outfit',sans-serif", fontWeight: activeTour===slug?700:400 }}>
                        {label}
                      </button>
                    ))}
                  </div>
                  {(tourSlides[activeTour]||DEFAULT_TOUR_SLIDES[activeTour]||[]).map((url,i)=>(
                    <div key={i} style={imgRowStyle}>
                      <img src={url} alt="" style={{ width:54, height:38, objectFit:"cover", borderRadius:6, flexShrink:0 }} onError={e=>e.target.style.opacity="0.2"} />
                      <input value={url} onChange={e=>{const cur=[...(tourSlides[activeTour]||DEFAULT_TOUR_SLIDES[activeTour]||[])];cur[i]=e.target.value;setTourSlides(p=>({...p,[activeTour]:cur}))}} style={{ ...I(), flex:1, fontSize:11 }} placeholder="Paste URL..." />
                      <button onClick={()=>setTourSlides(p=>({...p,[activeTour]:(p[activeTour]||DEFAULT_TOUR_SLIDES[activeTour]||[]).filter((_,j)=>j!==i)}))} style={{ background:"rgba(239,68,68,0.15)", border:"none", borderRadius:6, color:"#ef4444", padding:"4px 7px", cursor:"pointer", fontSize:12, flexShrink:0 }}>✕</button>
                    </div>
                  ))}
                  <div style={{ display:"flex", gap:8, marginTop:4 }}>
                    <input value={newTourUrl} onChange={e=>setNewTourUrl(e.target.value)} placeholder="Paste new URL..." style={{ ...I(), flex:1, fontSize:11 }} />
                    <button onClick={()=>{ if(newTourUrl.trim()){setTourSlides(p=>({...p,[activeTour]:[...(p[activeTour]||DEFAULT_TOUR_SLIDES[activeTour]||[]),newTourUrl.trim()]}));setNewTourUrl("")} }} style={{ ...btnStyle("#10B981","rgba(16,185,129,0.15)"), fontSize:12, padding:"6px 10px", flexShrink:0 }}>+ Add</button>
                  </div>
                </div>
              )}

              {/* ── SAVE / RESET ── */}
              {imgTab !== "upload" && (
                <div style={{ marginTop:20, display:"flex", gap:8 }}>
                  <button onClick={saveImages}
                    style={{ flex:1, padding:"12px", background: imgSaved?"rgba(16,185,129,0.3)":"linear-gradient(135deg,#F59E0B,#D97706)", border:"none", borderRadius:10, color: imgSaved?"#10B981":"#000", fontWeight:800, fontSize:14, cursor:"pointer", fontFamily:"'Outfit',sans-serif", transition:"all 0.3s" }}>
                    {imgSaved ? "✅ Saved!" : "💾 Save All Images"}
                  </button>
                  <button onClick={resetImages}
                    style={{ padding:"12px 14px", background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:10, color:"#ef4444", fontSize:12, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>🔄</button>
                </div>
              )}
              {imgTab === "upload" && converted && (
                <button onClick={saveImages}
                  style={{ width:"100%", padding:"12px", background:"linear-gradient(135deg,#F59E0B,#D97706)", border:"none", borderRadius:10, color:"#000", fontWeight:800, fontSize:14, cursor:"pointer", fontFamily:"'Outfit',sans-serif", marginTop:8 }}>
                  💾 Save All Images to Site
                </button>
              )}
              <div style={{ marginTop:8, fontSize:10, color:"rgba(255,255,255,0.18)", textAlign:"center", lineHeight:1.6 }}>
                Saves to browser storage · Site updates automatically
              </div>
            </div>
          </div>
        )}

        {/* ── PAGE BUILDER ── */}
        {tool==="builder"&&(
          <div style={{ width:310, height:"100%", overflow:"auto", background:"#111", borderLeft:"1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ padding:"13px 15px", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize:14, color:"#F59E0B", fontWeight:700, marginBottom:4 }}>🧱 Page Builder</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)" }}>Plan your page layout</div>
            </div>
            <div style={{ padding:13 }}>
              <label style={LB}>Add Section Block</label>
              <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:14 }}>
                {SECTION_BLOCKS.map(b=>(
                  <div key={b.id} onClick={()=>setPageBlocks(p=>[...p,b])}
                    style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 10px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:8, cursor:"pointer" }}
                    onMouseEnter={e=>{e.currentTarget.style.background="rgba(245,158,11,0.08)";e.currentTarget.style.borderColor="rgba(245,158,11,0.2)"}}
                    onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.03)";e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"}}>
                    <span style={{ fontSize:18 }}>{b.icon}</span>
                    <div><div style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.8)" }}>{b.label}</div><div style={{ fontSize:10, color:"rgba(255,255,255,0.3)" }}>{b.desc}</div></div>
                    <span style={{ marginLeft:"auto", fontSize:16, color:"rgba(245,158,11,0.5)" }}>+</span>
                  </div>
                ))}
              </div>
              {pageBlocks.length>0&&(
                <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:10, padding:12 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:"#F59E0B", marginBottom:8 }}>📋 Your Plan</div>
                  {pageBlocks.map((b,i)=>(
                    <div key={b.id+i} style={{ display:"flex", gap:8, alignItems:"center", padding:"4px 0", borderBottom:i<pageBlocks.length-1?"1px solid rgba(255,255,255,0.05)":"none" }}>
                      <span style={{ fontSize:11, color:"rgba(255,255,255,0.2)", width:14 }}>{i+1}</span>
                      <span style={{ fontSize:13 }}>{b.icon}</span>
                      <span style={{ fontSize:11, color:"rgba(255,255,255,0.6)", flex:1 }}>{b.label}</span>
                      <button onClick={()=>setPageBlocks(p=>p.filter((_,j)=>j!==i))} style={{ background:"none", border:"none", color:"rgba(239,68,68,0.5)", cursor:"pointer", fontSize:12, padding:0 }}>✕</button>
                    </div>
                  ))}
                  <button onClick={()=>{ const txt=pageBlocks.map((b,i)=>`${i+1}. ${b.label}`).join("\n"); navigator.clipboard?.writeText(txt); toast("Plan copied!") }}
                    style={{ width:"100%", marginTop:10, padding:"8px", background:"linear-gradient(135deg,#F59E0B,#D97706)", border:"none", borderRadius:7, color:"#000", fontWeight:700, fontSize:12, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>📋 Copy Plan</button>
                  <button onClick={()=>setPageBlocks([])}
                    style={{ width:"100%", marginTop:5, padding:"6px", background:"transparent", border:"1px solid rgba(255,255,255,0.1)", borderRadius:7, color:"rgba(255,255,255,0.3)", fontSize:11, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>🗑️ Clear</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── FLYER ── */}
        {tool==="flyer"&&(
          <div style={{ width:330, height:"100%", overflow:"auto", background:"#111", borderLeft:"1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ padding:"13px 15px", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize:14, color:"#F59E0B", fontWeight:700, marginBottom:4 }}>🎨 Flyer Creator</div>
            </div>
            <div style={{ padding:13 }}>
              <label style={LB}>Template</label>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6, marginBottom:14 }}>
                {FLYER_TEMPLATES.map(t=>(
                  <div key={t.id} onClick={()=>setFlyerT(t)} style={{ height:46, borderRadius:8, background:t.bg, border:`2px solid ${flyerT.id===t.id?"#F59E0B":"transparent"}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontSize:10, fontWeight:700, color:t.accent, textAlign:"center", padding:"0 4px" }}>{t.label}</span>
                  </div>
                ))}
              </div>
              {[{k:"title",l:"Main Headline",p:"🔥 Limited Time!"},{k:"subtitle",l:"Tour Name",p:"Dubai Desert Safari"},{k:"discount",l:"Badge",p:"30% OFF"},{k:"price",l:"New Price",p:"AED 149"},{k:"oldPrice",l:"Old Price",p:"AED 199"},{k:"cta",l:"Button",p:"Book Now"},{k:"phone",l:"Phone",p:"+971 54 473 5060"},{k:"validity",l:"Valid Until",p:"March 31"},{k:"image",l:"Image URL",p:"https://..."}].map(f=>(
                <div key={f.k} style={{ marginBottom:9 }}>
                  <label style={LB}>{f.l}</label>
                  <input value={flyerD[f.k]||""} onChange={e=>setFlyerD(d=>({...d,[f.k]:e.target.value}))} placeholder={f.p} style={I()} />
                </div>
              ))}
              <div style={{ marginTop:14, borderRadius:12, overflow:"hidden", border:"1px solid rgba(255,255,255,0.1)", marginBottom:12 }}>
                <div style={{ padding:"18px 16px", background:flyerT.bg, textAlign:"center", color:flyerT.accent }}>
                  {flyerD.image&&<div style={{ width:"100%",height:85,backgroundImage:`url(${flyerD.image})`,backgroundSize:"cover",backgroundPosition:"center",borderRadius:8,marginBottom:12 }} />}
                  <div style={{ fontSize:14,fontWeight:800,marginBottom:4 }}>{flyerD.title||"Headline"}</div>
                  <div style={{ fontSize:10,opacity:0.8,marginBottom:8 }}>{flyerD.subtitle}</div>
                  <div style={{ fontSize:26,fontWeight:900,marginBottom:4 }}>{flyerD.discount}</div>
                  <div style={{ fontSize:15,fontWeight:700 }}>{flyerD.price} <span style={{ fontSize:10,textDecoration:"line-through",opacity:0.6 }}>{flyerD.oldPrice}</span></div>
                  <div style={{ display:"inline-block",marginTop:10,padding:"6px 16px",background:flyerT.accent,color:"#000",borderRadius:20,fontSize:11,fontWeight:800 }}>{flyerD.cta||"Book Now"}</div>
                  <div style={{ marginTop:8,fontSize:10,opacity:0.7 }}>{flyerD.phone}</div>
                </div>
              </div>
              <div style={{ display:"flex", gap:7 }}>
                <button onClick={printFlyer} style={{ flex:1, padding:"9px", background:"linear-gradient(135deg,#F59E0B,#D97706)", border:"none", borderRadius:8, color:"#000", fontWeight:700, fontSize:12, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>🖨️ Print</button>
                <button onClick={()=>toast("Share via WhatsApp!")} style={{ flex:1, padding:"9px", background:"rgba(37,211,102,0.15)", border:"1px solid rgba(37,211,102,0.3)", borderRadius:8, color:"#25D366", fontWeight:600, fontSize:12, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>💬 WA</button>
              </div>
            </div>
          </div>
        )}

      </div>

      {notif&&<div style={{ position:"fixed",bottom:18,right:18,zIndex:999,padding:"10px 16px",borderRadius:9,fontSize:13,fontWeight:600,background:notif.ok?"rgba(16,185,129,0.93)":"rgba(239,68,68,0.9)",color:"#fff",boxShadow:"0 6px 24px rgba(0,0,0,0.4)",maxWidth:340 }}>{notif.msg}</div>}
    </div>
  )
}
