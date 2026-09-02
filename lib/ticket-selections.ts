import { cocktailMenu } from "@/lib/cocktail-classes";

export type GuestSelection = {
  name: string;
  drinks: [string, string, string];
};

export const drinkNames = [...cocktailMenu.cocktails, ...cocktailMenu.mocktails].map(([name]) => name);

export function serializeSelections(selections: GuestSelection[]) {
  return JSON.stringify(selections.map(({ name, drinks }) => ({ n: name, d: drinks })));
}

export function serializeSelectionMetadata(selections: GuestSelection[]) {
  const chunks: GuestSelection[][] = [];
  let chunk: GuestSelection[] = [];
  for (const selection of selections) {
    const candidate = [...chunk, selection];
    if (chunk.length && serializeSelections(candidate).length > 450) {
      chunks.push(chunk);
      chunk = [selection];
    } else {
      chunk = candidate;
    }
  }
  if (chunk.length) chunks.push(chunk);
  return Object.fromEntries(chunks.map((selectionsChunk, index) => [index === 0 ? "ticketSelections" : `ticketSelections${index + 1}`, serializeSelections(selectionsChunk)]));
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

export function parseSelectionsFromMetadata(metadata?: Record<string, string> | null): GuestSelection[] {
  if (!metadata) return [];
  return Object.keys(metadata)
    .filter((key) => key === "ticketSelections" || /^ticketSelections\d+$/.test(key))
    .sort((left, right) => selectionChunkIndex(left) - selectionChunkIndex(right))
    .flatMap((key) => parseSelections(metadata[key]));
}

function selectionChunkIndex(key: string) {
  return key === "ticketSelections" ? 1 : Number(key.slice("ticketSelections".length));
}
