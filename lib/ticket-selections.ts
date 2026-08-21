import { cocktailMenu } from "@/lib/cocktail-classes";

export type GuestSelection = {
  name: string;
  drinks: [string, string, string];
};

export const drinkNames = [...cocktailMenu.cocktails, ...cocktailMenu.mocktails].map(([name]) => name);

export function serializeSelections(selections: GuestSelection[]) {
  return JSON.stringify(selections.map(({ name, drinks }) => ({ n: name, d: drinks })));
}

export function parseSelections(value?: string): GuestSelection[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const selection = item as { n?: unknown; d?: unknown };
      if (typeof selection.n !== "string" || !Array.isArray(selection.d) || selection.d.length !== 3 || !selection.d.every((drink) => typeof drink === "string")) return [];
      return [{ name: selection.n, drinks: selection.d as [string, string, string] }];
    });
  } catch {
    return [];
  }
}
