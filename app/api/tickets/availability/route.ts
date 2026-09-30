import { NextRequest, NextResponse } from "next/server";
import { isCocktailClassDate } from "@/lib/cocktail-classes";
import { ticketAvailability } from "@/lib/ticket-inventory";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date") || "2026-10-23";
  if (!isCocktailClassDate(date)) return NextResponse.json({ error: "Invalid class date." }, { status: 400 });
  try {
    const availability = await ticketAvailability(date);
    return NextResponse.json({
      remainingForDate: availability.remainingForDate,
    });
  } catch {
    return NextResponse.json({ remainingForDate: 0 }, { status: 503 });
  }
}
