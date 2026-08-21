import { COCKTAIL_CLASSES, type CocktailClassDate } from "@/lib/cocktail-classes";

export function calendarLinks(eventDate: CocktailClassDate, sessionId: string, siteUrl: string) {
  const date = COCKTAIL_CLASSES.dates[eventDate];
  const title = "Cocktail Classes — Prosper Events";
  const details = "Make any three drinks from the cocktail and mocktail menu.";
  const location = `${COCKTAIL_CLASSES.venue}, ${COCKTAIL_CLASSES.address}`;
  const googleDate = (value: string) => new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  return {
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${googleDate(date.start)}/${googleDate(date.end)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`,
    outlook: `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&startdt=${encodeURIComponent(date.start)}&enddt=${encodeURIComponent(date.end)}&body=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`,
    apple: `${siteUrl}/api/tickets/calendar?session_id=${sessionId}`,
  };
}
