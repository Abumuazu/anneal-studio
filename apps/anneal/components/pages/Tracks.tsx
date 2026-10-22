import { Parallax } from '@studio/kit/motion';
import { type ReactNode } from 'react';

export interface TrackCard {
  top: ReactNode;
  title: string;
  body: string;
  extra?: ReactNode;
  dark?: boolean;
}

/** Three cards drifting at different speeds (data-par 30, 100 and 170 on the boards). */
export function Tracks({ cards, titleSize }: { cards: readonly TrackCard[]; titleSize: string }) {
  const distances = [30, 100, 170];
  return (
    <div className="grid items-start gap-5 desk:grid-cols-3">
      {cards.map((c, i) => (
        <Parallax key={c.title} distance={distances[i] ?? 0}>
          <article
            className={`flex min-h-[340px] flex-col rounded-[28px] p-[34px] ${c.dark ? 'bg-ink text-panel' : 'bg-panel text-ink'}`}
          >
            <div className="flex justify-between">{c.top}</div>
            <h3 className={`type-h3 mt-auto mb-0 pt-10 ${titleSize}`}>{c.title}</h3>
            <p className={`type-body mt-3.5 mb-0 ${c.dark ? 'text-grey-300' : 'text-grey-700'}`}>
              {c.body}
            </p>
            {c.extra}
          </article>
        </Parallax>
      ))}
    </div>
  );
}
