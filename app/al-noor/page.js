"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const THEMES = {
  dark:  {bg:"#061008",bg2:"#0a1a0c",card:"#0f1f12",txt:"#e8f5e9",txt2:"#81c784",bdr:"rgba(80,200,100,0.13)",g1:"#2ecc71",g2:"#4ade80",gold:"#d4a843",gold2:"#f0c060",label:"🌙 Dark"},
  light: {bg:"#f0faf2",bg2:"#e6f4e9",card:"#fff",   txt:"#0a2e10",txt2:"#1a5c2a",bdr:"rgba(30,160,80,0.15)",g1:"#1a8c40",g2:"#22a84f",gold:"#a07010",gold2:"#c09020",label:"☀️ Light"},
  sepia: {bg:"#f5efe0",bg2:"#ede3cc",card:"#faf5e8",txt:"#3d2b1a",txt2:"#6b4423",bdr:"rgba(120,80,30,0.2)", g1:"#8b5e2a",g2:"#a07030",gold:"#8b5e2a",gold2:"#b07840",label:"📜 Sepia"},
  night: {bg:"#080808",bg2:"#111",   card:"#141414",txt:"#c8c8c8",txt2:"#777",   bdr:"rgba(255,255,255,0.07)",g1:"#555",g2:"#777",gold:"#c8a843",gold2:"#e0c060",label:"🔴 Night"},
  ocean: {bg:"#020d1a",bg2:"#041525",card:"#061c2e",txt:"#b3d9f5",txt2:"#5ba8d4",bdr:"rgba(40,140,200,0.18)",g1:"#2196f3",g2:"#42a5f5",gold:"#4fc3f7",gold2:"#81d4fa",label:"🌊 Ocean"},
};

const LANGS = [
  {code:"en.asad",     label:"🇬🇧 English",    dir:"ltr"},
  {code:"ur.ahmedali", label:"🇵🇰 Urdu",        dir:"rtl"},
  {code:"hi.hindi",    label:"🇮🇳 Hindi",        dir:"ltr"},
  {code:"fa.ayati",    label:"🇮🇷 Persian/Farsi",dir:"rtl"},
  {code:"bn.bengali",  label:"🇧🇩 Bengali",      dir:"ltr"},
  {code:"ru.kuliev",   label:"🇷🇺 Russian",      dir:"ltr"},
  {code:"zh.jian",     label:"🇨🇳 Chinese",      dir:"ltr"},
  {code:"tr.diyanet",  label:"🇹🇷 Turkish",      dir:"ltr"},
  {code:"tl.tagalog",  label:"🇵🇭 Tagalog",      dir:"ltr"},
];

const HL_COLORS = ["#FFD700","#FF6B6B","#4ECDC4","#A8E063","#C77DFF","#FF9F43","#74B9FF"];
const HL_NAMES  = ["Gold","Red","Teal","Green","Purple","Orange","Blue"];

const SURAHS = [
  {n:1,name:"Al-Fatiha",ar:"الفاتحة",verses:7,type:"Meccan"},
  {n:2,name:"Al-Baqarah",ar:"البقرة",verses:286,type:"Medinan"},
  {n:3,name:"Al-Imran",ar:"آل عمران",verses:200,type:"Medinan"},
  {n:4,name:"An-Nisa",ar:"النساء",verses:176,type:"Medinan"},
  {n:5,name:"Al-Maidah",ar:"المائدة",verses:120,type:"Medinan"},
  {n:6,name:"Al-Anam",ar:"الأنعام",verses:165,type:"Meccan"},
  {n:7,name:"Al-Araf",ar:"الأعراف",verses:206,type:"Meccan"},
  {n:36,name:"Ya-Sin",ar:"يس",verses:83,type:"Meccan"},
  {n:55,name:"Ar-Rahman",ar:"الرحمن",verses:78,type:"Medinan"},
  {n:56,name:"Al-Waqiah",ar:"الواقعة",verses:96,type:"Meccan"},
  {n:67,name:"Al-Mulk",ar:"الملك",verses:30,type:"Meccan"},
  {n:112,name:"Al-Ikhlas",ar:"الإخلاص",verses:4,type:"Meccan"},
  {n:113,name:"Al-Falaq",ar:"الفلق",verses:5,type:"Meccan"},
  {n:114,name:"An-Nas",ar:"الناس",verses:6,type:"Meccan"},
];

const AYAHS = [
  {ar:"إِنَّ مَعَ الْعُسْرِ يُسْرًا",en:"Indeed, with hardship will be ease.",ref:"94:6"},
  {ar:"وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ",en:"When My servants ask about Me, I am near.",ref:"2:186"},
  {ar:"حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",en:"Allah is sufficient for us, and He is the best Disposer of affairs.",ref:"3:173"},
  {ar:"رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً",en:"Our Lord, give us good in this world and good in the hereafter.",ref:"2:201"},
  {ar:"فَاذْكُرُونِي أَذْكُرْكُمْ",en:"Remember Me, I will remember you.",ref:"2:152"},
  {ar:"إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",en:"Indeed, Allah is with the patient.",ref:"2:153"},
  {ar:"وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ",en:"My success is not but through Allah.",ref:"11:88"},
];

const HADITHS = [
  {text:"The best of people are those who are most beneficial to others.",narrator:"Ibn Umar"},
  {text:"Actions are judged by intentions. Every person shall receive what they intended.",narrator:"Umar ibn al-Khattab"},
  {text:"Speak good or remain silent.",narrator:"Abu Hurairah"},
  {text:"The strong person is the one who controls himself when angry.",narrator:"Abu Hurairah"},
  {text:"None of you truly believes until he loves for his brother what he loves for himself.",narrator:"Anas"},
  {text:"Make things easy, not difficult. Spread peace, not fear.",narrator:"Abu Musa"},
  {text:"Be in the world as though you were a stranger or a wayfarer.",narrator:"Ibn Umar"},
];

const DUAS = [
  {title:"Morning Dua",ar:"اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ",en:"O Allah, by You we enter the morning and evening, by You we live and die."},
  {title:"Before Sleep",ar:"اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",en:"O Allah, in Your name I die and I live."},
  {title:"Before Eating",ar:"بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",en:"In the name of Allah and with the blessings of Allah."},
  {title:"After Eating",ar:"الحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا",en:"Praise be to Allah who fed us and gave us drink."},
  {title:"Entering Masjid",ar:"اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",en:"O Allah, open the doors of Your mercy for me."},
  {title:"Leaving Home",ar:"بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ",en:"In the name of Allah, I place my trust in Allah."},
  {title:"Dua for Parents",ar:"رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ",en:"My Lord, forgive me and my parents."},
  {title:"Istighfar",ar:"أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ",en:"I seek forgiveness of Allah the Mighty."},
];

const TABS=[{id:"prayer",icon:"🕌",label:"Prayer"},{id:"quran",icon:"📖",label:"Quran"},{id:"qibla",icon:"🧭",label:"Qibla"},{id:"tasbeeh",icon:"📿",label:"Tasbeeh"},{id:"dua",icon:"🤲",label:"Duas"}];

/* ── ACCURATE PRAYER CALCULATION (no CDN needed) ── */
function calcPrayers(lat, lng) {
  const D2R = Math.PI / 180;
  const now  = new Date();
  const y = now.getFullYear(), mo = now.getMonth()+1, dy = now.getDate();
  // Julian date
  const yr2 = mo<=2 ? y-1 : y, mo2 = mo<=2 ? mo+12 : mo;
  const A = Math.floor(yr2/100), B = 2-A+Math.floor(A/4);
  const JD = Math.floor(365.25*(yr2+4716)) + Math.floor(30.6001*(mo2+1)) + dy + B - 1524.5;
  const d  = JD - 2451545.0;
  // Sun geometry
  const g  = ((357.529 + 0.98560028*d) % 360) * D2R;
  const q  = (280.459 + 0.98564736*d) % 360;
  const L  = ((q + 1.915*Math.sin(g) + 0.02*Math.sin(2*g)) % 360) * D2R;
  const e  = (23.439 - 0.0000004*d) * D2R;
  const RA = Math.atan2(Math.cos(e)*Math.sin(L), Math.cos(L)) * 180/Math.PI / 15;
  const D2 = Math.asin(Math.sin(e)*Math.sin(L)) * 180/Math.PI;
  const EqT = q/15 - RA;
  // Timezone offset in hours
  const tzH = -now.getTimezoneOffset()/60;
  // Solar noon (local time)
  const noon = 12 + tzH - lng/15 - EqT;

  const hourAngle = (elev) => {
    const cosH = (Math.sin(elev*D2R) - Math.sin(lat*D2R)*Math.sin(D2*D2R)) /
                 (Math.cos(lat*D2R)*Math.cos(D2*D2R));
    if(Math.abs(cosH)>1) return null;
    return Math.acos(cosH)*180/Math.PI/15;
  };

  // Asr — Shafi (shadow factor 1)
  const asrElev = Math.atan(1/(1+Math.tan(Math.abs((lat-D2)*D2R)))) * 180/Math.PI;
  const asrH    = hourAngle(asrElev);

  const fajrH    = hourAngle(-18);
  const sunriseH = hourAngle(-0.8333);
  const ishaH    = hourAngle(-17);

  const makeDate = (h) => {
    if(h===null) return null;
    const t = new Date(now); t.setHours(0,0,0,0);
    t.setTime(t.getTime() + h*3600000); return t;
  };

  return [
    {name:"Fajr",    icon:"🌙", time: makeDate(noon - fajrH)},
    {name:"Sunrise", icon:"🌅", time: makeDate(noon - sunriseH)},
    {name:"Dhuhr",   icon:"☀️", time: makeDate(noon)},
    {name:"Asr",     icon:"🌤️", time: makeDate(noon + asrH)},
    {name:"Maghrib", icon:"🌆", time: makeDate(noon + sunriseH)},
    {name:"Isha",    icon:"🌃", time: makeDate(noon + ishaH)},
  ].filter(p=>p.time!==null);
}

/* ── QIBLA (pure math) ── */
function calcQibla(lat, lng) {
  const D2R = Math.PI/180;
  const mLat=21.4225*D2R, mLng=39.8262*D2R, latR=lat*D2R, lngR=lng*D2R;
  const dL=mLng-lngR;
  const x=Math.cos(mLat)*Math.sin(dL);
  const y=Math.cos(latR)*Math.sin(mLat)-Math.sin(latR)*Math.cos(mLat)*Math.cos(dL);
  return ((Math.atan2(x,y)*180/Math.PI)+360)%360;
}

export default function AlNoorPage() {
  const [mounted,setMounted]     = useState(false);
  const [tab,setTab]             = useState("prayer");
  const [theme,setTheme]         = useState("dark");
  const [prayers,setPrayers]     = useState([]);
  const [nextPrayer,setNextPrayer]= useState(null);
  const [countdown,setCountdown] = useState("");
  const [hijri,setHijri]         = useState("");
  const [location,setLocation]   = useState("Locating...");
  const [time,setTime]           = useState("--:--:--");
  const [qibla,setQibla]         = useState(null);
  const [compass,setCompass]     = useState(0);
  // Quran
  const [quranData,setQuranData] = useState(null);
  const [selSurah,setSelSurah]   = useState(null);
  const [loadingQ,setLoadingQ]   = useState(false);
  const [fontSize,setFontSize]   = useState(28);
  const [showTrans,setShowTrans] = useState(true);
  const [lang,setLang]           = useState("en.asad");
  const [showLangMenu,setShowLangMenu] = useState(false);
  const [autoScroll,setAutoScroll]   = useState(false);
  const [scrollSpeed,setScrollSpeed] = useState(2);
  // Highlights
  const [highlights,setHighlights] = useState({});
  const [activeHL,setActiveHL]     = useState(0);
  const [showHLMenu,setShowHLMenu] = useState(null);
  const [bookmarks,setBookmarks]   = useState([]);
  const [showBM,setShowBM]         = useState(false);
  // Tasbeeh
  const [count,setCount]           = useState(0);
  const [goal,setGoal]             = useState(33);
  // UI
  const [showThemes,setShowThemes] = useState(false);
  const scrollTimer = useRef(null);
  const T = THEMES[theme] || THEMES.dark;
  const todayIdx = new Date().getDate() % 7;

  /* ── INIT ── */
  useEffect(()=>{
    setMounted(true);
    // Saved highlights
    try {
      setHighlights(JSON.parse(localStorage.getItem("alnoor_hl")||"{}"));
      setBookmarks(JSON.parse(localStorage.getItem("alnoor_bm")||"[]"));
    } catch(_){}
    // Clock
    const tick=()=>setTime(new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit"}));
    tick(); const id=setInterval(tick,1000);
    // Hijri
    try{setHijri(new Date().toLocaleDateString("en-TN-u-ca-islamic",{year:"numeric",month:"long",day:"numeric"}));}catch(_){}
    return()=>clearInterval(id);
  },[]);

  /* ── LOCATION → PRAYERS + QIBLA ── */
  useEffect(()=>{
    if(!mounted) return;
    const compute=(lat,lng,locLabel)=>{
      setLocation(locLabel);
      const pt=calcPrayers(lat,lng);
      setPrayers(pt);
      setNextPrayer(pt.find(p=>p.time>new Date())||pt[0]);
      setQibla(Math.round(calcQibla(lat,lng)));
    };
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        p=>compute(p.coords.latitude,p.coords.longitude,`${p.coords.latitude.toFixed(2)}°N, ${p.coords.longitude.toFixed(2)}°E`),
        ()=>compute(25.2048,55.2708,"Dubai, UAE (default)"),
        {timeout:8000,maximumAge:300000}
      );
    } else {
      compute(25.2048,55.2708,"Dubai, UAE (default)");
    }
  },[mounted]);

  /* ── COUNTDOWN ── */
  useEffect(()=>{
    if(!nextPrayer) return;
    const id=setInterval(()=>{
      const diff=nextPrayer.time-new Date();
      if(diff<=0){ const pt=calcPrayers(25.2048,55.2708); setPrayers(pt); setNextPrayer(pt.find(p=>p.time>new Date())||pt[0]); return; }
      const h=Math.floor(diff/3600000),m=Math.floor((diff%3600000)/60000),s=Math.floor((diff%60000)/1000);
      setCountdown(`${h}h ${m}m ${s}s`);
    },1000);
    return()=>clearInterval(id);
  },[nextPrayer]);

  /* ── COMPASS ── */
  useEffect(()=>{
    const h=e=>{if(e.alpha!==null)setCompass(e.alpha);};
    window.addEventListener("deviceorientation",h,true);
    return()=>window.removeEventListener("deviceorientation",h,true);
  },[]);

  /* ── AUTO SCROLL ── */
  useEffect(()=>{
    if(scrollTimer.current) clearInterval(scrollTimer.current);
    if(autoScroll) scrollTimer.current=setInterval(()=>window.scrollBy({top:scrollSpeed,behavior:"auto"}),60);
    return()=>{ if(scrollTimer.current) clearInterval(scrollTimer.current); };
  },[autoScroll,scrollSpeed]);

  /* ── QURAN ── */
  const loadSurah=async(n,l)=>{
    const useLang=l||lang;
    setLoadingQ(true); setSelSurah(n); setQuranData(null);
    try{
      const r=await fetch(`https://api.alquran.cloud/v1/surah/${n}/editions/quran-uthmani,${useLang}`);
      const d=await r.json();
      if(d.code===200) setQuranData(d.data);
      else {
        const r2=await fetch(`https://api.alquran.cloud/v1/surah/${n}/editions/quran-uthmani,en.asad`);
        const d2=await r2.json(); setQuranData(d2.data);
      }
    }catch(_){}
    setLoadingQ(false);
  };

  /* ── HIGHLIGHTS + BOOKMARKS ── */
  const applyHL=(surahN,ayahN,colorIdx)=>{
    const key=`${surahN}_${ayahN}`;
    const newHL={...highlights,[key]:colorIdx};
    const surahInfo=SURAHS.find(s=>s.n===surahN);
    const newBM=[...bookmarks.filter(b=>b.key!==key),{key,surahN,ayahN,colorIdx,surahName:surahInfo?.name||""}];
    setHighlights(newHL); setBookmarks(newBM); setShowHLMenu(null);
    try{localStorage.setItem("alnoor_hl",JSON.stringify(newHL)); localStorage.setItem("alnoor_bm",JSON.stringify(newBM));}catch(_){}
  };

  const removeHL=(surahN,ayahN)=>{
    const key=`${surahN}_${ayahN}`;
    const newHL={...highlights}; delete newHL[key];
    const newBM=bookmarks.filter(b=>b.key!==key);
    setHighlights(newHL); setBookmarks(newBM); setShowHLMenu(null);
    try{localStorage.setItem("alnoor_hl",JSON.stringify(newHL)); localStorage.setItem("alnoor_bm",JSON.stringify(newBM));}catch(_){}
  };

  const jumpTo=(bm)=>{
    setShowBM(false); setTab("quran");
    const go=()=>{
      setTimeout(()=>{
        const el=document.getElementById(`a-${bm.surahN}-${bm.ayahN}`);
        if(el){ el.scrollIntoView({behavior:"smooth",block:"center"}); el.style.transition="box-shadow 0.5s"; el.style.boxShadow=`0 0 0 3px ${HL_COLORS[bm.colorIdx]}, 0 0 30px ${HL_COLORS[bm.colorIdx]}66`; setTimeout(()=>{el.style.boxShadow="";},2500); }
      },600);
    };
    if(bm.surahN!==selSurah) loadSurah(bm.surahN).then(go);
    else go();
  };

  const fmtT=d=>d?d.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:true}):"--:--";
  const isPast=t=>t&&new Date()>t;
  const curLang=LANGS.find(l=>l.code===lang)||LANGS[0];

  if(!mounted) return <div style={{minHeight:"100vh",background:"#061008"}}/>;
  const hdrBg=theme==="light"?"rgba(240,250,242,0.97)":theme==="sepia"?"rgba(245,239,224,0.97)":theme==="night"?"rgba(8,8,8,0.97)":theme==="ocean"?"rgba(2,13,26,0.97)":"rgba(6,16,8,0.97)";

  return(
    <div suppressHydrationWarning style={{minHeight:"100vh",background:T.bg,fontFamily:"'Exo 2',sans-serif",color:T.txt,transition:"background 0.3s",paddingBottom:72}}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700;800&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap"/>
      <style suppressHydrationWarning>{`
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:${T.g1};border-radius:4px}
        @keyframes glow{0%,100%{box-shadow:0 0 12px rgba(46,204,113,.3)}50%{box-shadow:0 0 24px rgba(46,204,113,.7)}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .srow:hover{background:rgba(46,204,113,0.08)!important;cursor:pointer}
        @media(min-width:900px){.qwide{max-width:100%!important;padding:0 80px!important}.qar{font-size:${Math.min(fontSize+10,88)}px!important}}
      `}</style>

      {/* HEADER */}
      <div suppressHydrationWarning style={{position:"sticky",top:0,zIndex:300,height:58,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 14px",background:hdrBg,backdropFilter:"blur(18px)",borderBottom:`1px solid ${T.bdr}`}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:34,height:34,borderRadius:"50%",background:`linear-gradient(135deg,${T.g1},${T.g2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,animation:"glow 3s ease-in-out infinite"}}>☪️</div>
          <div>
            <div style={{fontFamily:"'Noto Naskh Arabic',serif",fontSize:18,color:T.g1,lineHeight:1}}>النور</div>
            <div style={{fontSize:9,fontWeight:700,color:T.txt2,marginTop:1}}>Al-Noor Islamic App</div>
          </div>
        </div>
        {hijri&&<div style={{fontSize:10,color:T.txt2,background:`rgba(46,204,113,0.08)`,border:`1px solid ${T.bdr}`,padding:"4px 9px",borderRadius:20,fontWeight:600}}>🌙 {hijri}</div>}
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          {bookmarks.length>0&&<button onClick={()=>setShowBM(!showBM)} style={{padding:"5px 9px",background:`rgba(212,168,67,0.12)`,border:`1px solid rgba(212,168,67,0.3)`,borderRadius:20,color:T.gold2,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>🔖 {bookmarks.length}</button>}
          <div style={{position:"relative",zIndex:400}}>
            <button onClick={()=>setShowThemes(!showThemes)} style={{padding:"5px 9px",background:`rgba(46,204,113,0.1)`,border:`1px solid ${T.bdr}`,borderRadius:20,color:T.txt2,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{T.label}</button>
            {showThemes&&<div style={{position:"absolute",top:"calc(100% + 6px)",right:0,background:T.bg2,border:`1px solid ${T.bdr}`,borderRadius:14,padding:8,zIndex:999,minWidth:140,boxShadow:"0 8px 32px rgba(0,0,0,0.6)"}}>
              {Object.entries(THEMES).map(([k,v])=>(
                <button key={k} onClick={()=>{setTheme(k);setShowThemes(false);}} style={{display:"block",width:"100%",padding:"8px 12px",background:theme===k?`rgba(46,204,113,0.15)`:"transparent",border:`1px solid ${theme===k?T.g1:"transparent"}`,borderRadius:9,color:T.txt,fontSize:12,fontWeight:theme===k?700:400,cursor:"pointer",fontFamily:"inherit",textAlign:"left",marginBottom:3}}>{v.label}</button>
              ))}
            </div>}
          </div>
          <Link href="/" style={{fontSize:11,color:T.txt2,textDecoration:"none",padding:"5px 9px",border:`1px solid ${T.bdr}`,borderRadius:20}}>← Home</Link>
        </div>
      </div>

      {/* BOOKMARKS PANEL */}
      {showBM&&<div style={{position:"fixed",top:58,right:0,width:290,height:"calc(100vh - 58px)",background:T.bg2,borderLeft:`1px solid ${T.bdr}`,zIndex:250,overflowY:"auto",padding:14,boxShadow:"-8px 0 32px rgba(0,0,0,0.5)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{fontSize:13,fontWeight:800,color:T.txt}}>🔖 Bookmarks ({bookmarks.length})</div>
          <button onClick={()=>setShowBM(false)} style={{background:"none",border:"none",color:T.txt2,fontSize:20,cursor:"pointer"}}>×</button>
        </div>
        {bookmarks.map((bm,i)=>(
          <div key={i} onClick={()=>jumpTo(bm)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:T.card,borderLeft:`3px solid ${HL_COLORS[bm.colorIdx]}`,border:`1px solid ${HL_COLORS[bm.colorIdx]}33`,borderRadius:10,marginBottom:7,cursor:"pointer"}}>
            <div style={{width:12,height:12,borderRadius:"50%",background:HL_COLORS[bm.colorIdx],flexShrink:0}}/>
            <div style={{flex:1}}>
              <div style={{fontSize:12,fontWeight:700,color:T.txt}}>{bm.surahName} — Ayah {bm.ayahN}</div>
              <div style={{fontSize:10,color:T.txt2}}>{HL_NAMES[bm.colorIdx]} · tap to jump ✦ starts reading</div>
            </div>
            <span style={{fontSize:15,color:HL_COLORS[bm.colorIdx]}}>→</span>
          </div>
        ))}
        <button onClick={()=>{setHighlights({});setBookmarks([]);setShowBM(false);try{localStorage.removeItem("alnoor_hl");localStorage.removeItem("alnoor_bm");}catch(_){}}} style={{width:"100%",marginTop:8,padding:"8px",background:"rgba(231,76,60,0.08)",border:"1px solid rgba(231,76,60,0.2)",borderRadius:8,color:"#e74c3c",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Clear all bookmarks</button>
      </div>}

      {/* CLOCK */}
      <div style={{textAlign:"center",padding:"16px 14px 8px"}}>
        <div style={{fontSize:"clamp(28px,6vw,50px)",fontWeight:800,color:T.g1,fontFamily:"monospace",letterSpacing:2}}>{time}</div>
        <div style={{fontSize:11,color:T.txt2,marginTop:3}}>📍 {location}</div>
        {nextPrayer&&<div style={{display:"inline-flex",alignItems:"center",gap:8,marginTop:8,background:`rgba(46,204,113,0.08)`,border:`1px solid rgba(46,204,113,0.25)`,borderRadius:20,padding:"5px 14px"}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:T.g1,animation:"pulse 1.5s infinite"}}/>
          <span style={{fontSize:11,fontWeight:700,color:T.txt}}>Next: <span style={{color:T.g1}}>{nextPrayer.name}</span> in <span style={{color:T.gold2}}>{countdown}</span></span>
        </div>}
      </div>

      {/* CONTENT */}
      <div style={{maxWidth:selSurah&&tab==="quran"?"100%":520,margin:"0 auto",padding:"0 14px"}}>

        {/* ══ PRAYER ══ */}
        {tab==="prayer"&&<div>
          {/* Ayah of the Day */}
          <div style={{background:T.card,border:`1px solid ${T.bdr}`,borderLeft:`3px solid ${T.gold}`,borderRadius:14,padding:"14px",marginBottom:12}}>
            <div style={{fontSize:10,fontWeight:800,color:T.gold2,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>✨ Ayah of the Day</div>
            <div style={{fontFamily:"'Noto Naskh Arabic',serif",fontSize:20,textAlign:"right",color:T.txt,marginBottom:8,direction:"rtl",lineHeight:1.9}}>{AYAHS[todayIdx].ar}</div>
            <div style={{fontSize:12,color:T.txt2,fontStyle:"italic",marginBottom:4}}>{AYAHS[todayIdx].en}</div>
            <div style={{fontSize:10,color:T.gold2,fontWeight:700}}>— Quran {AYAHS[todayIdx].ref}</div>
          </div>
          {/* Hadith of the Day */}
          <div style={{background:T.card,border:`1px solid ${T.bdr}`,borderLeft:`3px solid ${T.g1}`,borderRadius:14,padding:"14px",marginBottom:14}}>
            <div style={{fontSize:10,fontWeight:800,color:T.g2,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>📜 Hadith of the Day</div>
            <div style={{fontSize:13,color:T.txt,lineHeight:1.75,marginBottom:4,fontStyle:"italic"}}>"{HADITHS[todayIdx].text}"</div>
            <div style={{fontSize:10,color:T.txt2}}>— Narrated by {HADITHS[todayIdx].narrator}</div>
          </div>
          {/* Prayer times */}
          <div style={{fontSize:11,fontWeight:800,letterSpacing:"2px",textTransform:"uppercase",color:T.g2,marginBottom:10,display:"flex",alignItems:"center",gap:7}}>
            <div style={{width:14,height:2,background:T.g1}}/> Prayer Times
          </div>
          {prayers.length===0
            ?<div style={{textAlign:"center",padding:"30px",color:T.txt2}}><div style={{width:30,height:30,border:`3px solid ${T.bdr}`,borderTopColor:T.g1,borderRadius:"50%",margin:"0 auto 10px",animation:"spin 0.8s linear infinite"}}/><div style={{fontSize:12}}>Getting location...</div></div>
            :prayers.map((p,i)=>{
              const isNext=nextPrayer?.name===p.name;
              const past=isPast(p.time)&&!isNext;
              return<div key={p.name} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"13px 16px",background:isNext?`rgba(46,204,113,0.12)`:T.card,border:`1.5px solid ${isNext?"rgba(46,204,113,0.5)":T.bdr}`,borderRadius:12,marginBottom:7,transition:"all 0.2s"}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:40,height:40,borderRadius:"50%",background:isNext?`rgba(46,204,113,0.15)`:"rgba(255,255,255,0.03)",border:`1px solid ${isNext?"rgba(46,204,113,0.45)":T.bdr}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19}}>{p.icon}</div>
                  <div>
                    <div style={{fontSize:14,fontWeight:700,color:past?T.txt2:T.txt}}>{p.name}</div>
                    {isNext&&<div style={{fontSize:9,color:T.g1,fontWeight:700,letterSpacing:"0.1em"}}>NEXT PRAYER</div>}
                  </div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:17,fontWeight:800,color:isNext?T.g1:past?T.txt2:T.txt}}>{fmtT(p.time)}</div>
                  {past&&<div style={{fontSize:9,color:T.txt2}}>passed</div>}
                </div>
              </div>;
            })}
        </div>}

        {/* ══ QURAN ══ */}
        {tab==="quran"&&<div className="qwide" style={{maxWidth:selSurah?1100:520,margin:"0 auto",padding:selSurah?"0 clamp(12px,4vw,60px)":"0"}}>
          {!selSurah
            ?<>
              <div style={{fontSize:11,fontWeight:800,letterSpacing:"2px",textTransform:"uppercase",color:T.g2,marginBottom:10,display:"flex",alignItems:"center",gap:7}}><div style={{width:14,height:2,background:T.g1}}/> Holy Quran</div>
              {SURAHS.map(s=><div key={s.n} className="srow" onClick={()=>loadSurah(s.n)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"13px 16px",background:T.card,border:`1px solid ${T.bdr}`,borderRadius:12,marginBottom:7,transition:"background 0.2s"}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:36,height:36,borderRadius:"50%",background:`rgba(46,204,113,0.1)`,border:`1px solid rgba(46,204,113,0.25)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:T.g1}}>{s.n}</div>
                  <div><div style={{fontSize:14,fontWeight:700,color:T.txt}}>{s.name}</div><div style={{fontSize:10,color:T.txt2}}>{s.type} · {s.verses} verses</div></div>
                </div>
                <div style={{fontFamily:"'Noto Naskh Arabic',serif",fontSize:20,color:T.gold2}}>{s.ar}</div>
              </div>)}
            </>
            :loadingQ
              ?<div style={{textAlign:"center",padding:"60px"}}><div style={{width:40,height:40,border:`3px solid ${T.bdr}`,borderTopColor:T.g1,borderRadius:"50%",margin:"0 auto 14px",animation:"spin 0.8s linear infinite"}}/><div style={{color:T.txt2}}>Loading...</div></div>
              :quranData
                ?<div>
                  {/* TOOLBAR */}
                  <div style={{position:"sticky",top:58,zIndex:100,background:T.bg,borderBottom:`1px solid ${T.bdr}`,padding:"8px 0 6px",marginBottom:12}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:6}}>
                      <button onClick={()=>{setSelSurah(null);setQuranData(null);setAutoScroll(false);}} style={{padding:"5px 12px",background:`rgba(46,204,113,0.1)`,border:`1px solid ${T.bdr}`,borderRadius:20,color:T.g1,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>← Back</button>
                      <div style={{fontSize:13,fontWeight:800,color:T.txt}}>{quranData[0]?.name} <span style={{fontSize:10,color:T.txt2}}>· {quranData[0]?.numberOfAyahs} verses</span></div>
                      <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:4,background:`rgba(255,255,255,0.04)`,border:`1px solid ${T.bdr}`,borderRadius:20,padding:"3px 10px"}}>
                        <button onClick={()=>setFontSize(f=>Math.max(16,f-4))} style={{width:22,height:22,borderRadius:"50%",background:`rgba(46,204,113,0.1)`,border:`1px solid ${T.bdr}`,color:T.txt,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit"}}>−</button>
                        <span style={{fontSize:11,color:T.g1,minWidth:24,textAlign:"center",fontWeight:700}}>{fontSize}</span>
                        <button onClick={()=>setFontSize(f=>Math.min(88,f+4))} style={{width:22,height:22,borderRadius:"50%",background:`rgba(46,204,113,0.1)`,border:`1px solid ${T.bdr}`,color:T.txt,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit"}}>+</button>
                      </div>
                      <button onClick={()=>setShowTrans(!showTrans)} style={{padding:"5px 10px",background:showTrans?`rgba(46,204,113,0.15)`:`rgba(255,255,255,0.05)`,border:`1px solid ${showTrans?"rgba(46,204,113,0.4)":T.bdr}`,borderRadius:20,color:showTrans?T.g1:T.txt2,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>🌐 {showTrans?"ON":"OFF"}</button>
                      <button onClick={()=>setAutoScroll(!autoScroll)} style={{padding:"5px 10px",background:autoScroll?`rgba(212,168,67,0.15)`:`rgba(255,255,255,0.05)`,border:`1px solid ${autoScroll?"rgba(212,168,67,0.4)":T.bdr}`,borderRadius:20,color:autoScroll?T.gold2:T.txt2,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{autoScroll?"⏸ Stop":"▶ Auto"}</button>
                      {autoScroll&&<><input type="range" min={1} max={10} value={scrollSpeed} onChange={e=>setScrollSpeed(Number(e.target.value))} style={{width:55,accentColor:T.gold}}/><span style={{fontSize:10,color:T.gold2}}>{scrollSpeed}x</span></>}
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                      {/* Language */}
                      <div style={{position:"relative"}}>
                        <button onClick={()=>setShowLangMenu(!showLangMenu)} style={{padding:"4px 10px",background:`rgba(46,204,113,0.08)`,border:`1px solid ${T.bdr}`,borderRadius:20,color:T.txt2,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:4}}>{curLang.label} ▾</button>
                        {showLangMenu&&<div style={{position:"absolute",top:"calc(100% + 4px)",left:0,background:T.bg2,border:`1px solid ${T.bdr}`,borderRadius:12,padding:8,zIndex:999,minWidth:175,boxShadow:"0 8px 32px rgba(0,0,0,0.6)",maxHeight:260,overflowY:"auto"}}>
                          {LANGS.map(l=><button key={l.code} onClick={()=>{setLang(l.code);setShowLangMenu(false);loadSurah(selSurah,l.code);}} style={{display:"block",width:"100%",padding:"8px 12px",background:lang===l.code?`rgba(46,204,113,0.15)`:"transparent",border:`1px solid ${lang===l.code?T.g1:"transparent"}`,borderRadius:8,color:T.txt,fontSize:12,fontWeight:lang===l.code?700:400,cursor:"pointer",fontFamily:"inherit",textAlign:"left",marginBottom:2}}>{l.label}</button>)}
                        </div>}
                      </div>
                      {/* Highlight colors — always visible */}
                      <span style={{fontSize:10,color:T.txt2}}>Highlight:</span>
                      {HL_COLORS.map((c,i)=>(
                        <button key={i} onClick={()=>setActiveHL(i)} title={HL_NAMES[i]}
                          style={{width:activeHL===i?22:16,height:activeHL===i?22:16,borderRadius:"50%",background:c,border:activeHL===i?`2px solid #fff`:`1px solid rgba(255,255,255,0.3)`,cursor:"pointer",transition:"all 0.2s",boxShadow:activeHL===i?`0 0 8px ${c}`:"none"}}/>
                      ))}
                      {bookmarks.length>0&&<button onClick={()=>setShowBM(!showBM)} style={{marginLeft:"auto",padding:"4px 10px",background:`rgba(212,168,67,0.1)`,border:`1px solid rgba(212,168,67,0.25)`,borderRadius:20,color:T.gold2,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>🔖 {bookmarks.length}</button>}
                    </div>
                  </div>
                  {/* Bismillah */}
                  {selSurah!==9&&<div style={{textAlign:"center",padding:"14px",background:T.card,border:`1px solid ${T.bdr}`,borderRadius:12,marginBottom:12,fontFamily:"'Noto Naskh Arabic',serif",fontSize:24,color:T.gold2,textShadow:`0 0 20px ${T.gold}55`}}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>}
                  {/* Ayahs */}
                  {quranData[0]?.ayahs?.map((ayah,i)=>{
                    const key=`${selSurah}_${ayah.numberInSurah}`;
                    const hlIdx=highlights[key];
                    const isHL=hlIdx!==undefined;
                    const hlColor=isHL?HL_COLORS[hlIdx]:null;
                    return(
                      <div id={`a-${selSurah}-${ayah.numberInSurah}`} key={ayah.number}
                        style={{background:isHL?`${hlColor}18`:T.card,border:`1.5px solid ${isHL?hlColor+"66":T.bdr}`,borderRadius:14,padding:"16px 18px",marginBottom:10,transition:"all 0.3s",position:"relative",boxShadow:isHL?`0 0 16px ${hlColor}22`:"none"}}>
                        {isHL&&<div style={{position:"absolute",left:0,top:0,bottom:0,width:4,borderRadius:"14px 0 0 14px",background:hlColor}}/>}
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                          {/* Bookmark button — ALWAYS VISIBLE */}
                          <div style={{position:"relative"}}>
                            <button
                              onClick={()=>setShowHLMenu(showHLMenu===key?null:key)}
                              style={{width:30,height:30,borderRadius:"50%",background:isHL?hlColor:`rgba(255,255,255,0.07)`,border:`1.5px solid ${isHL?hlColor+"aa":T.bdr}`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,transition:"all 0.2s",boxShadow:isHL?`0 0 10px ${hlColor}66`:"none"}}>
                              {isHL?"🔖":"🏷️"}
                            </button>
                            {showHLMenu===key&&(
                              <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,background:T.bg2,border:`1px solid ${T.bdr}`,borderRadius:12,padding:12,zIndex:500,boxShadow:"0 8px 28px rgba(0,0,0,0.7)",minWidth:240}}>
                                <div style={{fontSize:10,color:T.txt2,marginBottom:8,fontWeight:700}}>Choose highlight color:</div>
                                <div style={{display:"flex",gap:8,marginBottom:10}}>
                                  {HL_COLORS.map((c,ci)=>(
                                    <button key={ci} onClick={()=>applyHL(selSurah,ayah.numberInSurah,ci)} title={HL_NAMES[ci]}
                                      style={{width:28,height:28,borderRadius:"50%",background:c,border:`3px solid ${hlIdx===ci?"#fff":"transparent"}`,cursor:"pointer",boxShadow:`0 0 6px ${c}66`,transform:hlIdx===ci?"scale(1.25)":"scale(1)",transition:"transform 0.15s"}}>
                                    </button>
                                  ))}
                                </div>
                                {isHL&&<button onClick={()=>removeHL(selSurah,ayah.numberInSurah)} style={{width:"100%",padding:"6px",background:"rgba(231,76,60,0.1)",border:"1px solid rgba(231,76,60,0.25)",borderRadius:8,color:"#e74c3c",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Remove highlight</button>}
                              </div>
                            )}
                          </div>
                          {/* Ayah number */}
                          <div style={{width:28,height:28,borderRadius:"50%",background:`rgba(46,204,113,0.1)`,border:`1px solid rgba(46,204,113,0.3)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:T.g1}}>{ayah.numberInSurah}</div>
                        </div>
                        {/* Arabic */}
                        <div className="qar" style={{fontFamily:"'Noto Naskh Arabic',serif",fontSize:fontSize,lineHeight:2.0,textAlign:"right",color:T.txt,marginBottom:showTrans?12:0,direction:"rtl"}}>{ayah.text}</div>
                        {/* Translation */}
                        {showTrans&&quranData[1]?.ayahs?.[i]&&(
                          <div style={{fontSize:13,color:T.txt2,lineHeight:1.8,borderTop:`1px solid ${T.bdr}`,paddingTop:10,fontStyle:"italic",direction:curLang.dir,textAlign:curLang.dir==="rtl"?"right":"left"}}>{quranData[1].ayahs[i].text}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
                :<div style={{textAlign:"center",padding:"40px",color:T.txt2}}>Failed to load. Check internet.</div>}
        </div>}

        {/* ══ QIBLA ══ */}
        {tab==="qibla"&&<div style={{textAlign:"center"}}>
          <div style={{fontSize:11,fontWeight:800,letterSpacing:"2px",textTransform:"uppercase",color:T.g2,marginBottom:20,display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
            <div style={{width:14,height:2,background:T.g1}}/> Qibla Direction <div style={{width:14,height:2,background:T.g1}}/>
          </div>
          <div style={{position:"relative",width:240,height:240,margin:"0 auto 20px"}}>
            <div style={{position:"absolute",inset:0,borderRadius:"50%",border:`2px solid ${T.bdr}`,background:`radial-gradient(circle, rgba(46,204,113,0.06) 0%, transparent 70%)`}}/>
            <div style={{position:"absolute",inset:14,borderRadius:"50%",border:`1px solid ${T.bdr}`}}/>
            {[["N",0,"#e74c3c"],["E",90,T.txt2],["S",180,T.txt2],["W",270,T.txt2]].map(([l,a,c])=>(
              <div key={l} style={{position:"absolute",top:"50%",left:"50%",width:20,height:20,marginLeft:-10,marginTop:-10,transform:`rotate(${a}deg) translateY(-94px) rotate(-${a}deg)`,fontSize:12,fontWeight:800,color:c,display:"flex",alignItems:"center",justifyContent:"center"}}>{l}</div>
            ))}
            {qibla!==null&&(
              <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <div style={{transform:`rotate(${qibla-compass}deg)`,transition:"transform 0.4s ease",display:"flex",flexDirection:"column",alignItems:"center"}}>
                  <div style={{width:0,height:0,borderLeft:"8px solid transparent",borderRight:"8px solid transparent",borderBottom:`22px solid ${T.g1}`,filter:`drop-shadow(0 0 6px ${T.g1}88)`}}/>
                  <div style={{width:4,height:72,background:`linear-gradient(to bottom,${T.g1},${T.g2}44)`,borderRadius:2}}/>
                  <div style={{width:0,height:0,borderLeft:"8px solid transparent",borderRight:"8px solid transparent",borderTop:`14px solid ${T.bdr}`}}/>
                </div>
              </div>
            )}
            <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:30}}>🕋</div>
          </div>
          {qibla!==null
            ?<>
              <div style={{fontSize:58,fontWeight:900,color:T.g1,fontFamily:"monospace",marginBottom:4}}>{qibla}°</div>
              <div style={{fontSize:13,color:T.txt2,marginBottom:4}}>Direction to Mecca from your location</div>
              <div style={{fontSize:11,color:T.txt2}}>📍 {location}</div>
              <div style={{marginTop:12,fontSize:12,color:T.txt2,background:`rgba(212,168,67,0.08)`,border:`1px solid rgba(212,168,67,0.2)`,borderRadius:10,padding:"8px 14px",display:"inline-block"}}>
                Face <strong style={{color:T.gold2}}>{qibla}°</strong> from North to face the Qibla
              </div>
            </>
            :<div style={{color:T.txt2,fontSize:13}}>Awaiting location...</div>}
        </div>}

        {/* ══ TASBEEH ══ */}
        {tab==="tasbeeh"&&<div style={{textAlign:"center"}}>
          <div style={{fontSize:11,fontWeight:800,letterSpacing:"2px",textTransform:"uppercase",color:T.g2,marginBottom:20,display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
            <div style={{width:14,height:2,background:T.g1}}/> Digital Tasbeeh <div style={{width:14,height:2,background:T.g1}}/>
          </div>
          <div style={{position:"relative",width:200,height:200,margin:"0 auto 20px"}}>
            <svg width="200" height="200" style={{position:"absolute",inset:0}}>
              <circle cx="100" cy="100" r="88" fill="none" stroke={T.bdr} strokeWidth="8"/>
              <circle cx="100" cy="100" r="88" fill="none" stroke={T.g1} strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${2*Math.PI*88}`}
                strokeDashoffset={`${2*Math.PI*88*(1-Math.min(count/goal,1))}`}
                transform="rotate(-90 100 100)" style={{transition:"stroke-dashoffset 0.3s"}}/>
            </svg>
            <button onClick={()=>setCount(c=>{const n=c+1;if(n>=goal)setTimeout(()=>setCount(0),700);return n;})}
              style={{position:"absolute",inset:"20px",borderRadius:"50%",background:`rgba(46,204,113,0.1)`,border:`2px solid ${T.bdr}`,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4}}>
              <div style={{fontSize:44,fontWeight:900,color:T.g1}}>{count}</div>
              <div style={{fontSize:10,color:T.txt2}}>tap to count</div>
            </button>
          </div>
          <div style={{fontFamily:"'Noto Naskh Arabic',serif",fontSize:28,color:T.gold2,marginBottom:6}}>
            {count<goal/3?"سُبْحَانَ اللَّهِ":count<2*goal/3?"الحَمْدُ لِلَّهِ":"اللَّهُ أَكْبَرُ"}
          </div>
          <div style={{fontSize:13,color:T.txt2,marginBottom:16}}>
            {count<goal/3?"SubhanAllah":count<2*goal/3?"Alhamdulillah":"Allahu Akbar"}
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:12}}>
            {[33,99,100].map(g=><button key={g} onClick={()=>{setGoal(g);setCount(0);}} style={{padding:"7px 18px",background:goal===g?`rgba(46,204,113,0.15)`:T.card,border:`1px solid ${goal===g?"rgba(46,204,113,0.5)":T.bdr}`,borderRadius:20,color:goal===g?T.g1:T.txt2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{g}</button>)}
          </div>
          <button onClick={()=>setCount(0)} style={{padding:"8px 20px",background:"rgba(231,76,60,0.08)",border:"1px solid rgba(231,76,60,0.2)",borderRadius:20,color:"#e74c3c",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Reset</button>
        </div>}

        {/* ══ DUAS ══ */}
        {tab==="dua"&&<div>
          <div style={{fontSize:11,fontWeight:800,letterSpacing:"2px",textTransform:"uppercase",color:T.g2,marginBottom:12,display:"flex",alignItems:"center",gap:7}}><div style={{width:14,height:2,background:T.g1}}/> Daily Duas</div>
          {DUAS.map((d,i)=>(
            <div key={i} style={{background:T.card,border:`1px solid ${T.bdr}`,borderRadius:14,padding:"16px",marginBottom:10}}>
              <div style={{fontSize:11,fontWeight:700,color:T.g1,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:10}}>{d.title}</div>
              <div style={{fontFamily:"'Noto Naskh Arabic',serif",fontSize:20,lineHeight:2.0,textAlign:"right",color:T.txt,marginBottom:10,direction:"rtl"}}>{d.ar}</div>
              <div style={{fontSize:12,color:T.txt2,lineHeight:1.75,fontStyle:"italic"}}>{d.en}</div>
            </div>
          ))}
        </div>}
      </div>

      {/* BOTTOM NAV */}
      <div suppressHydrationWarning style={{position:"fixed",bottom:0,left:0,right:0,zIndex:200,height:66,background:hdrBg,backdropFilter:"blur(18px)",borderTop:`1px solid ${T.bdr}`,display:"flex"}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",position:"relative",padding:"6px 2px"}}>
            {tab===t.id&&<div style={{position:"absolute",bottom:4,left:"50%",transform:"translateX(-50%)",width:18,height:3,background:T.g1,borderRadius:2}}/>}
            <span style={{fontSize:22,filter:tab===t.id?"none":"grayscale(0.6) opacity(0.6)"}}>{t.icon}</span>
            <span style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.4px",color:tab===t.id?T.g1:`${T.txt}66`}}>{t.label}</span>
          </button>
        ))}
      </div>
      {(showThemes||showLangMenu||showHLMenu)&&<div onClick={()=>{setShowThemes(false);setShowLangMenu(false);setShowHLMenu(null);}} style={{position:"fixed",inset:0,zIndex:150}}/>}
    </div>
  );
}
