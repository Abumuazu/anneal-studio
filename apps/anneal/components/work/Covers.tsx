import { InView, Parallax, Reveal, Zoom } from '@studio/kit/motion';
import { CoverLink } from '@studio/kit/transitions';
import { type CSSProperties, type ReactNode } from 'react';

import { ExchangePortfolio } from '@/components/mockups/ExchangePortfolio';
import { ExchangeSwap } from '@/components/mockups/ExchangeSwap';
import { JewelleryOffer } from '@/components/mockups/JewelleryOffer';
import { JewelleryProduct } from '@/components/mockups/JewelleryProduct';
import { JewellerySprite } from '@/components/mockups/JewellerySprite';
import { WispCapture } from '@/components/mockups/WispCapture';
import { WispMinutes } from '@/components/mockups/WispMinutes';
import { WispOnboarding } from '@/components/mockups/WispOnboarding';
import { phone } from '@/components/mockups/frames';
import { caseHref, requireCase } from '@/content/cases';
import { boardCopy } from '@/content/copy';
import { workCopy } from '@/content/pages';

interface CoverProps {
  slug: string;
  background: string;
  /** Frame height on wide screens, and the artwork canvas width scaled to fit small ones. */
  height: number;
  canvas: number;
  fit: { sm: number; md: number };
  artClassName?: string;
  className?: string;
  step?: 0 | 2;
  children: ReactNode;
}

/** A case cover: a colour frame of product shots, the kicker and the name. It grows into the case. */
function Cover({
  slug,
  background,
  height,
  canvas,
  fit,
  artClassName,
  className,
  step = 0,
  children,
}: CoverProps) {
  const entry = requireCase(slug);
  const frame = {
    background,
    '--cover-h': `${height}px`,
    '--cover-w': `${canvas}px`,
    '--cover-fit-sm': fit.sm,
    '--cover-fit-md': fit.md,
  } as CSSProperties;
  return (
    <Reveal step={step} className={className}>
      <CoverLink href={caseHref(slug)} className="cover" data-cursor={boardCopy.viewCase}>
        <div className="cover-frame" data-cover-frame="" style={frame}>
          <div className="cover-fit" aria-hidden="true">
            <Zoom className={`cover-art ${artClassName ?? ''}`}>{children}</Zoom>
          </div>
        </div>
        <div className="mt-[22px] flex items-center justify-between gap-5">
          <div>
            <div className="type-label text-grey-600">
              0{entry.n} · {entry.kicker}
            </div>
            <div className="type-h3 mt-2.5 text-[clamp(28px,2.4vw,34px)]">{entry.title}</div>
          </div>
          <span className="cover-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
      </CoverLink>
    </Reveal>
  );
}

/** "Three products we can show.": Wisp full width, then the exchange and the marketplace. */
export function Covers() {
  return (
    <InView as="section" data-msg={workCopy.msg.covers} className="relative pb-[140px]">
      <JewellerySprite />
      <div className="wrap grid items-start gap-7 desk:grid-cols-2">
        <Cover
          slug="wisp"
          background="#00ff5a"
          height={760}
          canvas={1100}
          fit={{ sm: 0.32, md: 0.62 }}
          artClassName="flex items-center justify-center gap-12"
          className="desk:col-span-2"
        >
          <Parallax distance={120} className="mt-[140px]">
            <WispCapture size={phone(246, 510, 42, 0.58)} />
          </Parallax>
          <Parallax distance={-30} className="-mt-10">
            <WispOnboarding size={phone(277, 577, 47, 0.66)} />
          </Parallax>
          <Parallax distance={160} className="mt-[180px]">
            <WispMinutes size={phone(246, 510, 42, 0.58)} />
          </Parallax>
        </Cover>
        <Cover
          slug="naira-crypto-exchange"
          background="var(--color-ink)"
          height={720}
          canvas={666}
          fit={{ sm: 0.52, md: 1 }}
        >
          <div className="absolute top-14 left-[6%]">
            <ExchangePortfolio size={phone(254, 526, 44, 0.6)} />
          </div>
          <Parallax distance={160} className="absolute top-[150px] left-1/2">
            <ExchangeSwap size={phone(254, 526, 44, 0.6)} />
          </Parallax>
        </Cover>
        <Cover
          slug="jewellery-marketplace"
          background="#efe6da"
          height={720}
          canvas={666}
          fit={{ sm: 0.52, md: 1 }}
          className="desk:mt-[180px]"
          step={2}
        >
          <div className="absolute top-[60px] left-7">
            <JewelleryProduct size={{ width: 504, height: 319, radius: 13, scale: 0.42 }} />
          </div>
          <Parallax distance={180} className="absolute top-[230px] right-7">
            <JewelleryOffer size={phone(223, 459, 39, 0.52)} />
          </Parallax>
        </Cover>
      </div>
    </InView>
  );
}
