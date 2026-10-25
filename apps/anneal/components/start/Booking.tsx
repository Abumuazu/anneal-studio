'use client';

import { track } from '@studio/kit/lib';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import { startStates } from '@/content/interaction';

import { startCopy } from '@/content/appendix';
import { startBoardCopy } from '@/content/pages';

import { type LocalDay, localDays, zoneName } from './slots';

const c = startCopy.booking;
/** Shown before the visitor's zone is known (server render). */
const STUDIO_ZONE = 'Africa/Lagos';
const KNOWN_ZONES = { 'Africa/Lagos': 'WAT' } as const;

type Load = { state: 'loading' } | { state: 'ready'; days: LocalDay[] } | { state: 'failed' };

/**
 * "Book a 30-minute call": pick a day, a time and give an email. Slots come
 * from /api/slots (Cal.com behind it) and show in the visitor's own time zone.
 */
export function Booking() {
  const id = useId();
  const [zone, setZone] = useState<string>(STUDIO_ZONE);
  const [starts, setStarts] = useState<string[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [dayKey, setDayKey] = useState<string | null>(null);
  const [start, setStart] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [uncertain, setUncertain] = useState(false);
  const [booked, setBooked] = useState<string | null>(null);
  const bookedRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    setStarts(null);
    setFailed(false);
    try {
      const res = await fetch('/api/slots', {
        cache: 'no-store',
        signal: AbortSignal.timeout(15000),
      });
      const body = (await res.json()) as { ok: boolean; days?: { slots: string[] }[] };
      if (!body.ok || !body.days) throw new Error('No slots');
      setStarts(body.days.flatMap((d) => d.slots));
    } catch {
      setFailed(true);
    }
  }, []);

  useEffect(() => {
    setZone(Intl.DateTimeFormat().resolvedOptions().timeZone || STUDIO_ZONE);
    void load();
  }, [load]);

  const loaded: Load = failed
    ? { state: 'failed' }
    : starts
      ? { state: 'ready', days: localDays(starts, zone) }
      : { state: 'loading' };
  const days = loaded.state === 'ready' ? loaded.days : [];
  const day = days.find((d) => d.key === dayKey) ?? null;
  const slot = day?.slots.find((s) => s.start === start) ?? null;
  const zoneLabel = useMemo(() => zoneName(zone, KNOWN_ZONES), [zone]);
  const choice = day && slot ? `${day.label}, ${slot.time}` : null;

  useEffect(() => {
    if (booked) bookedRef.current?.focus();
  }, [booked]);

  const submit = async (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault();
    if (!slot || !choice || pending) return;
    const email = new FormData(e.currentTarget).get('email');
    setPending(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        signal: AbortSignal.timeout(20000),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start: slot.start, email, timeZone: zone }),
      });
      const body = (await res.json()) as { ok: boolean };
      if (!body.ok) throw new Error('Not booked');
      setBooked(`${choice} ${zoneLabel}`);
      track('call_booked');
    } catch {
      setUncertain(true);
    } finally {
      setPending(false);
    }
  };

  const again = () => {
    setBooked(null);
    setUncertain(false);
    setDayKey(null);
    setStart(null);
    void load();
  };

  return (
    <div aria-live="polite" className="flex flex-1 flex-col gap-[26px]">
      {booked ? (
        <div
          ref={bookedRef}
          tabIndex={-1}
          className="flex flex-1 flex-col justify-center gap-4 outline-none"
        >
          <span className="type-label text-grey-400">{c.booked}</span>
          <span className="type-display text-[clamp(48px,5vw,72px)]">{booked}</span>
          <span className="type-body text-grey-300">{c.invite}</span>
          <button type="button" className="sbtn self-start bg-grey-850 text-panel" onClick={again}>
            {c.again}
          </button>
        </div>
      ) : (
        <form onSubmit={(e) => void submit(e)} className="flex flex-1 flex-col gap-[26px]">
          {loaded.state === 'loading' && (
            <p role="status" className="type-body m-0 text-grey-300">
              {startStates['Booking loading']}
            </p>
          )}
          {(loaded.state === 'failed' || (loaded.state === 'ready' && !days.length)) && (
            <div className="type-body text-grey-300">
              <p role="alert">
                {loaded.state === 'failed'
                  ? startStates['Booking calendar error']
                  : startStates['Booking no availability']}
              </p>
              <button
                type="button"
                className="sbtn bg-grey-850 text-panel"
                onClick={() => void load()}
              >
                {startStates['Booking retry']}
              </button>
            </div>
          )}
          <fieldset className="m-0 border-0 p-0" aria-busy={loaded.state === 'loading'}>
            <legend className="type-label mb-3 p-0 text-grey-400">{c.day}</legend>
            <div className="days">
              {loaded.state === 'ready'
                ? days.map((d) => (
                    <label key={d.key} className="day">
                      <input
                        type="radio"
                        name="day"
                        value={d.key}
                        checked={dayKey === d.key}
                        onChange={() => {
                          setDayKey(d.key);
                          setStart(null);
                        }}
                        className="sr-only"
                      />
                      <span className="type-label text-[9.5px]" aria-hidden="true">
                        {d.weekday}
                      </span>
                      <span
                        className="text-[22px] font-semibold tracking-[-0.02em]"
                        aria-hidden="true"
                      >
                        {d.day}
                      </span>
                      <span className="sr-only">{d.label}</span>
                    </label>
                  ))
                : Array.from({ length: 10 }, (_, i) => (
                    <span key={i} className="day day-empty" aria-hidden="true" />
                  ))}
            </div>
          </fieldset>
          <fieldset className="m-0 border-0 p-0">
            <legend className="type-label mb-3 p-0 text-grey-400">{c.time}</legend>
            <div className="flex min-h-12 flex-wrap gap-2">
              {day?.slots.map((s) => (
                <label key={s.start} className="opt opt-dark">
                  <input
                    type="radio"
                    name="time"
                    value={s.start}
                    checked={start === s.start}
                    onChange={() => setStart(s.start)}
                    className="sr-only"
                  />
                  {s.time}
                </label>
              ))}
            </div>
          </fieldset>
          {uncertain && (
            <div role="alert" className="type-body text-grey-300">
              <p>{startStates['Booking confirmation uncertain']}</p>
              <button type="button" className="sbtn bg-grey-850 text-panel" onClick={again}>
                {c.again}
              </button>
            </div>
          )}
          <div className="mt-auto flex flex-col gap-3">
            <label htmlFor={`${id}-email`} className="type-label text-grey-400">
              {c.email}
            </label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={c.placeholder}
              className="inp inp-dark"
            />
            <button
              type="submit"
              disabled={!choice || pending || uncertain}
              className="sbtn bg-accent text-on-accent disabled:opacity-45"
            >
              {pending
                ? 'Confirming booking'
                : choice
                  ? 'Confirm booking'
                  : `${c.confirm} ${startBoardCopy.aTime}`}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

/** "Times shown in WAT", in the visitor's zone once known. */
export function BookingZone() {
  const [label, setLabel] = useState<string>(KNOWN_ZONES[STUDIO_ZONE]);
  useEffect(() => {
    setLabel(
      zoneName(Intl.DateTimeFormat().resolvedOptions().timeZone || STUDIO_ZONE, KNOWN_ZONES),
    );
  }, []);
  return (
    <span className="type-label text-grey-400">
      {c.zone} {label}
    </span>
  );
}
