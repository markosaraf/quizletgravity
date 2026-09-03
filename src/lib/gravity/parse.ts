import type { GravityTerm } from './types';

export const CORRECT_STORE_KEY = 'gravityAcceptsPartialAnswer';
export const SET_STORAGE_KEY = 'gravityImportedSet';

/** Parse one CSV line honoring quoted fields. */
function parseCsvLine(line: string, delimiter: string): string[] {
  const out: string[] = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === delimiter) {
      out.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

/** Detect the delimiter of a CSV-ish line. */
function detectDelimiter(line: string): string {
  const counts: Array<[string, number]> = [
    ['\t', 0],
    [',', 0],
    [';', 0],
  ];
  let inQuotes = false;
  for (const ch of line) {
    if (ch === '"') inQuotes = !inQuotes;
    else if (!inQuotes) {
      for (const c of counts) if (ch === c[0]) c[1]++;
    }
  }
  counts.sort((a, b) => b[1] - a[1]);
  return counts[0][1] > 0 ? counts[0][0] : '';
}

function splitPastedLine(line: string): [string, string] | null {
  // 1) tab
  const tabIdx = line.indexOf('\t');
  if (tabIdx > 0) {
    return [line.slice(0, tabIdx), line.slice(tabIdx + 1)];
  }
  // 2) semicolon
  const semiIdx = line.indexOf(';');
  if (semiIdx > 0) {
    return [line.slice(0, semiIdx), line.slice(semiIdx + 1)];
  }
  // 3) comma
  const commaIdx = line.indexOf(',');
  if (commaIdx > 0) {
    return [line.slice(0, commaIdx), line.slice(commaIdx + 1)];
  }
  // 4) dash separator " - "
  const dashMatch = line.match(/\s+[-–—]\s+/);
  if (dashMatch && dashMatch.index && dashMatch.index > 0) {
    return [
      line.slice(0, dashMatch.index),
      line.slice(dashMatch.index + dashMatch[0].length),
    ];
  }
  return null;
}

let termIdCounter = 0;
function makeTerm(word: string, definition: string): GravityTerm {
  termIdCounter += 1;
  // dash-free id: liveTermId = `term-{id}-{level}-{n}` and the original
  // zIndex math reads split('-')[3], so ids must not contain dashes
  const id = `${Date.now().toString(36)}${termIdCounter.toString(36)}`;
  return {
    id,
    luid: `term-${id}`,
    word: word.trim(),
    definition: definition.trim(),
    starred: false,
  };
}

export function parsePastedList(text: string): GravityTerm[] {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const terms: GravityTerm[] = [];
  for (const line of lines) {
    const pair = splitPastedLine(line);
    if (pair && pair[0] && pair[1]) {
      terms.push(makeTerm(pair[0], pair[1]));
    }
  }
  return terms;
}

export function parseCsv(text: string): TermParseResult {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trimEnd())
    .filter((l) => l.trim() !== '');
  if (lines.length === 0) return { terms: [], skipped: 0 };

  let startIdx = 0;
  const first = lines[0];
  const delimiter = detectDelimiter(first);
  if (!delimiter) {
    // fall back to pasted-list parsing rules
    return { terms: parsePastedList(text), skipped: 0 };
  }

  // skip a header row if it doesn't look like data
  const firstCells = parseCsvLine(first, delimiter);
  const headerLike =
    /^(term|word|vocabulary|front|question|prompt)s?$/i.test(firstCells[0] ?? '') ||
    /^(definition|meaning|back|answer|translation)s?$/i.test(firstCells[1] ?? '');
  if (headerLike) startIdx = 1;

  const terms: GravityTerm[] = [];
  let skipped = 0;
  for (let i = startIdx; i < lines.length; i++) {
    const cells = parseCsvLine(lines[i], delimiter);
    const word = (cells[0] ?? '').trim();
    const definition = (cells[1] ?? '').trim();
    if (word && (definition || cells.length > 2)) {
      terms.push(makeTerm(word, definition));
    } else if (word || definition) {
      skipped++;
    }
  }
  return { terms, skipped };
}

export interface TermParseResult {
  terms: GravityTerm[];
  skipped: number;
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

/** Persist imported set so returning players can resume quickly. */
export function saveImportedSet(title: string, terms: GravityTerm[]) {
  try {
    window.localStorage.setItem(
      SET_STORAGE_KEY,
      JSON.stringify({ title, terms }),
    );
  } catch {
    /* storage full — ignore */
  }
}

export function loadImportedSet(): { title: string; terms: GravityTerm[] } | null {
  try {
    const raw = window.localStorage.getItem(SET_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed.title === 'string' &&
      Array.isArray(parsed.terms) &&
      parsed.terms.length > 0
    ) {
      return parsed;
    }
  } catch {
    /* corrupted — ignore */
  }
  return null;
}

export function getStoredPartialAnswer(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(CORRECT_STORE_KEY) === '1';
}
