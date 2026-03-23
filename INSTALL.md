# DubaiRovers V5 — Install Instructions

## Files to copy into your project

### NEW files (create these):
- app/admin/page.js           → REPLACE existing
- app/admin/editor/page.js    → REPLACE existing
- app/api/content/route.js    → REPLACE existing
- app/api/generate-blog/route.js → REPLACE existing
- app/components/ContentApplier.jsx → NEW file

## CRITICAL STEP — Make visual editor changes persist on reload
Open your existing: app/layout.js
Add these two lines:

```js
import ContentApplier from "./components/ContentApplier"
// Inside your <body> tag, add:
<ContentApplier />
```

Example layout.js:
```js
import ContentApplier from "./components/ContentApplier"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContentApplier />   {/* <-- ADD THIS LINE */}
        {children}
      </body>
    </html>
  )
}
```

This is what makes saved edits show on your live website after refresh.
The editor saves to public/dr-overrides.json and ContentApplier reads + applies them on every page load.

## For AI blog generation (optional):
Create .env.local in your project root:
ANTHROPIC_API_KEY=sk-ant-your-key-here

Get free key at: console.anthropic.com → API Keys ($5 free credits)
Free Template mode works without any API key.

## Day/Night switch:
Located top-center of admin panel. Toggle anytime. Preference saved to localStorage.

## Visual Editor — How persistence works:
1. Go to /admin → click Visual Editor (opens new tab)
2. Click any element on the page
3. Edit text, image, background image, styles
4. Click PREVIEW to see live
5. Click SAVE → saved to server (public/dr-overrides.json)
6. Go to your live website and refresh → changes appear ✅
