import { NextRequest, NextResponse } from "next/server";
import { COCKTAIL_CLASSES, isCocktailClassDate } from "@/lib/cocktail-classes";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

function icsDate(value: string) {
  return new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");
  if (!sessionId?.startsWith("cs_")) return new NextResponse("Invalid ticket", { status: 400 });
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    const eventDate = session.metadata?.eventDate;
    if (session.metadata?.eventSlug !== COCKTAIL_CLASSES.slug || !eventDate || !isCocktailClassDate(eventDate) || session.metadata?.cancelled === "true") {
      return new NextResponse("Ticket unavailable", { status: 404 });
    }
    const date = COCKTAIL_CLASSES.dates[eventDate];
    const body = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Prosper Events//Cocktail Class//EN", "BEGIN:VEVENT",
      `UID:${session.id}@prosperevents.ca`, `DTSTART:${icsDate(date.start)}`, `DTEND:${icsDate(date.end)}`,
      "SUMMARY:Cocktail Class — Prosper Events", `LOCATION:${COCKTAIL_CLASSES.venue}\\, ${COCKTAIL_CLASSES.address}`,
      "DESCRIPTION:Make any three drinks from the cocktail and mocktail menu.", "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    return new NextResponse(body, { headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": "attachment; filename=cocktail-classes.ics" } });
  } catch {
    return new NextResponse("Ticket unavailable", { status: 404 });
  }
}
