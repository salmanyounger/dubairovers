"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";

const ADMIN_PASS = "dubairovers2025";

// ─── SLUG MAPPING — maps ANY DubaiRovers tour slug → showcase slug ───────────
const SLUG_MAP = {
  // Desert Safari variants
  "desert-safari-dubai":"desert-safari","desert-safari":"desert-safari","desert-safari-premium":"desert-safari",
  "evening-desert-safari":"desert-safari","morning-desert-safari":"desert-safari","vip-desert-safari":"desert-safari",
  "private-desert-safari":"desert-safari","overnight-desert-safari":"desert-safari","desert-safari-bbq":"desert-safari",
  // Quad Bike variants
  "quad-bike-dubai":"quad-bike","quad-bike":"quad-bike","quad-biking-dubai":"quad-bike","atv-dubai":"quad-bike",
  "quad-biking":"quad-bike","dune-buggy-dubai":"buggy-ride","buggy-ride-dubai":"buggy-ride","buggy-ride":"buggy-ride",
  "dune-buggy":"buggy-ride","off-road-buggy-dubai":"buggy-ride",
  // Dhow Cruise variants
  "dhow-cruise-dubai":"dhow-cruise","dhow-cruise":"dhow-cruise","creek-dhow-cruise":"dhow-cruise",
  "marina-dhow-cruise":"dhow-cruise","dinner-cruise-dubai":"dhow-cruise","dhow-dinner-cruise":"dhow-cruise",
  // Hot Air Balloon
  "hot-air-balloon-dubai":"hot-air-balloon","hot-air-balloon":"hot-air-balloon","balloon-ride-dubai":"hot-air-balloon",
  "sunrise-balloon-dubai":"hot-air-balloon","hot-air-balloon-tour":"hot-air-balloon",
  // Camel Riding
  "camel-riding-dubai":"camel-riding","camel-riding":"camel-riding","camel-ride-dubai":"camel-riding",
  "camel-safari-dubai":"camel-riding","camel-tour-dubai":"camel-riding",
  // City Tour variants
  "private-city-tour-dubai":"city-tour","city-tour-dubai":"city-tour","city-tour":"city-tour",
  "dubai-city-tour":"city-tour","dubai-sightseeing":"city-tour","dubai-tour":"city-tour",
  "speedboat-tour-dubai":"dhow-cruise","speedboat-dubai":"dhow-cruise","marina-speedboat":"dhow-cruise",
  "yacht-tour-dubai":"dhow-cruise","boat-tour-dubai":"dhow-cruise","sea-tour-dubai":"dhow-cruise",
  "water-sports-dubai":"dhow-cruise","jet-ski-dubai":"dhow-cruise","parasailing-dubai":"dhow-cruise",
  "fishing-dubai":"dhow-cruise","deep-sea-fishing-dubai":"dhow-cruise",
  "skydiving-dubai":"hot-air-balloon","zip-line-dubai":"quad-bike","rock-climbing-dubai":"quad-bike",
  "kayaking-dubai":"dhow-cruise","paddle-boarding-dubai":"dhow-cruise","swimming-dubai":"dhow-cruise",
};
function getShowcaseSlug(slug){
  if(!slug) return "desert-safari";
  const s=slug.toLowerCase().trim();
  return SLUG_MAP[s]||s;
}

// ─── ALL 7 TOURS DATA ─────────────────────────────────────────────────────────
const TOURS_DATA = {
  "desert-safari": {
    title:"Desert Safari Dubai",subtitle:"Arabian Desert · Dubai, UAE",coords:"24.8607° N · 55.3096° E",alt:"ALT: 204m",est:"EST. 2015 · 9 YRS",silhouette:"desert",
    ticker:["🏜️ Dubai desert covers 3,885 km² of golden sand dunes","🐪 Arabian camels travel 40 km/day in desert","🌡️ Desert temps reach 50°C in summer","⭐ Milky Way visible with zero light pollution","🌅 Desert sunset drops 4°C in under 15 minutes","🏎️ 4x4 dune bashing reaches 80 km/h","🎭 Belly dancing tradition — 6,000 years in Arabia","🔭 250,000 stars visible from Dubai desert","🌙 Desert nights drop to 5°C in January","🦅 Falconry is UNESCO Intangible Cultural Heritage","🍢 Shawarma introduced to UAE in the 1970s","🪘 Traditional Tanoura dress weighs up to 12 kg","🏜️ Dubai has 3 dune types: barchan, seif & star","💧 Bedouin tribes survived on 1L water per day","🐍 Desert monitor lizards run at 30 km/h","🌿 Ghaf tree — UAE national tree — survives 50°C"],
    scenes:[
      {id:0,tab:"🌅 Golden Dunes",title:"GOLDEN DUNES",subtitle:"Where Sand Meets Sky",bigStat:"AED 299",tag:"PER PERSON · ALL INCLUSIVE",accent:[255,180,40],sky:["#FF6B35","#FF8C42","#FFA550","#FFD166","#FFE5A0"],mood:"golden",cards:[{icon:"⏱️",num:"6",unit:"HRS",label:"Full Duration",bar:75},{icon:"🐪",num:"15",unit:"MIN",label:"Camel Riding",bar:50},{icon:"🏂",num:"30",unit:"MIN",label:"Sandboarding",bar:60},{icon:"📸",num:"50+",unit:"SHOTS",label:"Pro Photos",bar:85},{icon:"🍽️",num:"4",unit:"COURSE",label:"BBQ Dinner",bar:90}]},
      {id:1,tab:"🌙 Desert Night",title:"DESERT NIGHT",subtitle:"Stars Above the Dunes",bigStat:"250K+",tag:"STARS VISIBLE",accent:[120,180,255],sky:["#0a0a1a","#0d1b2a","#1a1a3e","#0f2044","#162032"],mood:"night",cards:[{icon:"🔥",num:"3",unit:"HRS",label:"Campfire Show",bar:80},{icon:"💃",num:"2",unit:"SHOWS",label:"Entertainment",bar:90},{icon:"🎭",num:"1",unit:"SHOW",label:"Tanoura Dance",bar:70},{icon:"☕",num:"∞",unit:"CUPS",label:"Arabic Coffee",bar:95},{icon:"🔭",num:"250K",unit:"STARS",label:"Night Sky",bar:100}]},
      {id:2,tab:"🌄 Sunrise",title:"SUNRISE SAFARI",subtitle:"Dawn Breaks Over Arabia",bigStat:"5:47",tag:"GOLDEN HOUR PICKUP",accent:[255,130,50],sky:["#1a0a00","#3d1a00","#8B4513","#FF6347","#FF8C00"],mood:"sunrise",cards:[{icon:"🌅",num:"5:47",unit:"AM",label:"Hotel Pickup",bar:100},{icon:"🦅",num:"1",unit:"DEMO",label:"Falconry Show",bar:65},{icon:"🏕️",num:"3",unit:"CAMPS",label:"Bedouin Style",bar:80},{icon:"🧆",num:"10+",unit:"ITEMS",label:"Breakfast Spread",bar:85},{icon:"🚗",num:"4x4",unit:"TRUCK",label:"Private Vehicle",bar:70}]},
      {id:3,tab:"🌪️ Sandstorm",title:"SANDSTORM",subtitle:"Nature's Raw Power",bigStat:"120",tag:"KM/H WIND GUSTS",accent:[200,150,80],sky:["#8B6914","#A0522D","#CD853F","#D2691E","#8B4513"],mood:"storm",cards:[{icon:"🛡️",num:"100%",unit:"SAFE",label:"DTCM Licensed",bar:100},{icon:"🏎️",num:"80",unit:"KM/H",label:"Dune Bashing",bar:80},{icon:"🌡️",num:"50°",unit:"MAX°C",label:"Peak Summer",bar:95},{icon:"⭐",num:"4.9",unit:"/5",label:"Guest Rating",bar:98},{icon:"📅",num:"365",unit:"DAYS",label:"Available",bar:100}]},
    ],
  },
  "quad-bike":{title:"Quad Bike Dubai",subtitle:"Al Qudra Desert · Dubai, UAE",coords:"24.9764° N · 55.1756° E",alt:"ALT: 180m",est:"EST. 2015 · 9 YRS",silhouette:"quad",ticker:["🏍️ Quad bikes reach 70 km/h across Dubai desert","🏜️ Al Qudra track stretches 100+ km","⛽ ATV engines run on 95 octane petrol","🦅 Al Qudra home to 170+ migratory bird species","🧤 Full safety gear — helmet, goggles, gloves provided","🌡️ Best riding: October to April, 22–30°C","🏎️ Dubai hosts annual quad championships since 2010","🐆 Arabian oryx spotted near Al Qudra","📸 GoPro mount on all DubaiRovers quad bikes","🌊 Dunes near Al Qudra reach 30 metres tall","🌅 Sunset quad rides offer golden hour photography","🚑 First-aid trained guides on all rides","🎖️ DubaiRovers DTCM licensed since 2015","🔧 Yamaha Grizzly 700cc — desert terrain choice","👶 Minimum age: 16 for solo riding in Dubai","🌿 Desert ecosystems recover in 48 hrs after tracks"],scenes:[{id:0,tab:"⚡ Adrenaline",title:"ADRENALINE RUSH",subtitle:"Conquer the Dunes",bigStat:"AED 250",tag:"PER PERSON · 30 MIN RIDE",accent:[255,80,40],sky:["#FF4500","#FF6347","#FF7F50","#FFA07A","#FFD700"],mood:"golden",cards:[{icon:"⚡",num:"70",unit:"KM/H",label:"Top Speed",bar:85},{icon:"⏱️",num:"30",unit:"MIN",label:"Ride Duration",bar:50},{icon:"🏍️",num:"700",unit:"CC",label:"Engine Power",bar:80},{icon:"🏜️",num:"100+",unit:"KM",label:"Desert Trail",bar:90},{icon:"📸",num:"HD",unit:"CAM",label:"GoPro Included",bar:70}]},{id:1,tab:"🌙 Dusk Ride",title:"DUSK RIDE",subtitle:"Desert After Dark",bigStat:"6:30",tag:"PM SUNSET START",accent:[180,100,255],sky:["#1a0530","#2d0a50","#4a1070","#6a20a0","#3d0070"],mood:"night",cards:[{icon:"🌙",num:"6:30",unit:"PM",label:"Dusk Start",bar:65},{icon:"🔦",num:"LED",unit:"LIGHTS",label:"Night Equipped",bar:85},{icon:"🌡️",num:"28°",unit:"C",label:"Perfect Temp",bar:75},{icon:"⭐",num:"4.8",unit:"/5",label:"Night Riders",bar:96},{icon:"🏕️",num:"1",unit:"CAMP",label:"Bonfire Pit",bar:60}]},{id:2,tab:"🌄 Morning",title:"MORNING TRACKS",subtitle:"Fresh Desert Air",bigStat:"6:00",tag:"AM FIRST RIDE SLOT",accent:[255,160,0],sky:["#0d0500","#2a1000","#6B3A00","#CC7722","#FF9900"],mood:"sunrise",cards:[{icon:"🌄",num:"6:00",unit:"AM",label:"Morning Slot",bar:100},{icon:"🏍️",num:"4",unit:"MAX",label:"Group Size",bar:40},{icon:"☕",num:"FREE",unit:"TEA",label:"Arabic Welcome",bar:70},{icon:"🧤",num:"FULL",unit:"KIT",label:"Safety Gear",bar:100},{icon:"🚑",num:"1ST",unit:"AID",label:"Guide Certified",bar:90}]},{id:3,tab:"💨 Dust Storm",title:"DUST STORM",subtitle:"Ride Through Chaos",bigStat:"50M+",tag:"VISIBILITY IN HABOOB",accent:[220,180,80],sky:["#5c3800","#8B5E00","#B8860B","#CD9B1D","#DAA520"],mood:"storm",cards:[{icon:"🌪️",num:"120",unit:"KM/H",label:"Storm Winds",bar:90},{icon:"🛡️",num:"100%",unit:"COVER",label:"Safety Briefing",bar:100},{icon:"🔄",num:"FREE",unit:"SWAP",label:"Reschedule",bar:80},{icon:"📞",num:"24/7",unit:"LINE",label:"Support Team",bar:100},{icon:"🏆",num:"#1",unit:"RATED",label:"Google Reviews",bar:99}]}],},
  "dhow-cruise":{title:"Dhow Cruise Dubai",subtitle:"Dubai Marina · Creek, UAE",coords:"25.0817° N · 55.1409° E",alt:"ALT: Sea Level",est:"EST. 2015 · 9 YRS",silhouette:"dhow",ticker:["⛵ Traditional dhow boats are 2,000+ years old","🌊 Dubai Creek was the original 1833 trading hub","🏗️ Dubai Marina — world's largest man-made marina","💡 200+ illuminated skyscrapers at night","🦀 Fresh seafood from Deira fish market daily","🌅 Dubai sunset averages 6:22 PM Oct–Mar","🎭 Live entertainment: Tanoura, violin, music nightly","🚢 Dubai Creek route is UNESCO heritage waterway","🍽️ Buffet includes 40+ Arabian & international dishes","🌉 Dubai's first bridge built over The Creek 1963","🌃 Dubai Marina Walk stretches 7 kilometres","🦅 Emirates flies 1,500+ daily flights from DXB","⚓ Jebel Ali port handles 22M TEU","💎 Dubai gold souk trades 10 tonnes daily","🌙 Arabian sea breeze averages 15 km/h evenings","🏙️ Dubai skyline changed more than any city on Earth"],scenes:[{id:0,tab:"🌅 Sunset Sail",title:"SUNSET SAIL",subtitle:"Golden Hour on the Water",bigStat:"AED 199",tag:"PER PERSON · DINNER CRUISE",accent:[255,150,30],sky:["#FF4500","#FF6B35","#FF8C42","#FFA550","#FFD166"],mood:"golden",cards:[{icon:"⏱️",num:"2",unit:"HRS",label:"Cruise Duration",bar:50},{icon:"🍽️",num:"40+",unit:"DISHES",label:"Buffet Items",bar:90},{icon:"🎭",num:"2",unit:"SHOWS",label:"Entertainment",bar:80},{icon:"🌅",num:"6:22",unit:"PM",label:"Sunset Time",bar:85},{icon:"🛥️",num:"50",unit:"PAX",label:"Private Dhow",bar:60}]},{id:1,tab:"🌃 Marina Night",title:"MARINA NIGHT GLOW",subtitle:"200 Skyscrapers Lit Up",bigStat:"200+",tag:"ILLUMINATED TOWERS",accent:[100,180,255],sky:["#000814","#001233","#002855","#003d7a","#001a33"],mood:"night",cards:[{icon:"🏙️",num:"200+",unit:"TOWERS",label:"Skyline Views",bar:100},{icon:"🎵",num:"LIVE",unit:"BAND",label:"Arabic Music",bar:85},{icon:"🍾",num:"FREE",unit:"DRINKS",label:"Soft Beverages",bar:75},{icon:"📸",num:"∞",unit:"PHOTOS",label:"Instagram Spots",bar:95},{icon:"⭐",num:"4.9",unit:"/5",label:"Night Cruise",bar:98}]},{id:2,tab:"🌄 Creek Dawn",title:"CREEK AT DAWN",subtitle:"Historic Waters at Sunrise",bigStat:"1833",tag:"YEAR CREEK OPENED",accent:[255,120,60],sky:["#050200","#1a0800","#4a2000","#8B4513","#CC6600"],mood:"sunrise",cards:[{icon:"🕌",num:"1833",unit:"AD",label:"Creek Founded",bar:100},{icon:"🌅",num:"6:00",unit:"AM",label:"Dawn Cruise",bar:100},{icon:"⚓",num:"12",unit:"STOPS",label:"Heritage Points",bar:70},{icon:"🦢",num:"30+",unit:"BIRDS",label:"Creek Wildlife",bar:55},{icon:"🏛️",num:"2000",unit:"YRS",label:"Dhow Heritage",bar:90}]},{id:3,tab:"⛈️ Stormy Sea",title:"STORMY ARABIAN SEA",subtitle:"The Creek in Drama",bigStat:"15",tag:"KM/H SEA BREEZE",accent:[180,200,220],sky:["#1a2030","#253040","#2d3a50","#354560","#1a2535"],mood:"storm",cards:[{icon:"⛈️",num:"15",unit:"KM/H",label:"Sea Breeze",bar:60},{icon:"🛡️",num:"COAST",unit:"GUARD",label:"Safety Approved",bar:100},{icon:"🚢",num:"100%",unit:"INSURED",label:"All Vessels",bar:100},{icon:"📞",num:"24/7",unit:"RESCUE",label:"On Standby",bar:100},{icon:"🔄",num:"FREE",unit:"CANCEL",label:"Bad Weather",bar:90}]}],},
  "hot-air-balloon":{title:"Hot Air Balloon Dubai",subtitle:"Al Ain Desert · Dubai, UAE",coords:"25.0343° N · 55.4194° E",alt:"ALT: Up to 1,200m",est:"EST. 2015 · 9 YRS",silhouette:"balloon",ticker:["🎈 Balloons reach 1,200m over Dubai desert","🌡️ Envelope holds 120,000 cubic feet of air","🔥 Burner flame burns at 1,100°C","🕊️ First balloon flight was 1783 in Paris","🦅 Falcon eyesight spots prey 300m below","🌅 Sunrise launch window: 5:45–6:30 AM only","🌬️ Balloon drifts at wind speed — 10–25 km/h","🌍 Dubai balloons cover 25+ km per flight","📸 Balloon height reveals the full UAE landscape","☁️ Dubai averages 300+ clear sky days per year","🎈 Each balloon weighs 115kg","🧺 Wicker basket design unchanged for 200 years","🌊 From 1,200m you see both Gulf coasts","🏆 Dubai balloon rated top 10 worldwide","💫 Same weightless sensation as ISS astronauts","🐆 Arabian leopard spotted from balloon 2022"],scenes:[{id:0,tab:"🌅 Dawn Lift-Off",title:"DAWN LIFT-OFF",subtitle:"Rise Above Arabia",bigStat:"AED 699",tag:"PER PERSON · SUNRISE FLIGHT",accent:[255,200,50],sky:["#FF4500","#FF5733","#FF6B35","#FF8C42","#FFB347"],mood:"golden",cards:[{icon:"⏱️",num:"60",unit:"MIN",label:"Flight Duration",bar:70},{icon:"📏",num:"1200",unit:"METRES",label:"Max Altitude",bar:90},{icon:"🌡️",num:"1100",unit:"°C",label:"Burner Temp",bar:95},{icon:"👥",num:"24",unit:"MAX",label:"Per Balloon",bar:50},{icon:"📸",num:"360°",unit:"VIEW",label:"Panoramic",bar:100}]},{id:1,tab:"🌤️ Golden Float",title:"GOLDEN FLOAT",subtitle:"Drifting Over the Dunes",bigStat:"25+",tag:"KM DISTANCE COVERED",accent:[255,220,80],sky:["#0a0a00","#1a1500","#2d2500","#4a3d00","#6b5800"],mood:"night",cards:[{icon:"🌍",num:"25+",unit:"KM",label:"Distance Drifted",bar:80},{icon:"🌬️",num:"20",unit:"KM/H",label:"Wind Speed",bar:50},{icon:"🦅",num:"2",unit:"SPECIES",label:"Falcons Seen",bar:40},{icon:"🎈",num:"115",unit:"KG",label:"Balloon Weight",bar:35},{icon:"☀️",num:"300+",unit:"DAYS",label:"Clear Sky/Year",bar:99}]},{id:2,tab:"🌄 Cloud Burst",title:"CLOUD BURST",subtitle:"Above the Morning Mist",bigStat:"5:45",tag:"AM LAUNCH WINDOW",accent:[255,140,30],sky:["#020100","#0d0800","#2a1a00","#5c3a00","#8B5E00"],mood:"sunrise",cards:[{icon:"⏰",num:"5:45",unit:"AM",label:"Launch Window",bar:100},{icon:"🚐",num:"FREE",unit:"PICKUP",label:"Hotel Transfer",bar:80},{icon:"🥂",num:"FREE",unit:"BRUNCH",label:"Post-Flight",bar:85},{icon:"🏅",num:"CERT",unit:"FLIGHT",label:"Certificate",bar:70},{icon:"🔥",num:"450",unit:"°C",label:"Air Inside Balloon",bar:85}]},{id:3,tab:"🌪️ Storm Warning",title:"STORM WARNING",subtitle:"When Nature Calls",bigStat:"100%",tag:"WEATHER GUARANTEE",accent:[180,210,240],sky:["#1a2030","#253045","#2d3a55","#1e2d42","#162035"],mood:"storm",cards:[{icon:"🌬️",num:"25+",unit:"KM/H",label:"Ground Winds",bar:70},{icon:"✈️",num:"DCAA",unit:"CERT",label:"Aviation Auth.",bar:100},{icon:"🛡️",num:"100%",unit:"SAFETY",label:"Weather Check",bar:100},{icon:"🔄",num:"FREE",unit:"REBOOK",label:"Rain/Wind Cancel",bar:100},{icon:"📞",num:"24/7",unit:"LINE",label:"Emergency Team",bar:100}]}],},
  "camel-riding":{title:"Camel Riding Dubai",subtitle:"Desert Reserve · Dubai, UAE",coords:"25.0900° N · 55.4500° E",alt:"ALT: 210m",est:"EST. 2015 · 9 YRS",silhouette:"camel",ticker:["🐪 Arabian camels store fat (not water) in their humps","🌡️ Camels withstand body temps from 34°C to 41°C","💧 A camel can drink 200 litres of water in 3 minutes","👁️ Camels have three eyelids — one transparent","🏆 Dubai Camel Racing Club hosts 300+ races/season","🐪 Prize racing camel costs up to AED 10 million","🦶 Camel footpads are 2x wider than ankle — sand tyres","🌿 Camels eat 30+ plant species in UAE desert","📅 Al Dhafra camel beauty pageant — world's largest","🧬 Camel milk has 3x more Vitamin C than cow's milk","🐪 UAE has 300,000+ camels — most per capita","🏃 Racing camels sustain 65 km/h for 10 seconds","🌙 Camels navigate by stars — Bedouin compasses","🔬 Camel antibodies studied for treatments","🎖️ Camel is UAE national symbol since 1971","📸 Instagram camel photos get 2M+ likes monthly"],scenes:[{id:0,tab:"🐪 Desert Stroll",title:"DESERT STROLL",subtitle:"Ride the Ship of the Desert",bigStat:"AED 150",tag:"PER PERSON · 20 MIN RIDE",accent:[220,180,100],sky:["#FF6B35","#FF8C42","#FFA550","#FFB347","#FFD166"],mood:"golden",cards:[{icon:"🐪",num:"20",unit:"MIN",label:"Ride Duration",bar:35},{icon:"📸",num:"FREE",unit:"PHOTOS",label:"With Camel",bar:90},{icon:"👘",num:"FREE",unit:"DRESS",label:"Arabic Outfit",bar:85},{icon:"🌡️",num:"41°",unit:"MAX°C",label:"Camel Body Temp",bar:75},{icon:"🏆",num:"10M",unit:"AED",label:"Prize Camel Price",bar:100}]},{id:1,tab:"🌙 Moonlit Caravan",title:"MOONLIT CARAVAN",subtitle:"Ancient Trade Route Magic",bigStat:"2000+",tag:"YEARS OF CAMEL TRADE",accent:[150,200,255],sky:["#000a14","#001428","#001e3d","#002855","#001428"],mood:"night",cards:[{icon:"🌙",num:"2000+",unit:"YRS",label:"Caravan History",bar:100},{icon:"⭐",num:"250K",unit:"STARS",label:"Night Sky",bar:100},{icon:"🔥",num:"1",unit:"BONFIRE",label:"Desert Camp",bar:70},{icon:"🧆",num:"FREE",unit:"SNACKS",label:"Dates & Coffee",bar:80},{icon:"🎵",num:"LIVE",unit:"OUD",label:"Arabic Music",bar:75}]},{id:2,tab:"🌄 Sunrise Trek",title:"SUNRISE TREK",subtitle:"Greet the Day on Camelback",bigStat:"6:15",tag:"AM GOLDEN HOUR",accent:[255,140,50],sky:["#040100","#160800","#3d2000","#7a4000","#b86000"],mood:"sunrise",cards:[{icon:"🌅",num:"6:15",unit:"AM",label:"Sunrise Time",bar:100},{icon:"🐪",num:"300K",unit:"COUNT",label:"UAE Camels",bar:100},{icon:"💧",num:"200L",unit:"DRINK",label:"Camel Water Cap",bar:80},{icon:"🦶",num:"2x",unit:"WIDER",label:"Foot Pad Size",bar:65},{icon:"☕",num:"FREE",unit:"CHAI",label:"Karak Tea",bar:85}]},{id:3,tab:"🌪️ Sirocco Wind",title:"SIROCCO WIND",subtitle:"Desert Wind Rising",bigStat:"65",tag:"KM/H RACING SPEED",accent:[200,170,110],sky:["#6b4a1a","#8B6020","#A0752a","#b58930","#8B6520"],mood:"storm",cards:[{icon:"🏃",num:"65",unit:"KM/H",label:"Racing Speed",bar:95},{icon:"🌡️",num:"34-41",unit:"°C",label:"Body Temp Range",bar:70},{icon:"👁️",num:"3",unit:"EYELIDS",label:"Sand Protection",bar:100},{icon:"🛡️",num:"SAFE",unit:"RIDE",label:"Expert Handlers",bar:100},{icon:"📅",num:"300+",unit:"RACES",label:"Per Season",bar:85}]}],},
  "city-tour":{title:"Private City Tour Dubai",subtitle:"Downtown Dubai · UAE",coords:"25.1972° N · 55.2744° E",alt:"ALT: 0–828m",est:"EST. 2015 · 9 YRS",silhouette:"city",ticker:["🏙️ Dubai has 130+ buildings over 150m tall","🏗️ Burj Khalifa stands 828m — tallest on Earth","🛍️ Dubai Mall receives 80 million visitors/year","🚇 Dubai Metro covers 90km — opened 2009","🌴 Dubai has 2 million palm trees since 1990","✈️ Dubai International handles 90M passengers/year","🏆 Dubai is World's Most Visited City 2024","🌊 Palm Jumeirah increased coastline by 500 km","🚗 UAE has world's lowest fuel — AED 2.89/litre","💻 Dubai ranks #1 globally for AI government use","🌡️ Dubai averages 342 sunny days per year","🏟️ Expo City Dubai hosted 25M visitors in 6 months","🌍 196 nationalities live in Dubai","🦋 Dubai Butterfly Garden has 15,000 live butterflies","🌆 Dubai has 5 different skylines to photograph","🚁 Air taxi VTOL network planned for Dubai 2030"],scenes:[{id:0,tab:"🌅 Golden Skyline",title:"GOLDEN SKYLINE",subtitle:"The City That Never Sleeps",bigStat:"AED 350",tag:"PRIVATE FULL DAY TOUR",accent:[255,180,50],sky:["#FF4500","#FF6B35","#FF8C42","#FFA550","#FFD166"],mood:"golden",cards:[{icon:"⏱️",num:"8",unit:"HRS",label:"Full Day Tour",bar:80},{icon:"🏙️",num:"10+",unit:"STOPS",label:"Landmarks",bar:85},{icon:"🚗",num:"1",unit:"PRIVATE",label:"Vehicle + Guide",bar:100},{icon:"📸",num:"100+",unit:"PHOTOS",label:"Best Spots",bar:90},{icon:"🍽️",num:"LUNCH",unit:"FREE",label:"Restaurant",bar:80}]},{id:1,tab:"🌃 Neon Night",title:"NEON CITY NIGHT",subtitle:"Dubai After Dark",bigStat:"130+",tag:"TOWERS OVER 150M",accent:[80,180,255],sky:["#000510","#000a20","#000f30","#001440","#000820"],mood:"night",cards:[{icon:"🏗️",num:"828",unit:"M",label:"Burj Khalifa",bar:100},{icon:"🛍️",num:"80M",unit:"VISITS",label:"Dubai Mall/Year",bar:95},{icon:"💡",num:"130+",unit:"TOWERS",label:"Lit Skyline",bar:100},{icon:"🚇",num:"90",unit:"KM",label:"Metro Network",bar:70},{icon:"✈️",num:"90M",unit:"PAX/YR",label:"DXB Airport",bar:99}]},{id:2,tab:"🌄 Morning City",title:"MORNING CITY",subtitle:"Dubai at First Light",bigStat:"196",tag:"NATIONALITIES IN DUBAI",accent:[255,130,40],sky:["#020100","#100800","#2a1500","#5c3000","#8B5500"],mood:"sunrise",cards:[{icon:"🌍",num:"196",unit:"NATIONS",label:"Live in Dubai",bar:100},{icon:"🌴",num:"2M+",unit:"PALMS",label:"Planted Trees",bar:80},{icon:"☀️",num:"342",unit:"DAYS",label:"Sunshine/Year",bar:94},{icon:"🏗️",num:"1960",unit:"AD",label:"Modern Dubai Born",bar:100},{icon:"🚁",num:"2030",unit:"GOAL",label:"Air Taxis",bar:45}]},{id:3,tab:"⛈️ Thunder Dubai",title:"THUNDER OVER DUBAI",subtitle:"Storm Meets Skyline",bigStat:"#1",tag:"MOST VISITED CITY 2024",accent:[180,210,250],sky:["#101520","#182030","#202a3a","#283040","#101825"],mood:"storm",cards:[{icon:"🏆",num:"#1",unit:"CITY",label:"Most Visited 2024",bar:100},{icon:"🌡️",num:"342",unit:"SUNNY",label:"Days Per Year",bar:94},{icon:"💻",num:"#1",unit:"AI",label:"Gov Adoption",bar:100},{icon:"🌊",num:"500",unit:"KM",label:"New Coastline",bar:85},{icon:"💰",num:"AED1",unit:"T+",label:"GDP 2024",bar:90}]}],},
  "buggy-ride":{title:"Buggy Ride Dubai",subtitle:"Big Red Dune · Al Ain Road, UAE",coords:"24.8000° N · 55.6000° E",alt:"ALT: 250m",est:"EST. 2015 · 9 YRS",silhouette:"buggy",ticker:["🏎️ Dune buggies reach 100 km/h across open desert flats","🏜️ Big Red is Dubai's largest sand dune — 100m tall","🔧 DubaiRovers buggies are 1000cc Polaris RZR machines","🎖️ Dune buggy sport originated in California in the 1960s","🌡️ Buggy engines cool faster in desert wind at 80+ km/h","🏆 Dubai hosts annual Desert Challenge — longest in Middle East","🦺 Roll cage, harness & helmet — full safety standard","🏔️ Al Ain road dunes reach heights of 100+ metres","📸 Action cameras mounted front, rear & driver cam","🔩 Polaris RZR has 120 horsepower — more than Toyota Corolla","🌬️ At speed, windscreen deflects 95% of sand particles","🛣️ Buggy track covers 15 km of unmarked desert terrain","⛽ Full tank for 3-hour desert adventure — all fuel included","🎮 Side-by-side buggy lets two ride together","🌅 Golden hour buggy ride creates perfect shadow photography","🏁 Buggy riders can request timed race mode on final stretch"],scenes:[{id:0,tab:"🏎️ Dune Bash",title:"DUNE BASH",subtitle:"100 km/h Over Big Red",bigStat:"AED 400",tag:"1 HR BUGGY · ALL INCLUSIVE",accent:[255,100,30],sky:["#FF3500","#FF5733","#FF6B35","#FF8c00","#FFAA00"],mood:"golden",cards:[{icon:"⚡",num:"100",unit:"KM/H",label:"Top Speed",bar:85},{icon:"🏔️",num:"100",unit:"M",label:"Big Red Height",bar:90},{icon:"🔧",num:"1000",unit:"CC",label:"Engine Size",bar:85},{icon:"💪",num:"120",unit:"HP",label:"Horsepower",bar:80},{icon:"🛣️",num:"15",unit:"KM",label:"Desert Track",bar:75}]},{id:1,tab:"🌙 Night Desert",title:"NIGHT DESERT RACE",subtitle:"LED Lights Cut the Dark",bigStat:"15",tag:"KM UNMARKED TRACK",accent:[200,100,255],sky:["#08001a","#0f0030","#180050","#0d0040","#0a0025"],mood:"night",cards:[{icon:"💡",num:"LED",unit:"LIGHTS",label:"Night Equipped",bar:90},{icon:"🎮",num:"2",unit:"SEATS",label:"Side-by-Side",bar:70},{icon:"📸",num:"4",unit:"CAMS",label:"Action Cameras",bar:80},{icon:"🌙",num:"FULL",unit:"MOON",label:"Best Night Ride",bar:85},{icon:"⭐",num:"4.9",unit:"/5",label:"Night Riders",bar:98}]},{id:2,tab:"🌄 Sunrise Dunes",title:"SUNRISE DUNES",subtitle:"Golden Light, Pure Speed",bigStat:"120",tag:"HP POLARIS RZR",accent:[255,150,20],sky:["#040100","#180900","#3d2000","#7a4500","#b06000"],mood:"sunrise",cards:[{icon:"🌅",num:"5:50",unit:"AM",label:"Sunrise Slot",bar:100},{icon:"⛽",num:"FREE",unit:"FUEL",label:"Full Tank",bar:100},{icon:"🦺",num:"FULL",unit:"KIT",label:"Safety Gear",bar:100},{icon:"📸",num:"GOLD",unit:"HR",label:"Best Photos",bar:95},{icon:"🏁",num:"RACE",unit:"MODE",label:"Timed Sprint",bar:75}]},{id:3,tab:"🌪️ Sand Tornado",title:"SAND TORNADO",subtitle:"Dust Devils of the Desert",bigStat:"95%",tag:"SAND BLOCKED BY SCREEN",accent:[210,180,100],sky:["#5c3d00","#7a5200","#9b6a00","#b87800","#8a5a00"],mood:"storm",cards:[{icon:"🌪️",num:"95%",unit:"BLOCK",label:"Screen Rating",bar:95},{icon:"🦺",num:"ROLL",unit:"CAGE",label:"Full Protection",bar:100},{icon:"🔄",num:"FREE",unit:"SWAP",label:"Storm Rebook",bar:90},{icon:"🏆",num:"CHAMP",unit:"2024",label:"Desert Challenge",bar:100},{icon:"📞",num:"24/7",unit:"HELP",label:"On-Track Support",bar:100}]}],},
};

// ─── SILHOUETTE DRAWING ───────────────────────────────────────────────────────
function drawSilhouette(ctx,type,W,H,cur){
  const base=H*0.68;ctx.save();
  if(type==="desert"){
    const dc=cur.mood==="night"?"#1a1206":cur.mood==="storm"?"#5a3a00":"#c8832a";
    [0,1,2].forEach(i=>{ctx.beginPath();ctx.moveTo(0,H);for(let x=0;x<=W;x+=8)ctx.lineTo(x,base+i*18-90*Math.sin((x/W)*Math.PI*2+i)-40*Math.sin((x/W)*Math.PI*3+i*0.7));ctx.lineTo(W,H);ctx.closePath();ctx.fillStyle=i===0?dc:i===1?"#a06820":"#7a4f10";ctx.globalAlpha=0.9-i*0.15;ctx.fill();});
    ctx.globalAlpha=1;
    [[W*0.2,base-65],[W*0.5,base-80],[W*0.78,base-58]].forEach(([cx,cy])=>{ctx.fillStyle="#1a0a00";ctx.beginPath();ctx.ellipse(cx,cy,30,18,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(cx-8,cy-15,12,Math.PI,0);ctx.fill();ctx.fillRect(cx+15,cy-24,7,20);ctx.beginPath();ctx.arc(cx+21,cy-27,9,0,Math.PI*2);ctx.fill();[-22,-8,8,22].forEach(lx=>ctx.fillRect(cx+lx-2,cy+16,4,24));});
    if(cur.mood==="night"){const fx=W*0.55,fy=H*0.73;["#ff6600","#ff4400","#ffaa00"].forEach((fc,fi)=>{ctx.fillStyle=fc;ctx.globalAlpha=0.8+0.2*Math.sin(Date.now()*0.01+fi);ctx.beginPath();ctx.moveTo(fx,fy-28-fi*8);ctx.quadraticCurveTo(fx+10,fy-10,fx+5,fy);ctx.quadraticCurveTo(fx-5,fy-12,fx,fy-28-fi*8);ctx.fill();});ctx.globalAlpha=1;}
  } else if(type==="quad"){
    const c=cur.mood==="night"?"#1a0a30":cur.mood==="storm"?"#5a3a10":"#c08030";
    ctx.beginPath();ctx.moveTo(0,H);for(let x=0;x<=W;x+=8)ctx.lineTo(x,base-65*Math.sin((x/W)*Math.PI*2.5)-30*Math.cos((x/W)*Math.PI));ctx.lineTo(W,H);ctx.closePath();ctx.fillStyle=c;ctx.fill();
    const qx=W*0.5,qy=base-35;ctx.fillStyle="#0a0a0a";ctx.beginPath();ctx.roundRect(qx-38,qy-22,76,32,8);ctx.fill();ctx.beginPath();ctx.roundRect(qx-16,qy-36,32,16,6);ctx.fill();
    [[qx-32,qy+12],[qx+32,qy+12]].forEach(([wx,wy])=>{ctx.beginPath();ctx.arc(wx,wy,20,0,Math.PI*2);ctx.fillStyle="#111";ctx.fill();ctx.beginPath();ctx.arc(wx,wy,11,0,Math.PI*2);ctx.fillStyle="#2a2a2a";ctx.fill();});
    ctx.fillStyle="#0a0a0a";ctx.fillRect(qx-28,qy-42,56,7);
  } else if(type==="dhow"){
    ctx.fillStyle=cur.mood==="night"?"#001533":cur.mood==="storm"?"#152535":"#0a3a6a";ctx.fillRect(0,base,W,H-base);
    const dx=W*0.5,dy=base-22;ctx.fillStyle="#2a1500";ctx.beginPath();ctx.moveTo(dx-95,dy);ctx.lineTo(dx+95,dy);ctx.lineTo(dx+75,dy+35);ctx.lineTo(dx-75,dy+35);ctx.closePath();ctx.fill();
    ctx.fillStyle="#0a0500";ctx.fillRect(dx-5,dy-110,10,115);ctx.fillStyle="#f5e6c8";ctx.globalAlpha=0.9;ctx.beginPath();ctx.moveTo(dx,dy-110);ctx.lineTo(dx+75,dy-35);ctx.lineTo(dx,dy);ctx.closePath();ctx.fill();ctx.globalAlpha=1;
  } else if(type==="balloon"){
    ctx.fillStyle=cur.mood==="night"?"#0a0800":cur.mood==="storm"?"#3a2800":"#7a5020";ctx.fillRect(0,base+25,W,H);
    const bx=W*0.5,by=H*0.28;["#FF3300","#FFAA00","#FF3300","#FFAA00","#FF3300","#FFAA00"].forEach((sc,i)=>{ctx.save();ctx.beginPath();ctx.ellipse(bx,by,68,95,0,0,Math.PI*2);ctx.clip();ctx.fillStyle=sc;ctx.fillRect(bx-68+i*23,by-95,23,190);ctx.restore();});
    ctx.strokeStyle="rgba(0,0,0,0.25)";ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(bx,by,68,95,0,0,Math.PI*2);ctx.stroke();
    ctx.strokeStyle="#555";ctx.lineWidth=1.5;[[-52,-58],[-26,-88],[26,-88],[52,-58]].forEach(([rx,ry])=>{ctx.beginPath();ctx.moveTo(bx+rx,by-ry);ctx.lineTo(bx-22,by+105);ctx.stroke();ctx.beginPath();ctx.moveTo(bx+rx,by-ry);ctx.lineTo(bx+22,by+105);ctx.stroke();});
    ctx.fillStyle="#8B5E3C";ctx.beginPath();ctx.roundRect(bx-26,by+100,52,32,5);ctx.fill();
  } else if(type==="camel"){
    ctx.fillStyle=cur.mood==="night"?"#0a0800":cur.mood==="storm"?"#5a3a10":"#c87830";for(let x=0;x<=W;x+=10)ctx.fillRect(x,base+5*Math.sin(x/80),14,H);
    const cx=W*0.5,cy=base-65;ctx.fillStyle=cur.mood==="night"?"#1a0e00":"#2a1500";ctx.beginPath();ctx.ellipse(cx,cy,65,38,-0.1,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(cx-20,cy-33,24,Math.PI,0);ctx.fill();ctx.save();ctx.translate(cx+42,cy-18);ctx.rotate(-0.3);ctx.fillRect(-8,-55,17,58);ctx.restore();ctx.beginPath();ctx.ellipse(cx+63,cy-53,20,15,-0.2,0,Math.PI*2);ctx.fill();[cx-42,cx-22,cx+12,cx+32].forEach(lx=>ctx.fillRect(lx-5,cy+33,10,52));
  } else if(type==="city"){
    ctx.fillStyle=cur.mood==="night"?"#0a1020":cur.mood==="storm"?"#151a25":"#1a2030";ctx.fillRect(0,base+10,W,H);
    [{x:W*0.05,w:40,h:120},{x:W*0.12,w:30,h:200},{x:W*0.2,w:50,h:160},{x:W*0.3,w:35,h:280},{x:W*0.38,w:45,h:180},{x:W*0.48,w:30,h:240},{x:W*0.57,w:55,h:200},{x:W*0.65,w:40,h:320},{x:W*0.75,w:35,h:180},{x:W*0.83,w:50,h:150},{x:W*0.9,w:30,h:200}].forEach(b=>{ctx.fillStyle=cur.mood==="night"?"#0d1525":"#111a28";ctx.fillRect(b.x-b.w/2,base-b.h,b.w,b.h+15);if(cur.mood==="night"){for(let wy=base-b.h+8;wy<base;wy+=14)for(let wx2=b.x-b.w/2+4;wx2<b.x+b.w/2-4;wx2+=8)if(Math.random()>0.35){ctx.fillStyle=`rgba(255,220,100,${0.5+Math.random()*0.5})`;ctx.fillRect(wx2,wy,5,8);}ctx.fillStyle="#ff4444";ctx.beginPath();ctx.arc(b.x,base-b.h-8,3,0,Math.PI*2);ctx.fill();}});
    ctx.fillStyle=cur.mood==="night"?"#1a2535":"#202d3a";ctx.beginPath();ctx.moveTo(W*0.65-6,base-345);ctx.lineTo(W*0.65+6,base-345);ctx.lineTo(W*0.65+22,base-205);ctx.lineTo(W*0.65-22,base-205);ctx.closePath();ctx.fill();
  } else if(type==="buggy"){
    const dc2=cur.mood==="night"?"#100800":cur.mood==="storm"?"#6b4a00":"#d4900a";ctx.beginPath();ctx.moveTo(0,H);ctx.bezierCurveTo(W*0.1,base-55,W*0.3,base-125,W*0.5,base-85);ctx.bezierCurveTo(W*0.7,base-145,W*0.85,base-65,W,base-35);ctx.lineTo(W,H);ctx.closePath();ctx.fillStyle=dc2;ctx.fill();
    const bx2=W*0.48,by2=base-75;ctx.fillStyle="#0a0a0a";ctx.beginPath();ctx.roundRect(bx2-48,by2-28,96,44,5);ctx.fill();[[bx2-38,by2+20],[bx2+38,by2+20]].forEach(([wx2,wy2])=>{ctx.beginPath();ctx.arc(wx2,wy2,24,0,Math.PI*2);ctx.fillStyle="#111";ctx.fill();ctx.beginPath();ctx.arc(wx2,wy2,13,0,Math.PI*2);ctx.fillStyle="#2a2a2a";ctx.fill();});
  }
  ctx.restore();
}

// ─── DRAW ALL UI ON CANVAS ────────────────────────────────────────────────────
function drawUI(ctx,W,H,tour,cur,frame,tickerOffset,dubaiTime){
  const [ar,ag,ab]=cur.accent;
  const acc=`rgb(${ar},${ag},${ab})`;
  const accA=(a)=>`rgba(${ar},${ag},${ab},${a})`;

  // Ghost number background
  ctx.save();ctx.font=`bold ${W*0.3}px Arial Black,sans-serif`;ctx.fillStyle=accA(0.05);ctx.textAlign="right";ctx.textBaseline="bottom";ctx.fillText(`0${cur.id+1}`,W-18,H-18);ctx.restore();

  // ── LARGE FLOATING INFO CARDS ──
  // Card dimensions — BIG and beautiful
  const CW=240,CH=155;
  // Floating offsets — each card bobs independently
  const floats=[
    Math.sin(frame*0.022+0.0)*18,
    Math.sin(frame*0.018+1.2)*20,
    Math.sin(frame*0.025+2.4)*16,
    Math.sin(frame*0.020+0.8)*19,
    Math.sin(frame*0.023+3.6)*17,
  ];
  // Positions: left side (3) and right side (2)
  const BASE_POS=[
    {x:28,  y:H*0.12},{x:28,  y:H*0.37},{x:28,  y:H*0.60},
    {x:W-CW-28,y:H*0.12},{x:W-CW-28,y:H*0.37},
  ];

  cur.cards.forEach((card,i)=>{
    const {x:cx,y:baseY}=BASE_POS[i];
    const cy=baseY+floats[i]; // floating y position

    // Shadow glow
    ctx.save();
    ctx.shadowColor=accA(0.3);ctx.shadowBlur=22;
    // Dark glass background
    ctx.globalAlpha=0.88;
    ctx.fillStyle="rgba(10,8,4,0.92)";
    ctx.beginPath();ctx.roundRect(cx,cy,CW,CH,18);ctx.fill();
    ctx.globalAlpha=1;ctx.shadowBlur=0;

    // Accent border
    ctx.strokeStyle=accA(0.55);ctx.lineWidth=1.5;
    ctx.beginPath();ctx.roundRect(cx,cy,CW,CH,18);ctx.stroke();

    // Top accent line
    ctx.fillStyle=acc;ctx.globalAlpha=0.8;
    ctx.beginPath();ctx.roundRect(cx+18,cy,60,3,2);ctx.fill();
    ctx.globalAlpha=1;

    // Icon — BIG
    ctx.font="32px serif";ctx.textAlign="left";ctx.textBaseline="top";
    ctx.fillText(card.icon,cx+16,cy+16);

    // Number — LARGE
    ctx.font="bold 44px Arial Black,sans-serif";ctx.fillStyle=acc;
    ctx.shadowColor=acc;ctx.shadowBlur=12;
    ctx.fillText(card.num,cx+16,cy+52);ctx.shadowBlur=0;

    // Unit — next to number
    const nw=ctx.measureText(card.num).width;
    ctx.font="bold 16px Arial";ctx.fillStyle=accA(0.8);
    ctx.fillText(card.unit,cx+20+nw,cy+72);

    // Label
    ctx.font="13px Arial";ctx.fillStyle="rgba(255,255,255,0.55)";
    ctx.fillText(card.label,cx+16,cy+100);

    // Bar track
    ctx.fillStyle="rgba(255,255,255,0.1)";
    ctx.beginPath();ctx.roundRect(cx+16,cy+125,CW-32,5,3);ctx.fill();
    // Bar fill — animated
    const barW=(CW-32)*(card.bar/100);
    const barGrad=ctx.createLinearGradient(cx+16,0,cx+16+barW,0);
    barGrad.addColorStop(0,acc);barGrad.addColorStop(1,accA(0.4));
    ctx.fillStyle=barGrad;
    ctx.beginPath();ctx.roundRect(cx+16,cy+125,barW,5,3);ctx.fill();

    ctx.restore();
  });

  // ── BIG STAT ──
  ctx.save();ctx.textAlign="right";
  ctx.font=`bold ${Math.min(72,W*0.05)}px Arial Black,sans-serif`;
  ctx.fillStyle=acc;ctx.shadowColor=acc;ctx.shadowBlur=22;
  ctx.textBaseline="bottom";ctx.fillText(cur.bigStat,W*0.965,H*0.56);ctx.shadowBlur=0;
  ctx.font=`bold 14px Arial`;ctx.fillStyle="rgba(255,255,255,0.55)";
  ctx.fillText(cur.tag,W*0.965,H*0.56+22);
  ctx.restore();

  // ── MAIN HEADLINE ──
  ctx.save();ctx.textAlign="center";ctx.textBaseline="bottom";
  ctx.font=`bold ${Math.min(115,W*0.085)}px Arial Black,sans-serif`;
  ctx.fillStyle="#fff";ctx.shadowColor="rgba(0,0,0,0.6)";ctx.shadowBlur=32;
  ctx.fillText(cur.title,W/2,H*0.73);ctx.shadowBlur=0;
  ctx.font=`bold ${Math.min(20,W*0.014)}px Arial`;ctx.fillStyle=acc;
  ctx.fillText(cur.subtitle.toUpperCase(),W/2,H*0.73+34);
  ctx.restore();

  // ── SCENE TABS ──
  const tabs=tour.scenes;const tw=155,tg=10,totalW=tabs.length*(tw+tg)-tg;
  const tabStartX=W/2-totalW/2;const tabY=H-165;
  ctx.save();
  tabs.forEach((s,i)=>{
    const tx=tabStartX+i*(tw+tg),isAct=s.id===cur.id;
    ctx.globalAlpha=isAct?1:0.88;
    ctx.fillStyle=isAct?acc:"rgba(0,0,0,0.5)";
    ctx.strokeStyle=isAct?"transparent":"rgba(255,255,255,0.2)";ctx.lineWidth=1.5;
    ctx.beginPath();ctx.roundRect(tx,tabY,tw,38,19);ctx.fill();if(!isAct)ctx.stroke();
    ctx.fillStyle=isAct?"#000":"rgba(255,255,255,0.8)";ctx.globalAlpha=1;
    ctx.font="bold 14px Arial";ctx.textAlign="center";ctx.textBaseline="middle";
    ctx.fillText(s.tab,tx+tw/2,tabY+19);
  });ctx.restore();

  // ── TICKER ──
  const tickH=44;
  ctx.save();
  ctx.fillStyle="rgba(0,0,0,0.82)";ctx.fillRect(0,H-tickH,W,tickH);
  ctx.strokeStyle="rgba(255,255,255,0.1)";ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(0,H-tickH);ctx.lineTo(W,H-tickH);ctx.stroke();
  const tickFull=[...tour.ticker,...tour.ticker].join("   ◆   ");
  const offset=(tickerOffset*1.2)%(W*2.2);
  ctx.font="bold 14px Arial";ctx.fillStyle="rgba(255,255,255,0.8)";
  ctx.textAlign="left";ctx.textBaseline="middle";
  ctx.fillText(tickFull,-offset,H-tickH/2);
  ctx.fillText(tickFull,W*2.2-offset,H-tickH/2);
  ctx.restore();

  // ── PROGRESS BAR ──
  const progress=(frame%480)/480;
  ctx.save();ctx.fillStyle=accA(0.22);ctx.fillRect(0,H-tickH-3,W,3);
  ctx.fillStyle=acc;ctx.fillRect(0,H-tickH-3,W*progress,3);ctx.restore();

  // ── TOP GRADIENT ──
  ctx.save();const topG=ctx.createLinearGradient(0,0,0,80);
  topG.addColorStop(0,"rgba(0,0,0,0.7)");topG.addColorStop(1,"transparent");
  ctx.fillStyle=topG;ctx.fillRect(0,0,W,80);ctx.restore();

  // ── TOUR TITLE ──
  ctx.save();ctx.textAlign="center";ctx.textBaseline="top";
  ctx.font="bold 22px Arial";ctx.fillStyle="#fff";
  ctx.fillText(tour.title.toUpperCase(),W/2,14);
  ctx.font="11px monospace";ctx.fillStyle="rgba(255,255,255,0.5)";
  ctx.fillText(`${tour.subtitle}  ·  ${tour.est}`,W/2,42);
  ctx.restore();

  // ── CLOCK + COORDS ──
  ctx.save();ctx.textAlign="right";ctx.textBaseline="top";
  const clkTxt=`GST ${dubaiTime}`;
  const clkW=ctx.measureText(clkTxt).width+28;
  ctx.fillStyle="rgba(0,0,0,0.5)";ctx.strokeStyle="rgba(255,255,255,0.12)";ctx.lineWidth=1;
  ctx.beginPath();ctx.roundRect(W-clkW-10,10,clkW,28,7);ctx.fill();ctx.stroke();
  ctx.font="bold 14px monospace";ctx.fillStyle="rgba(255,255,255,0.95)";ctx.fillText(clkTxt,W-10-4,17);
  ctx.font="11px monospace";ctx.fillStyle="rgba(255,255,255,0.45)";ctx.fillText(`${tour.coords}  ·  ${tour.alt}`,W-10,44);
  ctx.restore();

  // ── SCENE COUNTER ──
  ctx.save();ctx.font="12px monospace";ctx.fillStyle="rgba(255,255,255,0.4)";
  ctx.textAlign="right";ctx.textBaseline="top";
  ctx.fillText(`${String(cur.id+1).padStart(2,"0")} / ${String(tour.scenes.length).padStart(2,"0")}`,W-20,H-tickH-28);ctx.restore();

  // ── BRANDING BAR ──
  ctx.save();
  const bW=400,bH=38,bX=W/2-bW/2,bY=H-tickH-58;
  ctx.fillStyle="rgba(0,0,0,0.72)";ctx.strokeStyle="rgba(255,255,255,0.1)";ctx.lineWidth=1;
  ctx.beginPath();ctx.roundRect(bX,bY,bW,bH,bH/2);ctx.fill();ctx.stroke();
  ctx.fillStyle=acc;ctx.beginPath();ctx.arc(bX+22,bY+bH/2,14,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="#000";ctx.font="bold 13px Arial";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText("S",bX+22,bY+bH/2);
  ctx.textAlign="left";ctx.font="bold 15px Arial";ctx.fillStyle="#fff";ctx.fillText("SALMAN",bX+42,bY+bH/2);
  ctx.fillStyle="rgba(255,255,255,0.25)";ctx.fillText(" · ",bX+105,bY+bH/2);
  ctx.fillStyle=acc;ctx.fillText("Coding Master",bX+122,bY+bH/2);
  ctx.fillStyle="rgba(255,255,255,0.25)";ctx.fillText(" · ",bX+248,bY+bH/2);
  ctx.fillStyle="rgba(255,255,255,0.65)";ctx.font="12px monospace";ctx.fillText("+971 544 735 060",bX+265,bY+bH/2);
  ctx.restore();
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function ShowcasePage(){
  const params=useParams();const router=useRouter();
  const rawSlug=params?.slug||"desert-safari";
  const slug=getShowcaseSlug(rawSlug);
  const tour=TOURS_DATA[slug]||TOURS_DATA["desert-safari"];

  const canvasRef=useRef(null);const rafRef=useRef(null);const recorderRef=useRef(null);const chunksRef=useRef([]);
  const frameRef=useRef(0);const tickerRef=useRef(0);

  const [scene,setScene]=useState(0);const [transition,setTransition]=useState(1);
  const [time,setTime]=useState("");const [isAdmin,setIsAdmin]=useState(false);
  const [showAdminPanel,setShowAdminPanel]=useState(false);const [showAdminLogin,setShowAdminLogin]=useState(false);
  const [adminPass,setAdminPass]=useState("");const [adminError,setAdminError]=useState(false);
  const [speed,setSpeed]=useState(1);const [recording,setRecording]=useState(false);
  const [recordProgress,setRecordProgress]=useState(0);const [showDlMenu,setShowDlMenu]=useState(false);
  const [particles]=useState(()=>Array.from({length:35},(_,i)=>({x:Math.random(),y:Math.random(),size:Math.random()*3+1,spd:Math.random()*0.3+0.1,op:Math.random()*0.5+0.1,dir:Math.random()*Math.PI*2})));

  const scenes=tour.scenes;const cur=scenes[scene];const [ar,ag,ab]=cur.accent;const accentCSS=`rgb(${ar},${ag},${ab})`;

  useEffect(()=>{const tick=()=>{const d=new Date();const du=new Date(d.getTime()+(4*60+d.getTimezoneOffset())*60000);setTime(du.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit"}));};tick();const id=setInterval(tick,1000);return()=>clearInterval(id);},[]);
  useEffect(()=>{if(typeof window!=="undefined"&&localStorage.getItem("dr_admin_auth")==="true")setIsAdmin(true);},[]);
  useEffect(()=>{const ms=8000/speed;const id=setInterval(()=>{setTransition(0);setTimeout(()=>{setScene(s=>(s+1)%scenes.length);setTransition(1);},350);},ms);return()=>clearInterval(id);},[speed,scenes.length]);

  // Canvas loop
  useEffect(()=>{
    const canvas=canvasRef.current;if(!canvas)return;
    const ctx=canvas.getContext("2d");let frame=0;
    const loop=()=>{
      frame++;frameRef.current=frame;tickerRef.current+=1.2;
      const W=canvas.width,H=canvas.height;
      ctx.clearRect(0,0,W,H);
      // Sky gradient
      const gr=ctx.createLinearGradient(0,0,0,H);cur.sky.forEach((c,i)=>gr.addColorStop(i/(cur.sky.length-1),c));ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);
      // Stars (night)
      if(cur.mood==="night"){for(let i=0;i<260;i++){const sx=(i*73)%W,sy=(i*137)%(H*0.65),tw=0.4+0.6*Math.sin(frame*0.04+i);ctx.fillStyle=`rgba(255,255,255,${tw*0.85})`;ctx.beginPath();ctx.arc(sx,sy,i%3===0?1.5:0.8,0,Math.PI*2);ctx.fill();}}
      // Sun/Moon
      const sunX=W*0.74+Math.sin(frame*0.002)*18,sunY=H*0.17+Math.cos(frame*0.003)*8;
      if(cur.mood==="night"){ctx.fillStyle="#fffce0";ctx.shadowColor="#fffce0";ctx.shadowBlur=28;ctx.beginPath();ctx.arc(sunX,sunY,22,0,Math.PI*2);ctx.fill();ctx.fillStyle=cur.sky[1];ctx.beginPath();ctx.arc(sunX+12,sunY-6,18,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;}
      else{ctx.shadowColor=accentCSS;ctx.shadowBlur=45;const sg=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,52);sg.addColorStop(0,"#fff9e0");sg.addColorStop(0.4,accentCSS.replace("rgb","rgba").replace(")",",0.9)"));sg.addColorStop(1,"transparent");ctx.fillStyle=sg;ctx.beginPath();ctx.arc(sunX,sunY,52,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;}
      // Lightning
      if(cur.mood==="storm"&&Math.random()<0.007){ctx.strokeStyle="rgba(220,240,255,0.85)";ctx.lineWidth=1.5;const lx=Math.random()*W;ctx.beginPath();ctx.moveTo(lx,0);let cy3=0;while(cy3<H*0.55){ctx.lineTo(lx+(Math.random()-0.5)*55,cy3+=28+Math.random()*35);}ctx.stroke();}
      // Particles
      particles.forEach(p=>{const px=((p.x+frame*p.spd*0.0003)%1)*W,py=((p.y+Math.sin(frame*0.02+p.dir)*0.001)%1)*(H*0.78);ctx.fillStyle=`rgba(255,255,255,${p.op*0.35})`;ctx.beginPath();ctx.arc(px,py,p.size*0.55,0,Math.PI*2);ctx.fill();});
      // Silhouette
      drawSilhouette(ctx,tour.silhouette,W,H,cur);
      // ALL UI (big cards with float animations)
      const d=new Date();const du=new Date(d.getTime()+(4*60+d.getTimezoneOffset())*60000);
      const ts=du.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit"});
      drawUI(ctx,W,H,tour,cur,frame,tickerRef.current,ts);
      rafRef.current=requestAnimationFrame(loop);
    };
    loop();return()=>cancelAnimationFrame(rafRef.current);
  },[cur,scene,particles,tour,accentCSS]);

  const switchScene=(idx)=>{setTransition(0);setTimeout(()=>{setScene(idx);setTransition(1);},300);};

  const startRecording=useCallback((quality)=>{
    const canvas=canvasRef.current;if(!canvas||recording)return;
    const fps2=quality==="high"?60:30;const bitrate=quality==="high"?12000000:quality==="standard"?5000000:3000000;
    const stream=canvas.captureStream(fps2);
    const mimeTypes=["video/mp4;codecs=h264","video/webm;codecs=vp9","video/webm"];const mime=mimeTypes.find(m=>MediaRecorder.isTypeSupported(m))||"video/webm";
    chunksRef.current=[];
    const rec=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:bitrate});
    rec.ondataavailable=e=>{if(e.data.size>0)chunksRef.current.push(e.data);};
    rec.onstop=()=>{const blob=new Blob(chunksRef.current,{type:mime});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`${tour.title.replace(/\s+/g,"-")}-${quality}.${mime.includes("mp4")?"mp4":"webm"}`;a.click();URL.revokeObjectURL(url);setRecording(false);setRecordProgress(0);};
    setScene(0);recorderRef.current=rec;rec.start(100);setRecording(true);setShowDlMenu(false);
    const total=32000;const t0=Date.now();
    const pid=setInterval(()=>{const p=((Date.now()-t0)/total)*100;setRecordProgress(Math.min(p,100));if(p>=100)clearInterval(pid);},200);
    setTimeout(()=>{rec.stop();clearInterval(pid);},total);
  },[recording,tour]);

  const tryAdmin=()=>{if(adminPass===ADMIN_PASS){setIsAdmin(true);setShowAdminPanel(true);setShowAdminLogin(false);localStorage.setItem("dr_admin_auth","true");}else{setAdminError(true);setTimeout(()=>setAdminError(false),2000);}};
  const speedLabel=speed===0.5?"16s":speed===1?"8s":speed===2?"4s":speed===3?"2.7s":"1.6s";

  return(
    <div style={{position:"fixed",inset:0,background:"#000",overflow:"hidden",zIndex:9999}}>
      {/* Hide global navbar — crucial for clean showcase */}
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@500;600;700;800&family=Barlow:wght@300;400;500;600&family=Share+Tech+Mono&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        nav, header, .navbar, [class*="nav"], [class*="header"], [id*="nav"], [id*="header"] { display:none !important; }
        body > *:not(#__next) { display:none !important; }
        @keyframes rpulse{0%,100%{opacity:1}50%{opacity:0.3}}
      `}</style>

      {/* Canvas — draws everything including big floating cards */}
      <canvas ref={canvasRef} width={1920} height={1080} style={{position:"absolute",inset:0,width:"100%",height:"100%"}}/>

      {/* Interactive buttons only */}
      <button onClick={()=>router.back()} style={{position:"absolute",top:16,left:16,zIndex:20,display:"flex",alignItems:"center",gap:6,padding:"9px 16px",borderRadius:9,border:"1px solid rgba(255,255,255,0.2)",background:"rgba(0,0,0,0.55)",color:"rgba(255,255,255,0.9)",fontFamily:"Barlow Condensed,sans-serif",fontSize:15,fontWeight:600,cursor:"pointer",backdropFilter:"blur(8px)"}}>← Back</button>

      {!recording&&(<div style={{position:"absolute",top:16,right:showAdminPanel?326:16,zIndex:20,display:"flex",gap:8}}>
        <button onClick={()=>setShowDlMenu(s=>!s)} style={{display:"flex",alignItems:"center",gap:6,padding:"9px 18px",borderRadius:9,border:"none",background:accentCSS,color:"#000",fontFamily:"Barlow Condensed,sans-serif",fontSize:15,fontWeight:700,cursor:"pointer"}}>⬇️ Download</button>
        {isAdmin&&<button onClick={()=>setShowAdminPanel(s=>!s)} style={{padding:"9px 16px",borderRadius:9,border:"1px solid rgba(255,255,255,0.2)",background:"rgba(0,0,0,0.55)",color:"#fff",fontFamily:"Barlow Condensed,sans-serif",fontSize:15,fontWeight:600,cursor:"pointer",backdropFilter:"blur(8px)"}}>⚙️ Admin</button>}
      </div>)}

      {showDlMenu&&!recording&&(<>
        <div style={{position:"fixed",inset:0,zIndex:28}} onClick={()=>setShowDlMenu(false)}/>
        <div style={{position:"absolute",top:60,right:showAdminPanel?326:16,zIndex:30,background:"#1a1a1a",border:"1px solid rgba(255,255,255,0.12)",borderRadius:14,padding:12,minWidth:265,boxShadow:"0 16px 50px rgba(0,0,0,0.7)"}}>
          <div style={{fontFamily:"Barlow Condensed,sans-serif",fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10,padding:"0 4px"}}>Download Showcase Video</div>
          {[{icon:"🎬",name:"4K High Quality",desc:"60fps · 12Mbps · ~80MB",q:"high"},{icon:"📱",name:"1080p Standard",desc:"30fps · 5Mbps · ~25MB",q:"standard"},{icon:"⚡",name:"720p Fast",desc:"30fps · 3Mbps · ~15MB",q:"fast"}].map(opt=>(
            <div key={opt.q} onClick={()=>startRecording(opt.q)} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 12px",borderRadius:10,cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.07)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <span style={{fontSize:22}}>{opt.icon}</span>
              <div><div style={{fontSize:14,fontWeight:700,color:"#fff"}}>{opt.name}</div><div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:1}}>{opt.desc} · All 4 scenes (32s)</div></div>
            </div>
          ))}
        </div>
      </>)}

      {recording&&(<div style={{position:"absolute",inset:0,zIndex:50,background:"rgba(0,0,0,0.82)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20}}>
        <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(220,30,30,0.2)",border:"1px solid #ff4444",borderRadius:100,padding:"8px 20px"}}>
          <div style={{width:10,height:10,background:"#ff4444",borderRadius:"50%",animation:"rpulse 1s infinite"}}/>
          <span style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,color:"#ff4444",fontSize:14}}>REC · CAPTURING ALL 4 SCENES</span>
        </div>
        <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:42,color:"#fff"}}>RECORDING SHOWCASE</div>
        <div style={{fontFamily:"Barlow Condensed,sans-serif",fontSize:15,color:"rgba(255,255,255,0.6)"}}>{tour.title} · All cards, animations &amp; branding included</div>
        <div style={{width:420,maxWidth:"90vw",background:"rgba(255,255,255,0.1)",borderRadius:100,height:8,overflow:"hidden"}}>
          <div style={{height:"100%",background:"#ff4444",borderRadius:100,width:`${recordProgress}%`,transition:"width 0.3s"}}/>
        </div>
        <div style={{fontFamily:"Share Tech Mono,monospace",fontSize:13,color:"rgba(255,255,255,0.45)"}}>{Math.round(recordProgress)}% · Do not close this tab</div>
        <button onClick={()=>recorderRef.current?.stop()} style={{padding:"10px 24px",borderRadius:10,border:"1px solid rgba(255,255,255,0.2)",background:"rgba(50,50,50,0.8)",color:"#fff",fontFamily:"Barlow Condensed,sans-serif",fontSize:14,fontWeight:600,cursor:"pointer"}}>⏹ Stop Early</button>
      </div>)}

      {/* Invisible scene switcher buttons — overlay on tab positions at bottom */}
      <div style={{position:"absolute",bottom:"10%",left:"50%",transform:"translateX(-50%)",display:"flex",gap:10,zIndex:10}}>
        {scenes.map((s,i)=>(<button key={i} onClick={()=>switchScene(i)} style={{width:155,height:40,borderRadius:20,border:"none",background:"transparent",cursor:"pointer",opacity:0}}>{s.tab}</button>))}
      </div>

      {/* Admin login — tiny invisible */}
      {!isAdmin&&(<div style={{position:"absolute",bottom:62,left:14,zIndex:20}}>
        {!showAdminLogin
          ?<button onClick={()=>setShowAdminLogin(true)} style={{padding:"5px 10px",borderRadius:7,border:"1px solid rgba(255,255,255,0.07)",background:"rgba(0,0,0,0.3)",color:"rgba(255,255,255,0.15)",fontSize:11,cursor:"pointer"}}>🔐</button>
          :<div style={{display:"flex",gap:8}}>
            <input type="password" value={adminPass} onChange={e=>setAdminPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&tryAdmin()} placeholder="Admin password" style={{background:"rgba(0,0,0,0.7)",border:`1px solid ${adminError?"#ff4444":"rgba(255,255,255,0.15)"}`,borderRadius:8,padding:"7px 12px",color:"#fff",fontSize:13,width:160,outline:"none"}}/>
            <button onClick={tryAdmin} style={{background:"#E5B94E",border:"none",borderRadius:8,padding:"7px 14px",fontSize:13,fontWeight:700,color:"#000",cursor:"pointer"}}>→</button>
          </div>
        }
      </div>)}

      {/* Admin panel */}
      {showAdminPanel&&isAdmin&&(<div style={{position:"absolute",top:0,right:0,width:310,height:"100%",background:"rgba(8,8,8,0.96)",borderLeft:"1px solid rgba(255,255,255,0.1)",zIndex:40,padding:22,overflowY:"auto",backdropFilter:"blur(20px)"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
          <span style={{fontFamily:"Barlow Condensed,sans-serif",fontSize:18,fontWeight:800,color:"#fff"}}>⚙️ Showcase Admin</span>
          <button onClick={()=>setShowAdminPanel(false)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.5)",fontSize:18,cursor:"pointer"}}>✕</button>
        </div>
        <div style={{marginBottom:24}}>
          <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10}}>Animation Speed</div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:13,color:"rgba(255,255,255,0.8)"}}><span>Scene Duration</span><span style={{background:"rgba(229,185,78,0.12)",border:"1px solid rgba(229,185,78,0.3)",color:"#E5B94E",padding:"2px 9px",borderRadius:6,fontSize:12,fontWeight:700}}>{speedLabel}/scene</span></div>
          <input type="range" min="0.5" max="5" step="0.5" value={speed} onChange={e=>setSpeed(Number(e.target.value))} style={{width:"100%",accentColor:"#E5B94E"}}/>
        </div>
        <div style={{marginBottom:24}}>
          <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10}}>Record Video</div>
          {[{label:"🎬 4K Ultra (12Mbps)",q:"high"},{label:"📺 1080p HD (5Mbps)",q:"standard"},{label:"⚡ 720p Fast (3Mbps)",q:"fast"}].map(opt=>(<button key={opt.q} onClick={()=>{startRecording(opt.q);setShowAdminPanel(false);}} style={{width:"100%",padding:"10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.05)",color:"#fff",fontFamily:"Barlow Condensed,sans-serif",fontSize:14,fontWeight:700,cursor:"pointer",marginBottom:8,textAlign:"left"}}>{opt.label}</button>))}
        </div>
        <div style={{marginBottom:24}}>
          <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10}}>Jump to Scene</div>
          {scenes.map((s,i)=>(<button key={i} onClick={()=>switchScene(i)} style={{width:"100%",padding:"9px",borderRadius:9,border:"none",background:scene===i?accentCSS:"rgba(255,255,255,0.05)",color:scene===i?"#000":"rgba(255,255,255,0.8)",fontFamily:"Barlow Condensed,sans-serif",fontSize:14,fontWeight:700,cursor:"pointer",marginBottom:7}}>{s.tab}</button>))}
        </div>
      </div>)}
    </div>
  );
}
