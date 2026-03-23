"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import WALKING_ROUTES from "../data/walking-routes";

export default function WalkingRoutePage() {
  const params = useParams();
  const [mounted, setMounted]         = useState(false);
  const [step, setStep]               = useState(0);
  const [navMode, setNavMode]         = useState(false); // full-screen nav mode
  const [gpsOn, setGpsOn]             = useState(false);
  const [gpsPos, setGpsPos]           = useState(null);
  const [gpsError, setGpsError]       = useState("");
  const [mapLoaded, setMapLoaded]     = useState(false);
  const [completed, setCompleted]     = useState([]);
  const [showTip, setShowTip]         = useState(true);
  const [showMap, setShowMap]         = useState(false);
  const mapRef = useRef(null);
  const mapInst = useRef(null);
  const gpsWatch = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  const route = WALKING_ROUTES.find(r => r.id === params?.route);

  // ── GPS ──
  const startGPS = useCallback(() => {
    if (!navigator.geolocation) { setGpsError("GPS not supported on this device"); return; }
    setGpsOn(true); setGpsError("");
    gpsWatch.current = navigator.geolocation.watchPosition(
      pos => {
        setGpsPos({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy });
        if (markerRef.current && mapInst.current) {
          markerRef.current.setLatLng([pos.coords.latitude, pos.coords.longitude]);
          mapInst.current.panTo([pos.coords.latitude, pos.coords.longitude]);
        }
      },
      err => { setGpsError("Enable location permission in your browser settings"); setGpsOn(false); },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 8000 }
    );
  }, []);

  const stopGPS = useCallback(() => {
    if (gpsWatch.current) navigator.geolocation.clearWatch(gpsWatch.current);
    setGpsOn(false); setGpsPos(null);
  }, []);

  // ── MAP (Leaflet) ──
  useEffect(() => {
    if (!showMap || !mapRef.current || !route) return;
    const load = async () => {
      if (!window.L) {
        await new Promise(res => {
          const link = document.createElement("link");
          link.rel = "stylesheet"; link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
          document.head.appendChild(link);
          const s = document.createElement("script");
          s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
          s.onload = res; document.head.appendChild(s);
        });
      }
      if (mapInst.current) { mapInst.current.remove(); mapInst.current = null; }
      const L = window.L;
      const curStep = route.steps[step];
      const map = L.map(mapRef.current, { zoomControl: true }).setView([curStep.lat, curStep.lng], 16);
      mapInst.current = map;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution:"© OpenStreetMap", maxZoom:19 }).addTo(map);

      // Draw route path
      const latlngs = route.steps.map(s => [s.lat, s.lng]);
      L.polyline(latlngs, { color: route.color, weight: 4, opacity: 0.7, dashArray: "8,4" }).addTo(map);

      // Step markers
      route.steps.forEach((s, i) => {
        const isCompleted = completed.includes(i);
        const isCurrent = i === step;
        const icon = L.divIcon({
          html: `<div style="width:${isCurrent?32:24}px;height:${isCurrent?32:24}px;border-radius:50%;background:${isCompleted?"#10B981":isCurrent?route.color:"rgba(255,255,255,0.3)"};border:3px solid ${isCurrent?route.color:"rgba(255,255,255,0.6)"};display:flex;align-items:center;justify-content:center;font-size:${isCurrent?13:10}px;font-weight:800;color:#fff;box-shadow:${isCurrent?`0 4px 16px ${route.color}60`:"none"};transition:all 0.3s">${isCompleted?"✓":i+1}</div>`,
          className:"", iconAnchor:[isCurrent?16:12, isCurrent?16:12],
        });
        L.marker([s.lat, s.lng], { icon }).addTo(map).bindPopup(`<b>Step ${i+1}</b><br/>${s.instruction.slice(0,60)}...`);
      });

      // GPS blue dot
      if (gpsPos) {
        const gpsIcon = L.divIcon({
          html:`<div style="width:16px;height:16px;border-radius:50%;background:#3B82F6;border:3px solid white;box-shadow:0 0 0 8px rgba(59,130,246,0.2)"></div>`,
          className:"", iconAnchor:[8,8],
        });
        markerRef.current = L.marker([gpsPos.lat, gpsPos.lng], { icon: gpsIcon }).addTo(map);
      }
      setMapLoaded(true);
    };
    load();
    return () => { if (mapInst.current) { mapInst.current.remove(); mapInst.current = null; } };
  }, [showMap, step, route, gpsPos, completed]);

  if (!mounted) return null;
  if (!route) return (
    <div style={{ minHeight:"100vh", background:"#080810", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Inter,sans-serif", color:"#fff" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:52, marginBottom:16 }}>🗺️</div>
        <div style={{ fontSize:22, fontWeight:800, marginBottom:8 }}>Route not found</div>
        <Link href="/tours/walking" style={{ color:"#3B82F6", textDecoration:"none" }}>← Back to routes</Link>
      </div>
    </div>
  );

  const curStep = route.steps[step];
  const isLast = step === route.steps.length - 1;
  const progress = ((step) / route.steps.length) * 100;
  const T = { bg:"#080810", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.08)", text:"#F1F5F9", sub:"rgba(255,255,255,0.45)" };

  const completeStep = () => {
    if (!completed.includes(step)) setCompleted(p => [...p, step]);
    if (!isLast) setStep(s => s + 1);
  };

  // ── FULL SCREEN NAVIGATION MODE ──
  if (navMode) return (
    <div style={{ position:"fixed", inset:0, background:"#030508", fontFamily:"Inter,sans-serif", display:"flex", flexDirection:"column", zIndex:9999 }}>
      <style suppressHydrationWarning>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');*{box-sizing:border-box}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>

      {/* TOP BAR */}
      <div style={{ padding:"14px 16px", background:"rgba(255,255,255,0.04)", borderBottom:"1px solid rgba(255,255,255,0.07)", display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={()=>setNavMode(false)} style={{ background:"none", border:"none", color:"#fff", fontSize:20, cursor:"pointer", padding:4 }}>←</button>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>Step {step+1} of {route.steps.length}</div>
          <div style={{ fontSize:14, fontWeight:700, color:"#fff" }}>{route.name}</div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {gpsOn
            ? <button onClick={stopGPS} style={{ background:"rgba(59,130,246,0.2)", border:"1px solid rgba(59,130,246,0.5)", borderRadius:8, padding:"6px 12px", color:"#93C5FD", fontSize:11, fontWeight:700, cursor:"pointer" }}>📡 GPS ON</button>
            : <button onClick={startGPS} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:8, padding:"6px 12px", color:"rgba(255,255,255,0.7)", fontSize:11, cursor:"pointer" }}>📡 GPS</button>
          }
        </div>
      </div>

      {/* PROGRESS */}
      <div style={{ height:3, background:"rgba(255,255,255,0.06)" }}>
        <div style={{ height:"100%", width:`${((step+1)/route.steps.length)*100}%`, background:route.color, transition:"width 0.5s ease" }}/>
      </div>

      {/* STEP PHOTO */}
      <div style={{ position:"relative", height:"38vh", overflow:"hidden", flexShrink:0 }}>
        <img src={curStep.photo} alt={curStep.landmark} style={{ width:"100%", height:"100%", objectFit:"cover" }} key={step}/>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(3,5,8,0.95) 0%, rgba(3,5,8,0.3) 60%, transparent 100%)" }}/>
        {/* Shade / indoor badges */}
        <div style={{ position:"absolute", top:12, left:12, display:"flex", gap:6 }}>
          {curStep.shade && <span style={{ background:"rgba(16,185,129,0.25)", border:"1px solid rgba(16,185,129,0.5)", borderRadius:20, padding:"3px 10px", fontSize:10, fontWeight:700, color:"#6EE7B7" }}>🌳 SHADED</span>}
          {curStep.indoor && <span style={{ background:"rgba(59,130,246,0.25)", border:"1px solid rgba(59,130,246,0.5)", borderRadius:20, padding:"3px 10px", fontSize:10, fontWeight:700, color:"#93C5FD" }}>❄️ INDOOR AC</span>}
        </div>
        {/* GPS indicator */}
        {gpsOn && (
          <div style={{ position:"absolute", top:12, right:12, display:"flex", alignItems:"center", gap:5, background:"rgba(59,130,246,0.2)", border:"1px solid rgba(59,130,246,0.4)", borderRadius:20, padding:"4px 10px" }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"#3B82F6", animation:"pulse 1s ease-in-out infinite" }}/>
            <span style={{ fontSize:10, color:"#93C5FD", fontWeight:700 }}>LIVE GPS</span>
          </div>
        )}
        {/* Time from prev */}
        {curStep.duration > 0 && (
          <div style={{ position:"absolute", bottom:12, right:12, background:"rgba(0,0,0,0.8)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, padding:"6px 10px", textAlign:"center" }}>
            <div style={{ fontSize:18, fontWeight:900, color:route.color }}>{curStep.duration}</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.5)" }}>MIN WALK</div>
          </div>
        )}
        {/* Direction arrow */}
        <div style={{ position:"absolute", bottom:12, left:12, background:"rgba(0,0,0,0.8)", border:`1px solid ${route.color}50`, borderRadius:8, padding:"6px 10px" }}>
          <div style={{ fontSize:10, color:route.color, fontWeight:700 }}>↗ {curStep.direction}</div>
        </div>
      </div>

      {/* INSTRUCTION */}
      <div style={{ flex:1, overflow:"auto", padding:"16px" }}>
        <div style={{ fontSize:"clamp(16px,4vw,20px)", fontWeight:800, color:"#fff", lineHeight:1.35, marginBottom:12 }}>
          {curStep.instruction}
        </div>

        {/* Landmark cue */}
        <div style={{ background:`${route.color}12`, border:`1px solid ${route.color}30`, borderRadius:12, padding:"12px 14px", marginBottom:14 }}>
          <div style={{ fontSize:10, color:route.color, fontWeight:700, letterSpacing:"0.08em", marginBottom:4 }}>👁️ LOOK FOR</div>
          <div style={{ fontSize:14, color:"rgba(255,255,255,0.8)", lineHeight:1.6 }}>{curStep.landmark}</div>
        </div>

        {/* Tip */}
        {showTip && curStep.tip && (
          <div style={{ background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.25)", borderRadius:10, padding:"10px 12px", marginBottom:14, display:"flex", gap:10, alignItems:"start" }}>
            <span style={{ fontSize:16, flexShrink:0 }}>💡</span>
            <div style={{ fontSize:13, color:"rgba(255,255,255,0.7)", lineHeight:1.5, flex:1 }}>{curStep.tip}</div>
            <button onClick={()=>setShowTip(false)} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.3)", cursor:"pointer", fontSize:14, flexShrink:0 }}>✕</button>
          </div>
        )}

        {/* GPS position info */}
        {gpsPos && (
          <div style={{ background:"rgba(59,130,246,0.08)", border:"1px solid rgba(59,130,246,0.2)", borderRadius:10, padding:"10px 12px", marginBottom:14 }}>
            <div style={{ fontSize:10, color:"#93C5FD", fontWeight:700, marginBottom:3 }}>📡 YOUR GPS POSITION</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.6)" }}>
              {gpsPos.lat.toFixed(5)}, {gpsPos.lng.toFixed(5)} · Accuracy: ±{Math.round(gpsPos.accuracy)}m
            </div>
          </div>
        )}
        {gpsError && (
          <div style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:10, padding:"10px 12px", marginBottom:14 }}>
            <div style={{ fontSize:12, color:"#FCA5A5" }}>⚠️ {gpsError}</div>
          </div>
        )}
      </div>

      {/* BOTTOM NAVIGATION */}
      <div style={{ padding:"12px 16px 24px", borderTop:"1px solid rgba(255,255,255,0.07)", background:"rgba(0,0,0,0.5)", display:"flex", gap:10 }}>
        <button onClick={()=>{ if(step>0){setStep(s=>s-1); setShowTip(true);} }}
          disabled={step===0}
          style={{ flex:1, padding:"14px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, color:step===0?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.7)", fontSize:14, fontWeight:600, cursor:step===0?"default":"pointer", fontFamily:"Inter,sans-serif" }}>
          ← Prev
        </button>
        {isLast ? (
          <button onClick={()=>{completeStep(); setNavMode(false);}}
            style={{ flex:2, padding:"14px", background:`linear-gradient(135deg,#10B981,#059669)`, border:"none", borderRadius:12, color:"#fff", fontSize:15, fontWeight:800, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
            🎉 Finish Walk!
          </button>
        ) : (
          <button onClick={()=>{ completeStep(); setShowTip(true); }}
            style={{ flex:2, padding:"14px", background:`linear-gradient(135deg,${route.color},${route.color}bb)`, border:"none", borderRadius:12, color:"#fff", fontSize:15, fontWeight:800, cursor:"pointer", fontFamily:"Inter,sans-serif", boxShadow:`0 4px 20px ${route.color}50` }}>
            Next Step →
          </button>
        )}
      </div>
    </div>
  );

  // ── DETAIL VIEW ──
  return (
    <div style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"Inter,sans-serif" }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.15);border-radius:10px}
        .step-card{transition:all 0.2s ease;cursor:pointer;}
        .step-card:hover{background:rgba(255,255,255,0.06)!important;}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
        .fade{animation:fadeUp 0.4s ease}
      `}</style>

      {/* Hero */}
      <div style={{ position:"relative", height:320, overflow:"hidden" }}>
        <img src={route.image} alt={route.name} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(8,8,16,1) 0%, rgba(8,8,16,0.7) 40%, rgba(8,8,16,0.2) 100%)" }}/>
        <div style={{ position:"absolute", top:16, left:16 }}>
          <Link href="/tours/walking" style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(0,0,0,0.6)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:8, padding:"7px 12px", color:"rgba(255,255,255,0.8)", textDecoration:"none", fontSize:12 }}>← All Routes</Link>
        </div>
        <div style={{ position:"absolute", bottom:20, left:20, right:20 }}>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:10 }}>
            <span style={{ background:route.color+"33", border:`1px solid ${route.color}`, borderRadius:20, padding:"4px 12px", fontSize:11, fontWeight:700, color:route.color }}>{route.emoji} {route.area}</span>
            <span style={{ background:"rgba(0,0,0,0.6)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:20, padding:"4px 12px", fontSize:11, fontWeight:700, color:"#fff" }}>{route.difficulty}</span>
            {route.indoorAC && <span style={{ background:"rgba(59,130,246,0.3)", border:"1px solid #3B82F6", borderRadius:20, padding:"4px 12px", fontSize:11, fontWeight:700, color:"#93C5FD" }}>❄️ Has AC stops</span>}
          </div>
          <h1 style={{ fontSize:"clamp(22px,4vw,38px)", fontWeight:900, margin:"0 0 6px", lineHeight:1.1 }}>{route.name}</h1>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.65)", margin:0 }}>{route.tagline}</p>
        </div>
      </div>

      <div style={{ maxWidth:1000, margin:"0 auto", padding:"24px" }}>
        {/* Start Navigation CTA */}
        <div style={{ background:`linear-gradient(135deg,${route.color}20,${route.color}08)`, border:`1.5px solid ${route.color}50`, borderRadius:16, padding:"20px 24px", marginBottom:24, display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:16, fontWeight:800, marginBottom:4 }}>Ready to walk? {route.emoji}</div>
            <div style={{ fontSize:13, color:T.sub }}>{route.steps.length} steps · {route.duration} min · {route.distance} km · Photo at every turn</div>
          </div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            {!gpsOn
              ? <button onClick={startGPS} style={{ padding:"11px 20px", background:"rgba(59,130,246,0.15)", border:"1px solid rgba(59,130,246,0.4)", borderRadius:10, color:"#93C5FD", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>📡 Enable GPS</button>
              : <div style={{ padding:"11px 16px", background:"rgba(59,130,246,0.2)", border:"1px solid rgba(59,130,246,0.5)", borderRadius:10, color:"#93C5FD", fontSize:13, fontWeight:700 }}>📡 GPS Active</div>
            }
            <button onClick={()=>setNavMode(true)}
              style={{ padding:"11px 24px", background:`linear-gradient(135deg,${route.color},${route.color}bb)`, border:"none", borderRadius:10, color:"#fff", fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"Inter,sans-serif", boxShadow:`0 6px 20px ${route.color}40` }}>
              🚶 Start Navigation →
            </button>
          </div>
        </div>

        {/* Key info grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:12, marginBottom:24 }}>
          {[
            { icon:"⏱️", label:"Duration", val:route.duration+" min" },
            { icon:"📏", label:"Distance", val:route.distance+" km" },
            { icon:"🌳", label:"Shade Level", val:route.shadeScore+"/10" },
            { icon:"📍", label:"Steps", val:route.steps.length+" stops" },
            { icon:"🚇", label:"Metro", val:"Accessible" },
          ].map(m => (
            <div key={m.label} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"14px 16px", textAlign:"center" }}>
              <div style={{ fontSize:22, marginBottom:4 }}>{m.icon}</div>
              <div style={{ fontSize:16, fontWeight:800, color:T.text }}>{m.val}</div>
              <div style={{ fontSize:10, color:T.sub, textTransform:"uppercase", letterSpacing:"0.05em" }}>{m.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:24 }}>
          {/* Best/avoid time */}
          <div style={{ background:"rgba(16,185,129,0.06)", border:"1px solid rgba(16,185,129,0.15)", borderRadius:12, padding:"14px 16px" }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#10B981", marginBottom:6 }}>✅ BEST TIME TO GO</div>
            <div style={{ fontSize:13, color:T.sub, lineHeight:1.6 }}>{route.bestTime}</div>
          </div>
          <div style={{ background:"rgba(239,68,68,0.06)", border:"1px solid rgba(239,68,68,0.15)", borderRadius:12, padding:"14px 16px" }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#EF4444", marginBottom:6 }}>⚠️ AVOID GOING</div>
            <div style={{ fontSize:13, color:T.sub, lineHeight:1.6 }}>{route.avoidTime}</div>
          </div>
        </div>

        {/* Metro */}
        <div style={{ background:"rgba(59,130,246,0.06)", border:"1px solid rgba(59,130,246,0.15)", borderRadius:12, padding:"14px 16px", marginBottom:24 }}>
          <div style={{ fontSize:12, fontWeight:700, color:"#3B82F6", marginBottom:6 }}>🚇 METRO ACCESS</div>
          <div style={{ fontSize:13, color:T.sub }}>{route.metroAccess}</div>
        </div>

        {/* Map toggle */}
        <div style={{ marginBottom:24 }}>
          <button onClick={()=>setShowMap(s=>!s)}
            style={{ display:"flex", alignItems:"center", gap:8, padding:"11px 20px", background:T.card, border:`1px solid ${T.border}`, borderRadius:12, color:T.text, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"Inter,sans-serif", marginBottom:showMap?12:0 }}>
            🗺️ {showMap?"Hide":"Show"} Route Map
          </button>
          {showMap && (
            <div ref={mapRef} style={{ height:300, borderRadius:12, overflow:"hidden", border:`1px solid ${T.border}` }}/>
          )}
        </div>

        {/* Steps */}
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:16, fontWeight:800, marginBottom:16 }}>Step-by-step route ({route.steps.length} stops)</div>
          <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
            {route.steps.map((s, i) => (
              <div key={s.id} className="step-card" onClick={()=>setStep(i)}
                style={{ display:"flex", gap:0, background: i===step?`${route.color}10`:"transparent", border:`1px solid ${i===step?route.color:T.border}`, borderRadius:i===step?12:0, marginBottom:i===step?4:0, transition:"all 0.2s", overflow:"hidden", position:"relative" }}>

                {/* Connector line */}
                {i < route.steps.length-1 && i!==step && (
                  <div style={{ position:"absolute", left:23, top:"100%", width:2, height:16, background:completed.includes(i)?route.color:T.border, zIndex:1 }}/>
                )}

                {/* Step number */}
                <div style={{ width:48, flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center", padding:"16px 0" }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", background:completed.includes(i)?"#10B981":i===step?route.color:"rgba(255,255,255,0.08)", border:`2px solid ${completed.includes(i)?"#10B981":i===step?route.color:"rgba(255,255,255,0.15)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:"#fff", zIndex:2, position:"relative" }}>
                    {completed.includes(i)?"✓":i+1}
                  </div>
                </div>

                {/* Photo */}
                <div style={{ width:80, height:80, flexShrink:0, overflow:"hidden", margin:"10px 12px 10px 0", borderRadius:8 }}>
                  <img src={s.photo} alt={s.instruction} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                </div>

                {/* Content */}
                <div style={{ flex:1, padding:"12px 16px 12px 0" }}>
                  <div style={{ display:"flex", gap:6, marginBottom:6, flexWrap:"wrap" }}>
                    {s.shade && <span style={{ fontSize:9, background:"rgba(16,185,129,0.15)", color:"#6EE7B7", border:"1px solid rgba(16,185,129,0.3)", borderRadius:4, padding:"1px 6px", fontWeight:700 }}>🌳 SHADED</span>}
                    {s.indoor && <span style={{ fontSize:9, background:"rgba(59,130,246,0.15)", color:"#93C5FD", border:"1px solid rgba(59,130,246,0.3)", borderRadius:4, padding:"1px 6px", fontWeight:700 }}>❄️ INDOOR</span>}
                    <span style={{ fontSize:9, background:"rgba(255,255,255,0.06)", color:T.sub, border:`1px solid ${T.border}`, borderRadius:4, padding:"1px 6px" }}>{s.duration} min · {s.distanceM}m</span>
                  </div>
                  <div style={{ fontSize:13, fontWeight: i===step?700:500, color: i===step?"#fff":T.text, lineHeight:1.4, marginBottom:4 }}>{s.instruction}</div>
                  {i === step && <div style={{ fontSize:11, color:T.sub, lineHeight:1.5 }}>{s.landmark}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insider tips */}
        <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"18px 20px", marginBottom:24 }}>
          <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>💡 Insider Tips for this walk</div>
          {route.tips.map((tip, i) => (
            <div key={i} style={{ display:"flex", gap:10, padding:"8px 0", borderBottom:i<route.tips.length-1?`1px solid ${T.border}`:"none" }}>
              <span style={{ fontSize:13, lineHeight:1.6, color:T.sub }}>{tip}</span>
            </div>
          ))}
        </div>

        {/* Book a guided tour */}
        <div style={{ background:"linear-gradient(135deg,rgba(249,115,22,0.12),rgba(236,72,153,0.08))", border:"1px solid rgba(249,115,22,0.3)", borderRadius:14, padding:"20px 24px", display:"flex", gap:16, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:15, fontWeight:800, marginBottom:4 }}>Want a guided tour instead? 🏜️</div>
            <div style={{ fontSize:13, color:T.sub }}>Let Salman Ali guide you personally — hotel pickup, expert knowledge, no stress</div>
          </div>
          <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
            style={{ padding:"11px 22px", background:"linear-gradient(135deg,#25D366,#128C7E)", borderRadius:10, color:"#fff", fontSize:13, fontWeight:700, textDecoration:"none", display:"flex", alignItems:"center", gap:6 }}>
            💬 WhatsApp Salman
          </a>
        </div>
      </div>
    </div>
  );
}
