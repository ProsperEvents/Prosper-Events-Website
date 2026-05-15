import { siteUrl } from "@/lib/site";

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function formatLongDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(isoDate));
}

export async function resolveAsyncProp<T>(value: T | Promise<T>) {
  return await value;
}
