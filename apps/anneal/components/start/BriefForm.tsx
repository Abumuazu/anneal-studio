'use client';

import { track } from '@studio/kit/lib';
import { CURRENCY_EVENT, CurrencySwitch, Price, readCurrency } from '@studio/kit/ui';
import { type ReactNode, useActionState, useEffect, useId, useRef, useState } from 'react';

import { type BriefResult, sendBrief } from '@/app/actions/brief';
import { startCopy } from '@/content/appendix';
import { boardCopy, copy } from '@/content/copy';
import { CURRENCY_COOKIE, currencyOptions } from '@/content/currency';
import { startBoardCopy } from '@/content/pages';
import { type Offer, priceValues } from '@/content/prices';
import { ATTRIBUTION_KEYS, OFFERS } from '@/lib/brief-fields';

import { captureAttribution, readAttribution } from './attribution';

const b = startCopy.brief;
const STEPS = 4;

/** The price each offer starts from, in the order the deck lists them ("Something else" has none). */
const OFFER_PRICES: readonly (Offer | null)[] = [
  'website',
  'aiFeature',
  'webMvp',
  'mobileMvp',
  'care',
  null,
];

interface ChoicesProps {
  name: string;
  options: readonly string[];
  value: string;
  onPick: (value: string) => void;
  small?: boolean;
  extra?: (index: number) => ReactNode;
}

/** A single-choice group drawn as pills, on native radios. */
function Choices({ name, options, value, onPick, small, extra }: ChoicesProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((o, i) => (
        <label key={o} className={small ? 'opt opt-sm' : 'opt'}>
          <input
            type="radio"
            name={name}
            value={o}
            checked={value === o}
            onChange={() => onPick(o)}
            className="sr-only"
          />
          {o}
          {extra?.(i)}
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
  const [currency, setCurrency] = useState('');
  const [attribution, setAttribution] = useState<Record<string, string>>({});
  const started = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const done = useRef<HTMLDivElement>(null);
  const sent = state?.ok === true;

  useEffect(() => {
    // This effect can run before the site-wide one, so capture here too (it only keeps the first).
    captureAttribution();
    setAttribution(readAttribution());
    const sync = () => setCurrency(readCurrency() ?? '');
    sync();
    window.addEventListener(CURRENCY_EVENT, sync);
    return () => window.removeEventListener(CURRENCY_EVENT, sync);
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

  const offerIndex = OFFERS.indexOf(offer);
  const offerPrice = offerIndex >= 0 ? OFFER_PRICES[offerIndex] : null;
  const sketch: ReactNode[] = [];
  if (offer) {
    sketch.push(
      offerPrice ? (
        <span key="offer">
          {offer} · {b.from} <Price values={priceValues(offerPrice)} />
        </span>
      ) : (
        offer
      ),
    );
  }
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
          <span className="type-display text-[clamp(64px,7vw,96px)]">{copy['start.thanks.t']}</span>
          <span className="type-lead max-w-[500px] text-grey-700">{copy['start.thanks.x']}</span>
        </div>
      ) : (
        <form id={id} action={action} onChange={begin} className="flex flex-1 flex-col gap-[26px]">
          <input type="hidden" name="currency" value={currency} />
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
              options={OFFERS}
              value={offer}
              onPick={(o) => {
                setOffer(o);
                track('offer_chosen', { offer: o });
              }}
              extra={(i) => {
                const key = OFFER_PRICES[i];
                return (
                  <span className="type-label ml-3 opacity-60">
                    {key ? (
                      <>
                        {b.from} <Price values={priceValues(key)} />
                      </>
                    ) : (
                      b.quoted
                    )}
                  </span>
                );
              }}
            />
            <CurrencySwitch
              className="mt-1.5"
              options={currencyOptions}
              cookie={CURRENCY_COOKIE}
              label={boardCopy.currencyGroup}
              prefix={<span className="type-label mr-1.5 text-grey-600">{boardCopy.pricesIn}</span>}
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
              <input id={`${id}-budget`} name="budget" type="text" className="inp" />
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
                {b.send}
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
