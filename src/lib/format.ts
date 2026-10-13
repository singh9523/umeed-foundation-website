export function formatDate(date?: Date, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }) {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-IN', { ...opts, timeZone: 'UTC' }).format(date);
}

export function isoDate(date?: Date) {
  return date ? date.toISOString().slice(0, 10) : '';
}

/** Converts a YouTube link (watch, youtu.be, shorts) into its video ID. */
export function youtubeId(url?: string) {
  if (!url) return undefined;
  const m = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
  return m?.[1];
}

/** Minimal, safe Markdown-ish rendering for paragraphs stored in JSON data files. */
export function paragraphs(text?: string) {
  return (text ?? '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}
