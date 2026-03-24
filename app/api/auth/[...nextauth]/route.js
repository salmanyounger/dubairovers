// Google Login is disabled until next-auth is configured
// To enable: run "npm install next-auth" and set up .env.local
export async function GET() {
  return new Response(JSON.stringify({ message: "Auth not configured yet" }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
export async function POST() {
  return new Response(JSON.stringify({ message: "Auth not configured yet" }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
