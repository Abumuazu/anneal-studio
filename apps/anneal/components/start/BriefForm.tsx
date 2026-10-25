'use client';

import { track } from '@studio/kit/lib';
import { type ReactNode, useActionState, useEffect, useId, useRef, useState } from 'react';

import { type BriefResult, sendBrief } from '@/app/actions/brief';
import { startStates } from '@/content/interaction';

import { startCopy } from '@/content/appendix';
import { copy } from '@/content/copy';
import { startBoardCopy } from '@/content/pages';
import { ATTRIBUTION_KEYS, OFFERS } from '@/lib/brief-fields';

import { captureAttribution, readAttribution } from './attribution';

const b = startCopy.brief;
const STEPS = 4;

interface ChoicesProps {
  name: string;
  options: readonly string[];
  value: string;
  onPick: (value: string) => void;
  small?: boolean;
  /** On phones, one pill per row. */
  stack?: boolean;
}

/** A single-choice group drawn as pills, on native radios. */
function Choices({ name, options, value, onPick, small, stack }: ChoicesProps) {
  return (
    <div className={`flex flex-wrap gap-2.5 ${stack ? 'max-desk:flex-col max-desk:gap-2' : ''}`}>
      {options.map((o) => (
        <label
          key={o}
          className={`${small ? 'opt opt-sm' : 'opt'} ${stack ? 'max-desk:w-full max-desk:justify-between' : ''}`}
        >
          <input
            type="radio"
            name={name}
            value={o}
            checked={value === o}
            onChange={() => onPick(o)}
            className="sr-only"
          />
          {o}
        </label>
      ))}
    </div>
  );
}

/** "Send a brief": four short steps, then a Server Action that stores and emails it. */
export function BriefForm() {
  const id = useId();
  const [state, action, pending] = useActionState<BriefResult | null, FormData>(sendBrief, null);
  const [step, setStep] = useState(1);
  const [moved, setMoved] = useState(false);
  const [offer, setOffer] = useState('');
  const [stage, setStage] = useState('');
  const [timing, setTiming] = useState('');
  const [heard, setHeard] = useState('');
  const [attribution, setAttribution] = useState<Record<string, string>>({});
  const started = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const done = useRef<HTMLDivElement>(null);
  const sent = state?.ok === true;

  useEffect(() => {
    // This effect can run before the site-wide one, so capture here too (it only keeps the first).
    captureAttribution();
    setAttribution(readAttribution());
  }, []);

  // After Back or Continue, take the reader to the new step's heading.
  useEffect(() => {
    if (moved) heading.current?.focus();
  }, [step, moved]);

  useEffect(() => {
    if (!sent) return;
    done.current?.focus();
    track('brief_sent', { offer: offer || 'none' });
    // Only once, when the brief goes through.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sent]);

  const begin = () => {
    if (started.current) return;
    started.current = true;
    track('brief_started');
  };

  const go = (to: number) => {
    setMoved(true);
    setStep(Math.max(1, Math.min(STEPS, to)));
  };

  const sketch: ReactNode[] = [];
  if (offer) sketch.push(offer);
  if (stage) sketch.push(stage.toLowerCase());
  if (timing) sketch.push(timing.toLowerCase());

  const legend = (text: string, n: number) => (
    <legend className="p-0">
      <h3
        ref={step === n ? heading : undefined}
        tabIndex={-1}
        className="type-display m-0 mb-4 text-[clamp(48px,4.6vw,64px)] outline-none"
      >
        {text}
      </h3>
    </legend>
  );

  return (
    <div aria-live="polite" className="flex flex-1 flex-col gap-[26px]">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="type-h3 m-0 text-[32px]">{b.title}</h2>
        <span className="type-label text-grey-600">
          {sent ? startBoardCopy.done : b.progress.replace('[n]', String(step))}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-1.5" aria-hidden="true">
        {Array.from({ length: STEPS }, (_, i) => (
          <span
            key={i}
            className="h-1.5 rounded-full transition-colors duration-500"
            style={{
              background: sent
                ? 'var(--color-accent)'
                : i < step
                  ? 'var(--color-ink)'
                  : 'var(--color-grey-100)',
            }}
          />
        ))}
      </div>

      {sent ? (
        <div
          ref={done}
          tabIndex={-1}
          className="flex flex-1 flex-col justify-center gap-[18px] outline-none"
        >
          <span className="type-label text-grey-600">{b.received}</span>
          <span className="type-display text-[clamp(48px,5vw,72px)]">{copy['start.thanks.t']}</span>
          <span className="type-lead max-w-[500px] text-grey-700">{copy['start.thanks.x']}</span>
        </div>
      ) : (
        <form id={id} action={action} onChange={begin} className="flex flex-1 flex-col gap-[26px]">
          {ATTRIBUTION_KEYS.map((k) => (
            <input key={k} type="hidden" name={k} value={attribution[k] ?? ''} />
          ))}
          {/* Honeypot for bots: hidden from people and assistive tech. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-px w-px opacity-0"
          />

          <fieldset hidden={step !== 1} className="m-0 flex flex-col gap-4 border-0 p-0">
            {legend(b.need, 1)}
            <span className="type-label text-grey-600">{copy['start.step1.help']}</span>
            <Choices
              name="offer"
              stack
              options={OFFERS}
              value={offer}
              onPick={(o) => {
                setOffer(o);
                track('offer_chosen', { offer: o });
              }}
            />
          </fieldset>

          <fieldset hidden={step !== 2} className="m-0 flex flex-col gap-4 border-0 p-0">
            {legend(b.where, 2)}
            <Choices name="stage" options={b.stages} value={stage} onPick={setStage} />
          </fieldset>

          <fieldset hidden={step !== 3} className="m-0 flex flex-col gap-4 border-0 p-0">
            {legend(b.timing, 3)}
            <span className="type-label text-grey-600" id={`${id}-when`}>
              {b.when}
            </span>
            <div role="group" aria-labelledby={`${id}-when`}>
              <Choices name="timing" options={b.timings} value={timing} onPick={setTiming} />
            </div>
            <div className="fld mt-2">
              <label htmlFor={`${id}-budget`} className="type-label text-grey-600">
                {b.budget}
              </label>
              <input
                id={`${id}-budget`}
                name="budget"
                type="text"
                className="inp"
                aria-describedby={`${id}-budget-help`}
              />
              <p id={`${id}-budget-help`} className="type-body mt-2 text-grey-700">
                {startStates['Budget helper']}
              </p>
            </div>
          </fieldset>

          <fieldset hidden={step !== 4} className="m-0 flex flex-col gap-3.5 border-0 p-0">
            {legend(b.about, 4)}
            <div className="grid gap-3.5 sm:grid-cols-2">
              <div className="fld">
                <label htmlFor={`${id}-name`} className="type-label text-grey-600">
                  {b.name}
                </label>
                <input
                  id={`${id}-name`}
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="inp"
                />
              </div>
              <div className="fld">
                <label htmlFor={`${id}-email`} className="type-label text-grey-600">
                  {b.email}
                </label>
                <input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  aria-invalid={state?.invalid ? true : undefined}
                  className="inp"
                />
              </div>
            </div>
            <div className="fld">
              <label htmlFor={`${id}-co`} className="type-label text-grey-600">
                {b.company}
              </label>
              <input
                id={`${id}-co`}
                name="company"
                type="text"
                autoComplete="organization"
                className="inp"
              />
            </div>
            <div className="fld">
              <label htmlFor={`${id}-msg`} className="type-label text-grey-600">
                {b.message}
              </label>
              <textarea id={`${id}-msg`} name="message" className="inp ta" />
            </div>
            <div className="fld">
              <span className="type-label text-grey-600" id={`${id}-heard`}>
                {b.heard}
              </span>
              <div role="group" aria-labelledby={`${id}-heard`}>
                <Choices name="heard" options={b.sources} value={heard} onPick={setHeard} small />
              </div>
            </div>
            <p className="type-label m-0 text-grey-600">{b.tags}</p>
          </fieldset>

          <div className="rounded-2xl bg-grey-50 px-[18px] py-3.5">
            <div className="type-label text-grey-600">{b.sketch}</div>
            <div className="mt-1.5 font-text text-base font-medium">
              {sketch.length
                ? sketch.map((s, i) => (
                    <span key={i}>
                      {i > 0 ? ' · ' : null}
                      {s}
                    </span>
                  ))
                : b.sketchEmpty}
            </div>
          </div>

          {state && !state.ok && (
            <p role="alert" className="type-body text-ink">
              {state.invalid
                ? startStates['Brief validation']
                : startStates['Brief receipt uncertain']}
            </p>
          )}
          <div className="mt-auto flex items-center justify-between pt-3">
            <button
              type="button"
              onClick={() => go(step - 1)}
              className="sbtn bg-grey-50 text-ink"
              style={{ visibility: step > 1 ? 'visible' : 'hidden' }}
            >
              {b.back}
            </button>
            {/* Keyed apart: reusing one node would turn the clicked Continue into a
                submit button mid-click and send the form a step early. */}
            {step < STEPS ? (
              <button
                key="next"
                type="button"
                onClick={() => go(step + 1)}
                className="sbtn bg-ink text-panel"
              >
                {b.next} <span aria-hidden="true">→</span>
              </button>
            ) : (
              <button
                key="send"
                type="submit"
                disabled={pending}
                className="sbtn bg-accent text-on-accent disabled:opacity-70"
              >
                {pending ? 'Sending brief' : b.send}
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
