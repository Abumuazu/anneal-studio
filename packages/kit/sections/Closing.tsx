import { type ReactNode } from 'react';

import { cx } from '../lib/cx';
import { FollowRegion } from '../motion/Follow';
import { Marquee } from '../motion/Marquee';

export interface ClosingRow {
  text: string;
  /** Dimmed row (the middle line on the boards). */
  muted?: boolean;
}

interface ClosingProps {
  rows: readonly ClosingRow[];
  /** Floating nav message while this section is in view. */
  msg?: string;
  id?: string;
  /** A call to action that trails the pointer across the section (Home). */
  follower?: ReactNode;
  /** "large" on the home page; "compact" on inner pages (smaller rows, tighter gap). */
  size?: 'large' | 'compact';
  /** Content under the marquee (buttons, or the clock and call link row). */
  children?: ReactNode;
  className?: string;
}

/**
 * The sticky closing section: big marquee rows whose speed follows scroll
 * velocity. Rows alternate direction. Put it first inside a wrapper with the
 * glass footer after it, so the footer slides over it.
 */
export function Closing({
  rows,
  msg,
  id,
  follower,
  size = 'large',
  children,
  className,
}: ClosingProps) {
  const body = (
    <>
      <div
        className={cx(
          'type-display-wide flex flex-col',
          size === 'large'
            ? 'gap-2.5 text-[clamp(56px,8.4vw,124px)]'
            : 'gap-2 text-[clamp(48px,6.8vw,104px)]',
        )}
      >
        {rows.map((row, i) => (
          <Marquee
            key={row.text}
            direction={i % 2 === 1 ? 1 : -1}
            className={cx(row.muted && 'text-grey-500')}
          >
            {row.text}
          </Marquee>
        ))}
      </div>
      {children}
    </>
  );
  const classes = cx(
    'sticky top-0 z-[1] overflow-hidden bg-ink pt-[130px] text-panel',
    size === 'large' ? 'pb-[220px]' : 'pb-[230px]',
    className,
  );
  if (follower) {
    return (
      <FollowRegion id={id} data-msg={msg} follower={follower} restY={300} className={classes}>
        {body}
      </FollowRegion>
    );
  }
  return (
    <section id={id} data-msg={msg} className={classes}>
      {body}
    </section>
  );
}
