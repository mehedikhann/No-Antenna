import { getDb } from "../../../db";
import { inquiries } from "../../../db/schema";

export const runtime = "edge";

const allowedMarkets = new Set(["Bangladesh", "International"]);
const allowedServices = new Set([
  "Custom software development",
  "SaaS product development",
  "Premium websites",
  "Web and mobile applications",
  "Not sure yet",
]);

function stringField(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "Please submit the form again." }, { status: 415 });
  }
  try {
    const payload = await request.json() as Record<string, unknown>;
    if (payload.website) return Response.json({ ok: true }, { status: 201 });

    const name = stringField(payload.name, 100);
    const email = stringField(payload.email, 160);
    const company = stringField(payload.company, 120);
    const market = stringField(payload.market, 40);
    const service = stringField(payload.service, 80);
    const brief = stringField(payload.brief, 2000);
    const availability = stringField(payload.availability, 180);
    const consent = payload.consent === "yes";

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !allowedMarkets.has(market) || !allowedServices.has(service) || brief.length < 15 || !availability || !consent) {
      return Response.json({ error: "Please complete the required fields with a valid email address." }, { status: 400 });
    }
    await getDb().insert(inquiries).values({ name, email, company, market, service, brief, availability });
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Inquiry submission failed", error);
    return Response.json({ error: "The request could not be saved. Please email us instead." }, { status: 500 });
  }
}
