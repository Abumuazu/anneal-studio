'use client';

import { type ReactNode, useActionState, useEffect, useId, useRef } from 'react';

import { cx } from '../lib/cx';

/** Fired on window with `{ source }` once an address is stored, for analytics. */
export const CAPTURE_EVENT = 'kit:capture';

export interface CaptureResult {
  ok: boolean;
  /** Set when the server rejects the address itself. */
  invalid?: boolean;
}

interface EmailCaptureProps {
  /** A Server Action that stores the address. Receives the form data. */
  action: (prev: CaptureResult | null, data: FormData) => Promise<CaptureResult>;
  label: string;
  placeholder: string;
  submit: ReactNode;
  pendingLabel?: ReactNode;
  invalidMessage?: ReactNode;
  /** Shown under the field (privacy note). */
  note?: ReactNode;
  /** Replaces the form once the address is stored. */
  success: ReactNode;
  /** Shown if the server could not store the address. */
  failure?: ReactNode;
  /** Hidden field telling the action which form sent it. */
  source: string;
  className?: string;
}

/**
 * An email form backed by a Server Action. The success panel only appears
 * when the action reports that the address was stored; it takes focus and is
 * announced politely.
 */
export function EmailCapture({
  action,
  label,
  placeholder,
  submit,
  pendingLabel,
  invalidMessage,
  note,
  success,
  failure,
  source,
  className,
}: EmailCaptureProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const id = useId();
  const done = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!state?.ok) return;
    done.current?.focus();
    window.dispatchEvent(new CustomEvent(CAPTURE_EVENT, { detail: { source } }));
  }, [state, source]);

  return (
    <div aria-live="polite" className={className}>
      {state?.ok ? (
        <div ref={done} tabIndex={-1} className="outline-none">
          {success}
        </div>
      ) : (
        <form action={formAction}>
          <input type="hidden" name="source" value={source} />
          <label htmlFor={id} className="type-label text-grey-400">
            {label}
          </label>
          <div className="mt-3.5 flex flex-col gap-2.5 sm:flex-row">
            <input
              id={id}
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={placeholder}
              aria-invalid={state?.invalid ? true : undefined}
              aria-describedby={note ? `${id}-note` : undefined}
              className="capture-input"
            />
            <button
              type="submit"
              disabled={pending}
              className={cx('capture-submit', pending && 'opacity-70')}
            >
              {pending ? (pendingLabel ?? submit) : submit}
            </button>
          </div>
          {note ? (
            <div id={`${id}-note`} className="mt-4 text-sm text-grey-400">
              {note}
            </div>
          ) : null}
          {state && !state.ok && (state.invalid ? invalidMessage : failure) ? (
            <p role="alert" className="mt-3 text-sm text-panel">
              {state.invalid ? invalidMessage : failure}
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
