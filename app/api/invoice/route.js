import { NextResponse } from "next/server"
import { writeFile, readFile, mkdir } from "fs/promises"
import { join } from "path"

const DIR  = join(process.cwd(), "public")
const PATH = join(DIR, "dr-invoices.json")

async function ensure() {
  try { await mkdir(DIR, { recursive: true }) } catch {}
  try { await readFile(PATH) } catch {
    await writeFile(PATH, JSON.stringify({ invoices: [] }, null, 2))
  }
}
async function read() {
  await ensure()
  try { return JSON.parse(await readFile(PATH, "utf-8")) }
  catch { return { invoices: [] } }
}

export async function GET() {
  return NextResponse.json(await read())
}

export async function POST(req) {
  try {
    const body = await req.json()
    const data = await read()
    if (body.action === "delete") {
      data.invoices = data.invoices.filter(i => i.id !== body.id)
    } else {
      const inv = {
        id:         `INV-${Date.now()}`,
        bookingId:  body.bookingId || "",
        clientName: body.clientName || "",
        clientEmail:body.clientEmail || "",
        clientPhone:body.clientPhone || "",
        tour:       body.tour || "",
        pkg:        body.pkg  || "",
        date:       body.date || "",
        guests:     body.guests || 1,
        amount:     body.amount || 0,
        currency:   body.currency || "AED",
        status:     body.status || "unpaid",
        notes:      body.notes || "",
        issuedAt:   new Date().toISOString(),
        dueDate:    body.dueDate || new Date(Date.now()+7*86400000).toISOString().split("T")[0],
      }
      data.invoices.unshift(inv)
    }
    await writeFile(PATH, JSON.stringify(data, null, 2))
    return NextResponse.json({ success: true, invoices: data.invoices })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
