import { HoverPreviewList, InView, Reveal } from '@studio/kit/motion';
import { pickOnColor } from '@studio/kit/lib';
import { FilterChips, FilterGroup, FilterItem } from '@studio/kit/ui';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactNode } from 'react';

import { caseHref, cases } from '@/content/cases';
import { copy } from '@/content/copy';
import { workCopy } from '@/content/pages';

const INK = '#0b0b0c';
const PANEL = '#ffffff';

interface Row {
  href: string;
  group: 'projects' | 'ventures';
  /** Preview card colour and what it shows. */
  bg: string;
  art: ReactNode;
}

const RING = (
  <svg viewBox="0 0 200 200" className="h-[150px] w-[150px]">
    <ellipse cx="100" cy="118" rx="64" ry="50" fill="none" stroke="currentColor" strokeWidth="11" />
    <path d="M84 60L100 40L116 60L100 76Z" fill="currentColor" />
  </svg>
);

/** Preview colours for the three projects (WorkV6). */
const PROJECT_BG = ['#00ff5a', INK, '#eceae6'] as const;

const word = (text: string) => <span className="type-display-wide text-[40px]">{text}</span>;

/** Row by row as on WorkV6: three client projects, then three ventures. */
const ROWS: readonly Row[] = [
  ...cases.map((c): Row => ({
    href: caseHref(c.slug),
    group: 'projects',
    bg: PROJECT_BG[c.n - 1] ?? INK,
    art: [word(c.title), word(workCopy.exchangePreview), RING][c.n - 1],
  })),
  {
    href: '/products',
    group: 'ventures',
    bg: '#0000ff',
    art: (
      <Image src="/images/raum-logo.svg" alt="" width={120} height={44} className="h-11 w-auto" />
    ),
  },
  { href: '/products', group: 'ventures', bg: '#161616', art: word(copy['work.rows.5.title']) },
  { href: '/products', group: 'ventures', bg: '#f4f4f4', art: word(copy['work.rows.6.title']) },
];

const ROW_N = [1, 2, 3, 4, 5, 6] as const;

/** "Everything, in one list.": filter chips, the rows, and a preview that trails the pointer. */
export function WorkIndex() {
  const count = (g: Row['group']) =>
    String(ROWS.filter((r) => r.group === g).length).padStart(2, '0');
  const previews = ROWS.map((r, i) => {
    const fg = pickOnColor(r.bg, INK, PANEL);
    return (
      <div
        key={r.href + String(i)}
        className="flex h-full w-full items-center justify-center"
        style={{ background: r.bg, color: fg }}
      >
        {r.art}
        <span className="type-label absolute bottom-4 left-[18px] opacity-70">
          {workCopy.previewCaptions[i]}
        </span>
      </div>
    );
  });
  return (
    <InView
      as="section"
      data-msg={workCopy.msg.list}
      className="relative bg-grey-150 pt-[130px] pb-[140px]"
    >
      <FilterGroup>
        <div className="wrap">
          <div className="grid items-end gap-6 desk:grid-cols-12">
            <Reveal
              as="h2"
              id="work-list"
              className="type-h2 m-0 text-[clamp(44px,5.4vw,80px)] desk:col-span-7"
            >
              {workCopy.listHeading}
            </Reveal>
            <Reveal step={2} className="desk:col-span-5 desk:col-start-8">
              <FilterChips
                labelledBy="work-list"
                className="desk:justify-end"
                on={{ bg: INK, fg: PANEL }}
                off={{ bg: PANEL, fg: INK }}
                options={[
                  {
                    id: 'all',
                    label: workCopy.filters.all,
                    count: String(ROWS.length).padStart(2, '0'),
                  },
                  { id: 'projects', label: workCopy.filters.projects, count: count('projects') },
                  { id: 'ventures', label: workCopy.filters.ventures, count: count('ventures') },
                ]}
              />
            </Reveal>
          </div>
          <HoverPreviewList
            previews={previews}
            previewClassName="work-preview"
            className="mt-14 flex flex-col gap-1.5"
          >
            {ROWS.map((r, i) => {
              const n = ROW_N[i] ?? 1;
              return (
                <FilterItem key={n} group={r.group}>
                  <Link href={r.href} className="irow" data-preview={i}>
                    <span className="type-label text-grey-600">0{n}</span>
                    <span className="irow-t type-h3 text-[clamp(28px,3vw,44px)]">
                      {copy[`work.rows.${n}.title`]}
                    </span>
                    <span className="irow-hm font-text text-base text-grey-700">
                      {copy[`work.rows.${n}.kicker`]}
                    </span>
                    <span className="irow-hm font-text text-base text-grey-700">
                      {copy[`work.rows.${n}.line`]}
                    </span>
                    <span className="irow-hm type-label text-grey-600">{workCopy.years[i]}</span>
                    <span className="irow-a" aria-hidden="true">
                      ↗
                    </span>
                  </Link>
                </FilterItem>
              );
            })}
          </HoverPreviewList>
        </div>
      </FilterGroup>
    </InView>
  );
}
