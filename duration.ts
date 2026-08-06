/** Parse/format compact durations like '1h30m'. Zero dependencies. */
const UNIT: Record<string, number> = { s: 1, m: 60, h: 3600, d: 86400 };
export function parse(text: string): number {
  const matches = [...text.matchAll(/(\d+)([smhd])/g)];
  if (!matches.length) throw new Error("no duration tokens found");
  const parsedLength = matches.reduce((length, match) => length + match[0].length, 0);
  if (matches[0].index !== 0 || parsedLength !== text.length) {
    throw new Error("invalid duration");
  }
  return matches.reduce((sum, m) => sum + Number(m[1]) * UNIT[m[2]], 0);
}
export function format(seconds: number): string {
  let s = Math.trunc(seconds); const out: string[] = [];
  for (const u of ["d", "h", "m", "s"]) { const q = Math.trunc(s / UNIT[u]); s %= UNIT[u]; if (q) out.push(q + u); }
  return out.join("") || "0s";
}
