export type MapPlace = "home" | "journey" | "workshop" | "now" | "contact";
export type MapDetail = "personal" | "music" | "cars" | "sports" | "stories" | "journal" | "saathi" | "atlaspay" | "toolkit" | "notebook" | "letter";
const hashes: Record<MapPlace, string> = { home: "#about", journey: "#journey", workshop: "#projects", now: "#now", contact: "#contact" };
const details: Record<MapPlace, readonly MapDetail[]> = {
  home: ["personal", "music", "cars", "sports", "stories"],
  journey: ["journal"],
  workshop: ["saathi", "atlaspay", "toolkit"],
  now: ["notebook"],
  contact: ["letter"],
};
export function hashForPlace(place: MapPlace, detail?: MapDetail | null): string {
  return hashes[place] + (detail && details[place].includes(detail) ? `/${detail}` : "");
}
export function mapLocationFromHash(hash: string): { place: MapPlace | null; detail: MapDetail | null; skills: boolean } {
  if (hash === "#skills") return { place: "workshop", detail: "toolkit", skills: true };
  const [base, detail] = hash.split("/");
  const place = (Object.keys(hashes) as MapPlace[]).find((item) => hashes[item] === base) ?? null;
  return { place, detail: place && details[place].includes(detail as MapDetail) ? detail as MapDetail : null, skills: false };
}
export function placeFromHash(hash: string): MapPlace | null { return mapLocationFromHash(hash).place; }
export function localMinutes(date: Date): number { return date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60; }
function normalized(minutes: number): number {
  if (!Number.isFinite(minutes)) throw new RangeError("Time must be finite");
  return ((minutes % 1440) + 1440) % 1440;
}
export function formatTime(minutes: number): string {
  const value = Math.floor(normalized(minutes));
  return `${Math.floor(value / 60).toString().padStart(2, "0")}:${(value % 60).toString().padStart(2, "0")}`;
}
export function lightingAt(minutes: number): { night: number; lamps: number; phase: string } {
  const value = normalized(minutes);
  let night: number, phase: string;
  if (value < 300 || value >= 1200) { night = 0.62; phase = "Night"; }
  else if (value < 480) { night = 0.62 * (1 - (value - 300) / 180); phase = "Dawn"; }
  else if (value < 960) { night = 0; phase = "Day"; }
  else { night = 0.62 * ((value - 960) / 240); phase = "Dusk"; }
  return { night, lamps: night / 0.62, phase };
}

export type SceneKey = "sunset" | "sunrise" | "moonrise" | "night";
export const scenePresets = [
  { id: "sunrise", label: "Sunrise", minutes: 360, icon: "↗" },
  { id: "day", label: "Day", minutes: 720, icon: "☀" },
  { id: "sunset", label: "Sunset", minutes: 1020, icon: "↘" },
  { id: "moonrise", label: "Moonrise", minutes: 1140, icon: "☽" },
  { id: "night", label: "Night", minutes: 1380, icon: "✦" },
  { id: "moonset", label: "Moonset", minutes: 300, icon: "↙" },
] as const;
const sceneFrames: { minutes: number; key: SceneKey }[] = [
  { minutes: 0, key: "night" }, { minutes: 240, key: "night" },
  { minutes: 300, key: "moonrise" }, { minutes: 360, key: "sunrise" },
  { minutes: 720, key: "sunset" }, { minutes: 1020, key: "sunset" },
  { minutes: 1140, key: "moonrise" }, { minutes: 1320, key: "night" },
  { minutes: 1440, key: "night" },
];
export function sceneAt(minutes: number): { from: SceneKey; to: SceneKey; mix: number; weights: Record<SceneKey, number>; sky: string } {
  const value = normalized(minutes);
  const index = sceneFrames.findIndex((frame, i) => i < sceneFrames.length - 1 && value < sceneFrames[i + 1].minutes);
  const from = sceneFrames[index], to = sceneFrames[index + 1];
  const progress = (value - from.minutes) / (to.minutes - from.minutes);
  const mix = progress * progress * (3 - 2 * progress);
  const weights = { sunset: 0, sunrise: 0, moonrise: 0, night: 0 };
  weights[from.key] += 1 - mix;
  weights[to.key] += mix;
  const skyColors = { sunset: [254, 232, 200], sunrise: [185, 164, 214], moonrise: [11, 31, 114], night: [20, 40, 134] };
  const channels = [0, 1, 2].map((channel) => Math.round((Object.keys(weights) as SceneKey[]).reduce((sum, key) => sum + weights[key] * skyColors[key][channel], 0)));
  return { from: from.key, to: to.key, mix, weights, sky: `rgb(${channels.join(" ")})` };
}
