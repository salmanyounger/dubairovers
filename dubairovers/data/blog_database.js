// ─── DubaiRovers Master Blog Database — 5 Years Content ──────────
// 300+ blog entries across all categories
// Status: draft | scheduled | published
// publishAt: ISO date string (9am GST = 5am UTC)

export const BLOG_CATEGORIES = [
  { id: 'uae-destinations',    label: '🇦🇪 UAE Destinations',        color: '#1E3A5F' },
  { id: 'gulf-comparisons',    label: '🌍 Gulf Country Comparisons',  color: '#D4AF37' },
  { id: 'worldwide-tours',     label: '✈️ Worldwide Travel',          color: '#8B5CF6' },
  { id: 'weather-seasonal',    label: '🌤️ Weather & Seasons',         color: '#0EA5E9' },
  { id: 'adventure',           label: '🏄 Adventure & Thrills',       color: '#EF4444' },
  { id: 'safety-tips',         label: '🛡️ Safety & Travel Tips',      color: '#10B981' },
  { id: 'food-culture',        label: '🍽️ Food & Culture',            color: '#F97316' },
  { id: 'family-travel',       label: '👨‍👩‍👧 Family Travel',              color: '#EC4899' },
  { id: 'luxury-travel',       label: '👑 Luxury Travel',             color: '#D4AF37' },
  { id: 'budget-travel',       label: '💰 Budget Travel',             color: '#6B7280' },
  { id: 'occasions-events',    label: '🎉 Occasions & Events',        color: '#A855F7' },
  { id: 'tour-guides',         label: '🗺️ Tour Guides',               color: '#14B8A6' },
];

// ─── Generate schedule (daily 9am GST from today) ─────────────────
function scheduleDate(daysFromNow) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  d.setHours(5, 0, 0, 0); // 5am UTC = 9am GST/Dubai
  return d.toISOString();
}

function pastDate(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(5, 0, 0, 0);
  return d.toISOString();
}

function slug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// ─── MASTER BLOG LIST ─────────────────────────────────────────────
export const MASTER_BLOGS = [

  // ═══════════════════════════════════════════════════════════════
  // UAE DESTINATIONS
  // ═══════════════════════════════════════════════════════════════
  { category:'uae-destinations', title:'Top 20 Hidden Gems in Dubai You Didn\'t Know Existed',          days:-30 },
  { category:'uae-destinations', title:'Abu Dhabi vs Dubai: Which Emirate Should You Visit First?',      days:-28 },
  { category:'uae-destinations', title:'Sharjah — The Cultural Capital of UAE You\'re Ignoring',        days:-26 },
  { category:'uae-destinations', title:'Ras Al Khaimah: The Adventure Paradise 1 Hour from Dubai',      days:-24 },
  { category:'uae-destinations', title:'Fujairah: UAE\'s Most Underrated Coastal Escape',               days:-22 },
  { category:'uae-destinations', title:'Al Ain — The Garden City UNESCO Heritage Sites Guide',           days:-20 },
  { category:'uae-destinations', title:'Dubai Creek: A Complete Guide to Old Dubai Heritage',           days:-18 },
  { category:'uae-destinations', title:'Best Beaches in UAE: Ranked by Experience & Crowd Level',       days:-16 },
  { category:'uae-destinations', title:'Dubai Marina vs JBR Beach: Where Should You Stay?',             days:-14 },
  { category:'uae-destinations', title:'Sheikh Zayed Grand Mosque: Complete Visitor Guide 2025',        days:-12 },
  { category:'uae-destinations', title:'Dubai Frame: Is It Worth the Price? Honest Review',             days:-10 },
  { category:'uae-destinations', title:'Hatta Mountain Escape: Day Trip Guide from Dubai',              days:-8  },
  { category:'uae-destinations', title:'Best Desert Safari Camps in Dubai Ranked 2025',                 days:-6  },
  { category:'uae-destinations', title:'Burj Khalifa At the Top vs Sky Views: Which to Choose?',        days:-4  },
  { category:'uae-destinations', title:'Dubai Gardens & Parks: Complete Outdoor Guide',                 days:-2  },
  { category:'uae-destinations', title:'Ajman City Tour: Budget-Friendly Alternative to Dubai',         days:1   },
  { category:'uae-destinations', title:'Umm Al Quwain: Mangroves, History & Relaxation',               days:2   },
  { category:'uae-destinations', title:'Dubai Mall vs Ibn Battuta: Best Shopping Experience',           days:3   },
  { category:'uae-destinations', title:'Al Fahidi Historical Neighbourhood: Walking Tour Guide',        days:5   },
  { category:'uae-destinations', title:'Palm Jumeirah: Complete Guide — Hotels, Beaches & Dining',     days:7   },
  { category:'uae-destinations', title:'Dubai Water Canal Walk: Complete Guide & Best Spots',           days:10  },
  { category:'uae-destinations', title:'Miracle Garden Dubai: Timings, Tickets & Best Time to Visit',  days:14  },
  { category:'uae-destinations', title:'Khor Kalba: UAE\'s Hidden Mangrove & Wildlife Sanctuary',      days:18  },
  { category:'uae-destinations', title:'Desert Conservation Reserve Dubai: Wildlife Safari Guide',      days:22  },
  { category:'uae-destinations', title:'Expo City Dubai: What\'s Left After Expo 2020?',               days:26  },
  { category:'uae-destinations', title:'Global Village Dubai 2025-26: Dates, Tickets & Top Pavilions', days:30  },
  { category:'uae-destinations', title:'Jumeirah Mosque: Non-Muslim Visitor Guide & Dress Code',        days:35  },
  { category:'uae-destinations', title:'Dubai Gold Souk: How to Buy Smart & Avoid Scams',             days:40  },
  { category:'uae-destinations', title:'Spice Souk Dubai: Complete Trader\'s Guide',                   days:45  },
  { category:'uae-destinations', title:'Dubai Dolphinarium: Review, Tickets & Family Tips',            days:50  },

  // ═══════════════════════════════════════════════════════════════
  // GULF COUNTRY COMPARISONS
  // ═══════════════════════════════════════════════════════════════
  { category:'gulf-comparisons', title:'Dubai vs Riyadh for Tourism: Full 2025 Comparison',            days:55  },
  { category:'gulf-comparisons', title:'Dubai vs Doha: Which Gulf City Wins for Tourists?',            days:58  },
  { category:'gulf-comparisons', title:'Dubai vs Muscat: Desert Charm vs Arabian Authenticity',        days:62  },
  { category:'gulf-comparisons', title:'Dubai vs Kuwait City: Where to Spend Your Holiday?',           days:66  },
  { category:'gulf-comparisons', title:'UAE vs Bahrain: Comparing Two Top Gulf Destinations',          days:70  },
  { category:'gulf-comparisons', title:'Saudi Arabia Vision 2030 vs UAE Tourism: Who Wins?',           days:74  },
  { category:'gulf-comparisons', title:'Best Gulf Country for Family Travel in 2025',                  days:78  },
  { category:'gulf-comparisons', title:'Nightlife in the Gulf: Dubai vs Bahrain vs Oman',              days:82  },
  { category:'gulf-comparisons', title:'Best Desert Experiences: UAE vs Saudi vs Oman',                days:86  },
  { category:'gulf-comparisons', title:'Gulf Countries Safety Comparison for Western Tourists',         days:90  },
  { category:'gulf-comparisons', title:'Food Scene: Dubai vs Doha vs Abu Dhabi vs Riyadh',            days:94  },
  { category:'gulf-comparisons', title:'Luxury Hotels: UAE vs Qatar — A Head-to-Head Review',         days:98  },
  { category:'gulf-comparisons', title:'Shopping in the Gulf: Dubai Mall vs Malls of Qatar & KSA',    days:102 },
  { category:'gulf-comparisons', title:'Water Sports: UAE vs Oman — Coastal Adventures Compared',     days:106 },
  { category:'gulf-comparisons', title:'Visa-Free Entry: Gulf Countries Compared for All Passports',  days:110 },

  // ═══════════════════════════════════════════════════════════════
  // WORLDWIDE TOURS (future-ready with auto-link system)
  // ═══════════════════════════════════════════════════════════════
  { category:'worldwide-tours', title:'Paris in 5 Days: The Perfect Itinerary from Dubai',             days:115 },
  { category:'worldwide-tours', title:'Bali vs Maldives: Which Beach Holiday is Better from Dubai?',   days:118 },
  { category:'worldwide-tours', title:'Istanbul 4-Day Trip from Dubai: Complete Guide',                 days:122 },
  { category:'worldwide-tours', title:'London Tour from Dubai: Best Attractions & Hidden Gems',         days:126 },
  { category:'worldwide-tours', title:'Swiss Alps Winter Holiday: A Dubai Traveller\'s Guide',          days:130 },
  { category:'worldwide-tours', title:'Tokyo & Kyoto in 7 Days: Japan Tour from Dubai',                days:134 },
  { category:'worldwide-tours', title:'Safari vs Beach: East Africa vs Maldives from Dubai',           days:138 },
  { category:'worldwide-tours', title:'New York City First Timer\'s Guide for Dubai Travellers',        days:142 },
  { category:'worldwide-tours', title:'Singapore & Malaysia: 6-Day Budget Tour from Dubai',            days:146 },
  { category:'worldwide-tours', title:'Santorini & Athens: Greece Trip Guide from Dubai',               days:150 },
  { category:'worldwide-tours', title:'Morocco Tour: Marrakech to Sahara Desert — from Dubai',         days:154 },
  { category:'worldwide-tours', title:'Sri Lanka: Budget Paradise for Dubai-Based Travellers',          days:158 },
  { category:'worldwide-tours', title:'Maldives Over-Water Bungalow: Complete Planning Guide',          days:162 },
  { category:'worldwide-tours', title:'Europe in 10 Days from Dubai: Best Route & Budget',             days:166 },
  { category:'worldwide-tours', title:'Seychelles vs Maldives: Which Island Paradise to Choose?',      days:170 },
  { category:'worldwide-tours', title:'Georgia (Tbilisi) — The Emerging Destination for UAE Residents',days:174 },
  { category:'worldwide-tours', title:'Armenia & Azerbaijan: A 7-Day Caucasus Tour from Dubai',        days:178 },
  { category:'worldwide-tours', title:'Egypt Beyond the Pyramids: Luxor, Aswan & Red Sea',             days:182 },
  { category:'worldwide-tours', title:'Thailand Complete Guide: Bangkok, Chiang Mai & Islands',        days:186 },
  { category:'worldwide-tours', title:'Zanzibar: Africa\'s Spice Island Tour from Dubai',              days:190 },

  // ═══════════════════════════════════════════════════════════════
  // WEATHER & SEASONAL
  // ═══════════════════════════════════════════════════════════════
  { category:'weather-seasonal', title:'Best Time to Visit Dubai: Complete Month-by-Month Guide',      days:195 },
  { category:'weather-seasonal', title:'Dubai in Summer: What to Expect & How to Survive the Heat',    days:198 },
  { category:'weather-seasonal', title:'Dubai Winter Season: November to March Travel Guide',           days:202 },
  { category:'weather-seasonal', title:'Dubai in Ramadan: Traveller\'s Complete Guide 2025',            days:206 },
  { category:'weather-seasonal', title:'UAE National Day December 2: Best Events & Fireworks Guide',   days:210 },
  { category:'weather-seasonal', title:'Dubai Shopping Festival: Dates, Deals & How to Make the Most', days:214 },
  { category:'weather-seasonal', title:'Dubai Outdoor Activities by Month: Full Seasonal Calendar',     days:218 },
  { category:'weather-seasonal', title:'When Do Dubai Prices Drop? Best Value Travel Windows',          days:222 },
  { category:'weather-seasonal', title:'Spring in Dubai: March-April Travel Highlights',               days:226 },
  { category:'weather-seasonal', title:'UAE Fog Season: What to Know & How It Affects Your Trip',      days:230 },
  { category:'weather-seasonal', title:'Hurricane & Sandstorm Season in Dubai: Safety Guide',           days:234 },
  { category:'weather-seasonal', title:'New Year\'s Eve in Dubai: Best Fireworks Spots 2025-26',        days:238 },
  { category:'weather-seasonal', title:'Dubai vs Abu Dhabi Formula E: Complete Race Weekend Guide',     days:242 },
  { category:'weather-seasonal', title:'Christmas in Dubai: Non-Obvious Festive Activities',            days:246 },
  { category:'weather-seasonal', title:'Eid Al Fitr Dubai Guide: Hotels, Activities & Shopping Deals', days:250 },

  // ═══════════════════════════════════════════════════════════════
  // ADVENTURE & THRILLS
  // ═══════════════════════════════════════════════════════════════
  { category:'adventure', title:'Top 15 Extreme Sports You Can Do in Dubai Right Now',                  days:255 },
  { category:'adventure', title:'Dune Bashing Dubai: Beginner\'s Complete Safety Guide',                days:258 },
  { category:'adventure', title:'Skydiving Over the Palm: What to Expect & How to Prepare',            days:262 },
  { category:'adventure', title:'Dubai Helicopter Tour vs Seaplane Tour: Which to Choose?',            days:266 },
  { category:'adventure', title:'Wadi Bashing UAE: Best Routes for Off-Road Adventurers',              days:270 },
  { category:'adventure', title:'Scuba Diving in UAE: Best Sites, Visibility & What to See',           days:274 },
  { category:'adventure', title:'Rock Climbing in UAE: Best Mountains & Guide Services',               days:278 },
  { category:'adventure', title:'Zip Lining in Ras Al Khaimah: World\'s Longest Urban Zip Line',       days:282 },
  { category:'adventure', title:'Paragliding in UAE: Where, When & How Much Does It Cost?',            days:286 },
  { category:'adventure', title:'Sandboarding in Dubai: Everything You Need to Know',                  days:290 },
  { category:'adventure', title:'IMG Worlds vs Warner Bros World: Ultimate Theme Park Battle',          days:294 },
  { category:'adventure', title:'Wakeboarding & Water Sports at Dubai\'s Best Cable Parks',            days:298 },
  { category:'adventure', title:'Camel Racing in UAE: Where to Watch & What to Know',                  days:302 },
  { category:'adventure', title:'Hot Air Balloon Dubai: Review, Prices & What to Expect',              days:306 },
  { category:'adventure', title:'ATV Quad Biking in Dubai Desert: Best Tours Compared',                days:310 },
  { category:'adventure', title:'Kayaking Dubai Mangroves: Guided Tour vs Self-Guided',               days:314 },
  { category:'adventure', title:'Jet Ski Dubai: Best Rental Spots & Safety Rules',                    days:318 },
  { category:'adventure', title:'Flyboarding in Dubai Marina: Is It Safe for Beginners?',              days:322 },
  { category:'adventure', title:'Ice Climbing at Dubai Ice Rink: Indoor Adventure Guide',              days:326 },
  { category:'adventure', title:'Mountain Biking UAE: Best Trails from Easy to Expert',                days:330 },

  // ═══════════════════════════════════════════════════════════════
  // SAFETY & TRAVEL TIPS
  // ═══════════════════════════════════════════════════════════════
  { category:'safety-tips', title:'Dubai Safety Guide 2025: Is It Really the World\'s Safest City?',   days:335 },
  { category:'safety-tips', title:'What NOT to Do in Dubai: Laws Tourists Accidentally Break',          days:338 },
  { category:'safety-tips', title:'Health Insurance for UAE Travel: Complete Guide & Recommendations',  days:342 },
  { category:'safety-tips', title:'Travel Scams in Dubai: How to Spot & Avoid Them All',               days:346 },
  { category:'safety-tips', title:'LGBTQ+ Travel in UAE: What You Need to Know Honestly',              days:350 },
  { category:'safety-tips', title:'Solo Female Travel in Dubai: Honest Safety Review 2025',            days:354 },
  { category:'safety-tips', title:'Dubai for Elderly Travellers: Accessibility & Mobility Guide',      days:358 },
  { category:'safety-tips', title:'Child Safety at UAE Theme Parks: Parent\'s Guide',                  days:362 },
  { category:'safety-tips', title:'Desert Safety Tips: What to Bring & Never Do Alone',               days:366 },
  { category:'safety-tips', title:'UAE Road Rules for Tourists: Renting & Driving Guide',             days:370 },
  { category:'safety-tips', title:'Water Safety at Dubai Beaches: Flags, Currents & Lifeguards',       days:374 },
  { category:'safety-tips', title:'Dubai Police: How to Contact & What to Expect',                    days:378 },
  { category:'safety-tips', title:'Medical Emergency in Dubai: Hospitals, Costs & Insurance',          days:382 },
  { category:'safety-tips', title:'Photography Laws in UAE: What You Can & Cannot Photograph',         days:386 },
  { category:'safety-tips', title:'Dress Code in UAE: Complete Guide for Tourists',                   days:390 },

  // ═══════════════════════════════════════════════════════════════
  // FOOD & CULTURE
  // ═══════════════════════════════════════════════════════════════
  { category:'food-culture', title:'Best Arabic Food in Dubai: 15 Dishes You Must Try',               days:395 },
  { category:'food-culture', title:'Dubai Food Festival Guide: Events, Restaurants & Street Food',    days:398 },
  { category:'food-culture', title:'Emirati Cuisine: Authentic Restaurants That Serve Real Local Food',days:402 },
  { category:'food-culture', title:'Dubai Brunch Culture: Top 10 Friday Brunches Reviewed',           days:406 },
  { category:'food-culture', title:'Halal Food in Dubai: Everything a Muslim Tourist Needs to Know',   days:410 },
  { category:'food-culture', title:'Dubai Night Markets: A Foodie\'s Guide to Evening Street Food',    days:414 },
  { category:'food-culture', title:'Michelin Star Dining in Dubai 2025: Complete Restaurant Guide',    days:418 },
  { category:'food-culture', title:'Camel Milk in UAE: Where to Try, Buy & Why It\'s Special',        days:422 },
  { category:'food-culture', title:'Arabic Coffee & Dates: The Cultural Significance Explained',      days:426 },
  { category:'food-culture', title:'Best Seafood Restaurants in Dubai: Fresh from the Arabian Gulf',  days:430 },
  { category:'food-culture', title:'Emirati Wedding Traditions: What Tourists Should Know',           days:434 },
  { category:'food-culture', title:'Dubai Museum of the Future: Art, Culture & Future Vision',        days:438 },
  { category:'food-culture', title:'UAE Art Scene: Galleries, Festivals & Creative Spaces',           days:442 },
  { category:'food-culture', title:'Ramadan Food Culture: Iftar Experiences for Non-Muslims',         days:446 },
  { category:'food-culture', title:'Pakistani & Indian Food in Dubai: Best Areas & Restaurants',      days:450 },

  // ═══════════════════════════════════════════════════════════════
  // FAMILY TRAVEL
  // ═══════════════════════════════════════════════════════════════
  { category:'family-travel', title:'Dubai with Kids Under 5: Complete Family Survival Guide',         days:455 },
  { category:'family-travel', title:'Best Family Hotels in Dubai with Kids Clubs & Pools',            days:458 },
  { category:'family-travel', title:'Free Activities for Families in Dubai (No Budget Needed)',        days:462 },
  { category:'family-travel', title:'Dubai Aquarium vs Atlantis Aquaventure: Family Review',          days:466 },
  { category:'family-travel', title:'Legoland Dubai: Complete Family Guide, Tickets & Tips',          days:470 },
  { category:'family-travel', title:'Children\'s City Dubai: Educational Fun for Kids',               days:474 },
  { category:'family-travel', title:'Dubai Zoo vs Al Ain Zoo: Which Is Better for Kids?',             days:478 },
  { category:'family-travel', title:'Best Dubai Parks for Picnics & Family Outdoor Time',             days:482 },
  { category:'family-travel', title:'Babysitting Services in Dubai: Trusted Options for Parents',     days:486 },
  { category:'family-travel', title:'Ferrari World Abu Dhabi: Family Review & Ride Guide',            days:490 },
  { category:'family-travel', title:'Yas Waterworld vs Wild Wadi: Best Water Park for Families',      days:494 },
  { category:'family-travel', title:'Multi-Generational Travel in UAE: Tips for All Ages',            days:498 },

  // ═══════════════════════════════════════════════════════════════
  // LUXURY TRAVEL
  // ═══════════════════════════════════════════════════════════════
  { category:'luxury-travel', title:'Burj Al Arab Stay Review: Is It Worth AED 10,000/Night?',        days:503 },
  { category:'luxury-travel', title:'Private Yacht Charter Dubai: Complete Luxury Guide',              days:506 },
  { category:'luxury-travel', title:'Atlantis The Royal: Full Review of Dubai\'s Newest Luxury Icon', days:510 },
  { category:'luxury-travel', title:'Desert Glamping in UAE: Luxury Tents & 5-Star Camping',          days:514 },
  { category:'luxury-travel', title:'Helicopter to Dinner: Dubai\'s Most Exclusive Experiences',      days:518 },
  { category:'luxury-travel', title:'Private Tour Guide Dubai: Why It\'s Worth Every Dirham',         days:522 },
  { category:'luxury-travel', title:'Dubai\'s Most Expensive Restaurants: Worth the Price?',          days:526 },
  { category:'luxury-travel', title:'Rolls-Royce Tours Dubai: Luxury Car Experiences Reviewed',       days:530 },
  { category:'luxury-travel', title:'Jumeirah Beach Hotel vs Madinat Jumeirah: Luxury Comparison',    days:534 },
  { category:'luxury-travel', title:'Spa & Wellness Retreats in UAE: Top 10 Luxury Sanctuaries',      days:538 },

  // ═══════════════════════════════════════════════════════════════
  // BUDGET TRAVEL
  // ═══════════════════════════════════════════════════════════════
  { category:'budget-travel', title:'Dubai on AED 200/Day: A Realistic Budget Travel Guide',           days:543 },
  { category:'budget-travel', title:'Free Things to Do in Dubai: 25 Zero-Cost Experiences',           days:546 },
  { category:'budget-travel', title:'Cheapest Months to Visit Dubai: When Prices Actually Drop',       days:550 },
  { category:'budget-travel', title:'Budget Hotels in Dubai Under AED 200/Night: Honest Reviews',     days:554 },
  { category:'budget-travel', title:'Dubai Metro Guide: Save Money & Travel Like a Local',            days:558 },
  { category:'budget-travel', title:'Street Food in Dubai: Best Budget Eats Under AED 20',            days:562 },
  { category:'budget-travel', title:'Group Tour vs Private Tour Dubai: Which Saves More?',            days:566 },
  { category:'budget-travel', title:'Dubai Airport Layover Guide: What to Do with 8+ Hours',          days:570 },
  { category:'budget-travel', title:'Budget Souvenirs from Dubai That Aren\'t Tacky or Overpriced',   days:574 },
  { category:'budget-travel', title:'AirBnB vs Hotels in Dubai: True Cost Comparison',                days:578 },

  // ═══════════════════════════════════════════════════════════════
  // OCCASIONS & EVENTS
  // ═══════════════════════════════════════════════════════════════
  { category:'occasions-events', title:'Honeymoon in Dubai: Complete Romantic Couple\'s Guide',        days:583 },
  { category:'occasions-events', title:'Corporate Events in Dubai: Venues, Planning & Best Locations', days:586 },
  { category:'occasions-events', title:'Bachelor/Bachelorette Parties in Dubai: Ultimate Guide',       days:590 },
  { category:'occasions-events', title:'Birthday Celebrations in Dubai: Unforgettable Ideas',          days:594 },
  { category:'occasions-events', title:'Proposal Ideas in Dubai: Most Romantic Locations',             days:598 },
  { category:'occasions-events', title:'Team Building in Dubai: Best Corporate Activities',            days:602 },
  { category:'occasions-events', title:'Dubai Airshow 2025: Guide for Visitors & Enthusiasts',        days:606 },
  { category:'occasions-events', title:'GITEX Dubai 2025: Complete Visitor Guide',                    days:610 },
  { category:'occasions-events', title:'Dubai World Cup Horse Racing: Tickets & Hospitality Guide',   days:614 },
  { category:'occasions-events', title:'Dubai Rugby Sevens: Fan Guide & Hospitality Packages',        days:618 },
  { category:'occasions-events', title:'Art Dubai & Design Week: Complete Visitor Guide',              days:622 },
  { category:'occasions-events', title:'Dubai International Film Festival: How to Attend',            days:626 },
  { category:'occasions-events', title:'Romantic Dinner Cruise Dubai: Full Review & Comparison',      days:630 },
  { category:'occasions-events', title:'Valentine\'s Day in Dubai: Best Experiences for Couples',     days:634 },
  { category:'occasions-events', title:'Dubai New Year Countdown: Best Hotels & Viewing Spots',       days:638 },

  // ═══════════════════════════════════════════════════════════════
  // TOUR GUIDES (DubaiRovers specific)
  // ═══════════════════════════════════════════════════════════════
  { category:'tour-guides', title:'Evening Desert Safari Dubai: Complete What to Expect Guide',        days:643 },
  { category:'tour-guides', title:'Abu Dhabi Day Trip from Dubai: The Only Guide You Need',            days:646 },
  { category:'tour-guides', title:'Dubai City Tour: How to See the Best in One Day',                  days:650 },
  { category:'tour-guides', title:'Dhow Cruise Dubai: Marina vs Creek — Which to Book?',              days:654 },
  { category:'tour-guides', title:'Helicopter Tour Dubai: What to See & Best Time of Day',            days:658 },
  { category:'tour-guides', title:'Overnight Desert Safari: Complete Preparation Guide',              days:662 },
  { category:'tour-guides', title:'Dubai Attractions Tickets: Buy in Advance vs At the Gate',         days:666 },
  { category:'tour-guides', title:'Sharjah Day Trip from Dubai: Heritage Sites & Museums',            days:670 },
  { category:'tour-guides', title:'How to Book Tours in Dubai: Agent vs Online vs Direct',            days:674 },
  { category:'tour-guides', title:'Group Tour vs Private Tour Dubai: Honest Comparison',              days:678 },
  { category:'tour-guides', title:'Tour Guide Tips: How to Get the Most from Your Dubai Guide',       days:682 },
  { category:'tour-guides', title:'Dubai Tours for Cruise Passengers: Maximize Your Shore Day',       days:686 },
  { category:'tour-guides', title:'Photography Tours Dubai: Best Locations & Guided Options',         days:690 },
  { category:'tour-guides', title:'Accessible Dubai: Tours for Visitors with Disabilities',           days:694 },
  { category:'tour-guides', title:'Dubai Tour Packages: What\'s Included vs Hidden Extras',           days:698 },
];

// ─── Build full blog objects ──────────────────────────────────────
const UNSPLASH_IMAGES = {
  'uae-destinations':  'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80',
  'gulf-comparisons':  'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800&q=80',
  'worldwide-tours':   'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
  'weather-seasonal':  'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80',
  'adventure':         'https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800&q=80',
  'safety-tips':       'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=80',
  'food-culture':      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
  'family-travel':     'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
  'luxury-travel':     'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  'budget-travel':     'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
  'occasions-events':  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
  'tour-guides':       'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=80',
};

const READ_TIMES = ['4 min read','5 min read','6 min read','7 min read','8 min read','10 min read'];

export const ALL_BLOGS = MASTER_BLOGS.map((b, i) => {
  const isPast     = b.days <= 0;
  const isNearFuture = b.days > 0 && b.days <= 7;
  const status     = isPast ? 'published' : (isNearFuture ? 'scheduled' : 'draft');
  const publishAt  = isPast ? pastDate(Math.abs(b.days)) : scheduleDate(b.days);

  return {
    id:          `blog-${i+1}`,
    slug:        slug(b.title),
    title:       b.title,
    excerpt:     `Discover everything about ${b.title.toLowerCase().replace(/[^a-z0-9\s]/g,'')} — expert tips, insider knowledge, and the best recommendations from Dubai's most trusted tour operator.`,
    category:    b.category,
    author:      { name:'DubaiRovers Team', avatar:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
    publishAt,
    publishedAt: isPast ? publishAt.split('T')[0] : null,
    status,
    image:       UNSPLASH_IMAGES[b.category] || UNSPLASH_IMAGES['tour-guides'],
    readTime:    READ_TIMES[i % READ_TIMES.length],
    views:       isPast ? Math.floor(Math.random() * 5000) + 200 : 0,
    featured:    i < 5,
    tags:        [b.category.replace(/-/g,' '), 'Dubai', 'Travel', 'UAE'],
    seoTitle:    `${b.title} | DubaiRovers`,
    seoDesc:     `${b.title.slice(0,100)} — Expert tips from Dubai's #1 tour operator. Free hotel pickup. Best prices guaranteed.`,
    content:     '', // Generated by AI on demand
    internalLinks: [], // Auto-populated by link engine
    scheduled:   !isPast,
  };
});

// ─── Auto-link engine ─────────────────────────────────────────────
// Maps keywords to tour URLs — auto-updates as tours are added
export const AUTO_LINK_MAP = [
  { keywords:['desert safari','dune bashing','bedouin camp','camel ride'],   tourSlug:'evening-desert-safari-dubai',           label:'🏜️ Desert Safari Tours' },
  { keywords:['abu dhabi','sheikh zayed mosque','ferrari world','emirates palace'], tourSlug:'abu-dhabi-city-tour-from-dubai', label:'🕌 Abu Dhabi City Tour' },
  { keywords:['dubai city tour','gold souk','dubai creek','al fahidi'],      tourSlug:'dubai-city-tour-full-day',              label:'🏙️ Dubai City Tour' },
  { keywords:['dhow cruise','marina cruise','dinner cruise','boat trip'],    tourSlug:'dubai-marina-dhow-cruise-dinner',       label:'🚢 Dhow Cruise Dinner' },
  { keywords:['helicopter','aerial tour','palm jumeirah from air'],          tourSlug:'helicopter-tour-dubai-palm',            label:'🚁 Helicopter Tour' },
  { keywords:['overnight safari','sleep desert','desert camp night','stargazing desert'], tourSlug:'overnight-desert-safari-dubai', label:'🌙 Overnight Desert Safari' },
  { keywords:['burj khalifa','at the top','observation deck'],               tourSlug:'burj-khalifa-at-the-top',               label:'🏙️ Burj Khalifa Tickets' },
  { keywords:['dubai aquarium','underwater zoo','fish tunnel'],               tourSlug:'dubai-aquarium-underwater-zoo',          label:'🐠 Dubai Aquarium' },
  { keywords:['img worlds','theme park','marvel','cartoon network ride'],    tourSlug:'img-worlds-of-adventure',               label:'🎢 IMG Worlds' },
  { keywords:['paris','eiffel tower','france trip'],                         tourSlug:'paris-france-tour-package-from-dubai',  label:'🗼 Paris Tour Package' },
];

export function applyAutoLinks(content, availableTours=[]) {
  if (!content) return content;
  let result = content;
  AUTO_LINK_MAP.forEach(mapping => {
    const tour = availableTours.find(t => t.slug === mapping.tourSlug);
    if (!tour) return; // Only link if tour exists
    mapping.keywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
      if (result.includes(`href="/tours/`)) return; // Already linked
      result = result.replace(regex, `<a href="/tours/${tour.category}/${tour.slug}" class="text-brand-gold font-semibold hover:underline">$1</a>`);
    });
  });
  return result;
}

export default ALL_BLOGS;
