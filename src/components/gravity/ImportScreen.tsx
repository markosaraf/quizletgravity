'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  loadImportedSet,
  parseCsv,
  parsePastedList,
  readFileAsText,
  saveImportedSet,
} from '@/lib/gravity/parse';
import { STRINGS, format } from '@/lib/gravity/strings';
import type { GravitySet, GravityTerm } from '@/lib/gravity/types';

interface Props {
  onStart: (set: GravitySet, terms: GravityTerm[]) => void;
}

const SAMPLE = 'helio-, sun\ngeo-, earth\nbio-, life\nchrom-, color';

export function ImportScreen({ onStart }: Props) {
  const [tab, setTab] = useState<'paste' | 'file'>('paste');
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // offer to restore the last set (read post-hydration to avoid SSR mismatch)
  const [lastSet, setLastSet] = useState<{
    title: string;
    terms: GravityTerm[];
  } | null>(null);
  useEffect(() => {
    const t = setTimeout(() => setLastSet(loadImportedSet()), 0);
    return () => clearTimeout(t);
  }, []);
  const restored = !!lastSet;

  const terms: GravityTerm[] = useMemo(
    () => (tab === 'paste' ? parsePastedList(text) : parseCsv(text).terms),
    [tab, text],
  );

  const handleFile = useCallback(async (file: File) => {
    try {
      const content = await readFileAsText(file);
      setText(content);
      setFileName(file.name);
      setError(null);
    } catch {
      setError(STRINGS.import.error_generic);
    }
  }, []);

  const handleStart = useCallback(() => {
    if (terms.length < 2) {
      setError(
        terms.length === 0
          ? STRINGS.import.error_generic
          : STRINGS.import.error_single,
      );
      return;
    }
    const set: GravitySet = {
      id: 'imported',
      title: fileName ?? 'My study set',
      wordLang: 'en',
      defLang: 'en',
    };
    saveImportedSet(set.title, terms);
    onStart(set, terms);
  }, [terms, fileName, onStart]);

  const handleRestore = useCallback(() => {
    if (!lastSet) return;
    onStart(
      { id: 'imported', title: lastSet.title, wordLang: 'en', defLang: 'en' },
      lastSet.terms,
    );
  }, [lastSet, onStart]);

  return (
    <div className="gravity-root">
      <div className="GravityImportView">
        <div className="GravityImportView-inner">
          <h1 className="GravityImportView-title">{STRINGS.import.title}</h1>
          <p className="GravityImportView-subtitle">{STRINGS.import.subtitle}</p>

          <div className="GravityImportCard">
            <div className="GravityImportTabs">
              <button
                type="button"
                className={`GravityImportTab ${tab === 'paste' ? 'is-active' : ''}`}
                onClick={() => {
                  setTab('paste');
                  setError(null);
                }}
              >
                {STRINGS.import.paste_tab}
              </button>
              <button
                type="button"
                className={`GravityImportTab ${tab === 'file' ? 'is-active' : ''}`}
                onClick={() => {
                  setTab('file');
                  setError(null);
                }}
              >
                {STRINGS.import.file_tab}
              </button>
            </div>

            {tab === 'paste' ? (
              <>
                <textarea
                  className="GravityImportTextarea"
                  value={text}
                  placeholder={SAMPLE}
                  onChange={(e) => {
                    setText(e.target.value);
                    setError(null);
                  }}
                  aria-label={STRINGS.import.paste_tab}
                />
                <p className="GravityImportMeta">{STRINGS.import.meta_paste}</p>
              </>
            ) : (
              <>
                <label className="GravityImportFileLabel">
                  <input
                    type="file"
                    accept=".csv,.tsv,.txt,text/csv,text/plain"
                    className="GravityImportFileInput"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) void handleFile(file);
                    }}
                  />
                  {fileName ? `📄 ${fileName}` : STRINGS.import.file_label}
                </label>
                <p className="GravityImportMeta">{STRINGS.import.file_hint}</p>
              </>
            )}

            {terms.length > 0 ? (
              <div className="GravityImportPreview" aria-live="polite">
                <div style={{ padding: '0.5rem 1rem 0.25rem', color: '#3ccfcf', fontWeight: 700, fontSize: '0.875rem' }}>
                  {format(STRINGS.import.detected, { count: terms.length })}
                </div>
                {terms.slice(0, 30).map((t) => (
                  <div key={t.id} className="GravityImportPreview-row">
                    <span>{t.word}</span>
                    <span>{t.definition}</span>
                  </div>
                ))}
                {terms.length > 30 ? (
                  <div
                    style={{
                      padding: '0.375rem 1rem',
                      color: '#a4aebc',
                      fontSize: '0.75rem',
                    }}
                  >
                    + {terms.length - 30} more…
                  </div>
                ) : null}
              </div>
            ) : null}

            {error ? (
              <div className="GravityImportError" role="alert">
                {error}
              </div>
            ) : null}

            <div className="GravityImportActions">
              <button
                className="UIButton UIButton--hero"
                onClick={handleStart}
                disabled={terms.length < 2}
              >
                {STRINGS.import.start_button}
              </button>
              <button
                className="UIButton UIButton--default"
                onClick={() => {
                  setText('');
                  setFileName(null);
                  setError(null);
                }}
              >
                {STRINGS.import.clear_button}
              </button>
            </div>
          </div>

          {restored && lastSet ? (
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <button className="UILink" onClick={handleRestore}>
                {STRINGS.import.last_set} ({lastSet.terms.length} terms) →
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
