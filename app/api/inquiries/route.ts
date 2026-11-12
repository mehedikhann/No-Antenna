export const runtime = "nodejs";

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
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.INQUIRY_FROM_EMAIL;
    if (!apiKey || !from) {
      return Response.json({ error: "Online requests are temporarily unavailable." }, { status: 503 });
    }

    const message = [
      "New strategic discussion request",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "Not provided"}`,
      `Location: ${market}`,
      `Service: ${service}`,
      `Preferred time: ${availability}`,
      "",
      "Project details:",
      brief,
    ].join("\n");
    const delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: ["contact@noantenna.com"],
        reply_to: email,
        subject: `Strategic discussion request from ${name}`,
        text: message,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!delivery.ok) {
      console.error("Inquiry email delivery failed", delivery.status);
      return Response.json({ error: "The request could not be delivered." }, { status: 502 });
    }
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Inquiry submission failed", error instanceof Error ? error.name : "Unknown error");
    return Response.json({ error: "The request could not be delivered." }, { status: 500 });
  }
}
