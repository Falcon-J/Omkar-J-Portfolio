export function localMinutes(date: Date): number {
  return date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
}

function normalized(minutes: number): number {
  if (!Number.isFinite(minutes)) throw new RangeError('Time must be finite');
  return ((minutes % 1440) + 1440) % 1440;
}

export function formatTime(minutes: number): string {
  const value = Math.floor(normalized(minutes));
  return `${Math.floor(value / 60).toString().padStart(2, '0')}:${(value % 60).toString().padStart(2, '0')}`;
}

export function lightingAt(minutes: number): { night: number; lamps: number; phase: string } {
  const value = normalized(minutes);
  let night: number;
  let phase: string;
  if (value < 300 || value >= 1200) { night = 0.62; phase = 'Night'; }
  else if (value < 480) { night = 0.62 * (1 - (value - 300) / 180); phase = 'Dawn'; }
  else if (value < 960) { night = 0; phase = 'Day'; }
  else { night = 0.62 * ((value - 960) / 240); phase = 'Dusk'; }
  return { night, lamps: night / 0.62, phase };
}
