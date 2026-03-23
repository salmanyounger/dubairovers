import { NextResponse } from "next/server"
import { writeFile, readFile, mkdir } from "fs/promises"
import { join } from "path"

const PUBLIC_DIR  = join(process.cwd(), "public")
const PUBLIC_PATH = join(PUBLIC_DIR, "dr-overrides.json")

// ── ensure public/dr-overrides.json always exists ──
async function ensureFile() {
  try { await mkdir(PUBLIC_DIR, { recursive: true }) } catch {}
  try { await readFile(PUBLIC_PATH, "utf-8") } catch {
    await writeFile(PUBLIC_PATH, JSON.stringify({ overrides: [] }, null, 2))
  }
}

async function readOverrides() {
  try {
    await ensureFile()
    const raw = await readFile(PUBLIC_PATH, "utf-8")
    return JSON.parse(raw)
  } catch { return { overrides: [] } }
}

export async function GET() {
  const data = await readOverrides()
  return NextResponse.json(data)
}

export async function POST(req) {
  try {
    await ensureFile()
    const body = await req.json()
    const data = await readOverrides()

    if (body.action === "clear_all") {
      data.overrides = []
    } else if (body.action === "delete") {
      data.overrides = data.overrides.filter(o => o.page !== body.page)
    } else {
      const idx = data.overrides.findIndex(
        o => o.page === body.page && o.selector === body.selector && o.type === body.type
      )
      const entry = {
        page:     body.page,
        selector: body.selector,
        type:     body.type,
        value:    body.value    || "",
        alt:      body.alt      || "",
        styles:   body.styles   || {},
        savedAt:  new Date().toISOString(),
      }
      if (idx >= 0) data.overrides[idx] = entry
      else data.overrides.push(entry)
    }

    await writeFile(PUBLIC_PATH, JSON.stringify(data, null, 2))
    return NextResponse.json({ success: true, count: data.overrides.length })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function DELETE(req) {
  try {
    const { selector, page } = await req.json()
    const data = await readOverrides()
    data.overrides = data.overrides.filter(
      o => !(o.page === page && o.selector === selector)
    )
    await writeFile(PUBLIC_PATH, JSON.stringify(data, null, 2))
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
