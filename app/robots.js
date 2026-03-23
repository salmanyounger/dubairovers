// Auto-generates /robots.txt
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/archai/admin",
          "/properties/admin",
          "/salmanfx/admin",
          "/webbuilder/admin",
          "/api/",
          "/dashboard",
        ],
      },
    ],
    sitemap: "https://dubairovers.com/sitemap.xml",
    host:    "https://dubairovers.com",
  };
}
