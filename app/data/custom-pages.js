// DubaiRovers — Custom Pages Data
// Built via the Page Builder admin tool
// DO NOT edit manually — managed through /admin/page-builder

export const customPages = [
  {
    id: "page_demo_001",
    title: "Eid Special Desert Safari — 30% OFF",
    slug: "eid-special-offer",
    type: "landing",
    status: "draft",
    createdAt: "2026-03-12",
    updatedAt: "2026-03-12",
    seo: {
      metaTitle: "Eid Special Desert Safari Dubai — 30% OFF | DubaiRovers",
      metaDescription: "Celebrate Eid with an unforgettable desert safari in Dubai. Book now and save 30% — limited spots available. Instant WhatsApp confirmation.",
      slug: "eid-special-offer",
      schemaType: "TouristAttraction",
      ogImage: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&q=80",
      keywords: ["desert safari dubai", "eid offer dubai", "desert safari discount"],
      index: true,
    },
    blocks: [
      {
        id: "block_001",
        type: "hero-banner",
        order: 1,
        data: {
          heading: "🌙 Eid Special — Desert Safari Dubai",
          subheading: "Celebrate Eid with an unforgettable desert experience — 30% OFF all packages",
          backgroundImage: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1600&q=80",
          overlayOpacity: 0.5,
          textAlign: "center",
          button1: { text: "Book Now — 30% OFF 🎉", link: "/booking" },
          button2: { text: "View Packages", link: "#packages" },
        }
      },
      {
        id: "block_002",
        type: "heading",
        order: 2,
        data: {
          text: "Why Choose DubaiRovers This Eid?",
          tag: "H2",
          fontSize: 36,
          color: "#FFFFFF",
          alignment: "center",
        }
      },
      {
        id: "block_003",
        type: "paragraph",
        order: 3,
        data: {
          content: "Experience the magic of the Arabian desert this Eid with Dubai's most trusted tour operator. From thrilling dune bashing to starlit BBQ dinners — we create memories that last a lifetime. Book now and enjoy our exclusive Eid discount of 30% off all packages.",
          fontSize: 16,
          alignment: "center",
          color: "rgba(255,255,255,0.75)",
        }
      },
    ]
  },
  {
    id: "page_demo_002",
    title: "Dubai Water Sports — Summer 2026",
    slug: "dubai-water-sports-summer",
    type: "listing",
    status: "draft",
    createdAt: "2026-03-10",
    updatedAt: "2026-03-11",
    seo: {
      metaTitle: "Dubai Water Sports Summer 2026 — Book Online | DubaiRovers",
      metaDescription: "Book the best water sports in Dubai this summer. Jet skiing, kayaking, parasailing and more from AED 99.",
      slug: "dubai-water-sports-summer",
      schemaType: "TouristAttraction",
      ogImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
      keywords: ["water sports dubai", "dubai summer activities", "jet ski dubai"],
      index: true,
    },
    blocks: [
      {
        id: "block_101",
        type: "hero-banner",
        order: 1,
        data: {
          heading: "🌊 Dubai Water Sports — Summer 2026",
          subheading: "Ride the waves at Dubai's most spectacular waterfront locations",
          backgroundImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80",
          overlayOpacity: 0.45,
          textAlign: "center",
          button1: { text: "Explore Activities", link: "#activities" },
          button2: { text: "Book via WhatsApp 💬", link: "https://wa.me/971544735060" },
        }
      },
      {
        id: "block_102",
        type: "heading",
        order: 2,
        data: {
          text: "All Water Sports Activities",
          tag: "H2",
          fontSize: 32,
          color: "#FFFFFF",
          alignment: "left",
        }
      },
    ]
  },
];

export function getCustomPage(slug) {
  return customPages.find(p => p.slug === slug) || null;
}
export function getAllCustomPages() {
  return customPages;
}
export function getPublishedPages() {
  return customPages.filter(p => p.status === "published");
}
