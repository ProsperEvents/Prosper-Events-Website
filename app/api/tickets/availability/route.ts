import { NextRequest, NextResponse } from "next/server";
import { isCocktailClassDate } from "@/lib/cocktail-classes";
import { ticketAvailability } from "@/lib/ticket-inventory";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date") || "2026-09-18";
  if (!isCocktailClassDate(date)) return NextResponse.json({ error: "Invalid class date." }, { status: 400 });
  try {
    const availability = await ticketAvailability(date);
    return NextResponse.json({
      discountedRemaining: availability.discountedRemaining,
      remainingForDate: availability.remainingForDate,
    });
  } catch {
    return NextResponse.json({ discountedRemaining: 0 }, { status: 503 });
  }
}
