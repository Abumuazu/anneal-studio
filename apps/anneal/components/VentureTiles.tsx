import { FlexTile, FlexTiles, Parallax } from '@studio/kit/motion';
import { ArrowLink, Tag } from '@studio/kit/ui';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactNode } from 'react';

import { boardCopy } from '@/content/copy';

const v = boardCopy.ventures;

export type VentureKey = 'raum' | 'centiiv' | 'clekey' | 'tools';

interface VentureTilesProps {
  tiles: readonly VentureKey[];
  /** One line under each venture (deck copy differs between pages). */
  lines: Partial<Record<VentureKey, string>>;
  /** Home: bigger names, a link on the tools tile, tiles rise in on scroll. */
  variant: 'home' | 'page';
  className?: string;
}

function Centred({
  kicker,
  tag,
  tagColor,
  tagBg = 'rgb(127 127 127 / 0.18)',
  shortTag,
  showKickerOnPhones,
  name,
  nameSize,
  phoneName,
  phoneNameSize,
  line,
  extra,
  phoneExtra,
}: {
  kicker: string;
  tag: string;
  tagColor: string;
  tagBg?: string;
  /** Phones have less room: a shorter tag where the full one would wrap. */
  shortTag?: string;
  showKickerOnPhones?: boolean;
  name: ReactNode;
  nameSize: string;
  /** Phones set the name at the bottom left, in one line (HomeMobileV6). */
  phoneName: string;
  phoneNameSize: string;
  line: string | undefined;
  extra?: ReactNode;
  phoneExtra?: ReactNode;
}) {
  return (
    <>
      <div className="absolute top-[18px] right-[18px] left-[18px] flex items-start justify-between gap-4 desk:top-[30px] desk:right-8 desk:left-8">
        <span className={`type-label ${showKickerOnPhones ? '' : 'max-desk:hidden'}`}>
          {kicker}
        </span>
        <Tag bg={tagBg} color={tagColor}>
          {shortTag ? (
            <>
              <span className="max-desk:hidden">{tag}</span>
              <span className="desk:hidden">{shortTag}</span>
            </>
          ) : (
            tag
          )}
        </Tag>
      </div>
      <h3
        className={`type-display-wide absolute inset-x-0 top-1/2 m-0 -translate-y-1/2 text-center max-desk:hidden ${nameSize}`}
      >
        {name}
      </h3>
      <div className="absolute right-[18px] bottom-[18px] left-[18px] desk:right-8 desk:bottom-8 desk:left-8">
        <h3 className={`type-display-wide m-0 desk:hidden ${phoneNameSize}`}>{phoneName}</h3>
        <p className="type-body m-0 max-w-[340px] text-[17px] max-desk:mt-1.5 max-desk:text-[13px] max-desk:leading-[1.4]">
          {line}
        </p>
        <span className="max-desk:hidden">{extra}</span>
      </div>
      {phoneExtra}
    </>
  );
}

/** The ventures row (Home, Products, Studio): the hovered or focused tile widens. */
export function VentureTiles({ tiles, lines, variant, className }: VentureTilesProps) {
  const home = variant === 'home';
  const nameSize = home ? 'text-[clamp(40px,4.6vw,72px)]' : 'text-[clamp(36px,4vw,62px)]';
  const body: Record<VentureKey, { bg: string; fg: string; phone: string; node: ReactNode }> = {
    raum: {
      phone: 'h-[232px]',
      bg: '#0000ff',
      fg: '#ffffff',
      node: (
        <>
          <div className="absolute top-[22px] right-[22px] left-[22px] flex items-start justify-between gap-4 desk:top-[30px] desk:right-8 desk:left-8">
            <Image
              src="/images/raum-logo.svg"
              alt={v.raum.logoAlt}
              width={126}
              height={34}
              className={`w-auto max-desk:h-[26px] ${home ? 'h-[34px]' : 'h-[30px]'}`}
            />
            <Tag bg="rgb(255 255 255 / 0.16)" color="#ffffff">
              {v.raum.tag}
            </Tag>
          </div>
          <Parallax
            distance={80}
            rotate={-6}
            className={`ven-shot hidden desk:block ${home ? 'top-[110px] right-[230px]' : 'top-[90px] right-[200px]'}`}
          >
            <Image
              src="/images/raum-screen-1.png"
              alt={v.raum.screenAlt}
              width={778}
              height={1556}
              sizes="190px"
              className="block h-auto w-full"
            />
          </Parallax>
          <Parallax
            distance={150}
            rotate={5}
            className={`ven-shot hidden desk:block ${home ? 'top-[150px] right-[34px]' : 'top-[120px] right-[30px]'}`}
          >
            <Image
              src="/images/raum-screen-2.png"
              alt={v.raum.screenAlt}
              width={778}
              height={1556}
              sizes="190px"
              className="block h-auto w-full"
            />
          </Parallax>
          {/* Phones: one small screen, tilted, in the corner. */}
          <div className="absolute top-[70px] right-[22px] w-[118px] rotate-6 overflow-hidden rounded-[18px] shadow-[0_18px_40px_rgb(0_0_0/0.28)] desk:hidden">
            <Image
              src="/images/raum-screen-1.png"
              alt={v.raum.screenAlt}
              width={778}
              height={1556}
              sizes="118px"
              className="block h-auto w-full"
            />
          </div>
          <div className="absolute right-[22px] bottom-[22px] left-[22px] desk:right-8 desk:bottom-8 desk:left-8">
            <h3
              className={`type-display-wide m-0 max-desk:text-[34px] ${home ? 'text-[54px]' : 'text-[46px]'}`}
            >
              {v.raum.name}
            </h3>
            <p className="type-body mt-3.5 mb-0 max-w-[340px] text-[17px] max-desk:mt-2 max-desk:max-w-[190px] max-desk:text-[14px] max-desk:leading-[1.4] max-desk:opacity-90">
              {lines.raum}
            </p>
          </div>
        </>
      ),
    },
    centiiv: {
      phone: 'h-[200px]',
      bg: '#161616',
      fg: '#ffffff',
      node: (
        <Centred
          kicker={v.centiiv.kicker}
          tag={v.centiiv.tag}
          shortTag={v.centiiv.shortTag}
          tagColor="#ffffff"
          name={v.centiiv.name}
          nameSize={nameSize}
          phoneName={v.centiiv.name}
          phoneNameSize="text-[20px]"
          line={lines.centiiv}
        />
      ),
    },
    clekey: {
      phone: 'h-[200px]',
      bg: '#f4f4f4',
      fg: 'var(--color-ink)',
      node: (
        <Centred
          kicker={v.clekey.kicker}
          tag={v.clekey.tag}
          shortTag={v.clekey.shortTag}
          tagColor="var(--color-ink)"
          name={v.clekey.name}
          nameSize={nameSize}
          phoneName={v.clekey.name}
          phoneNameSize="text-[20px]"
          line={lines.clekey}
        />
      ),
    },
    tools: {
      phone: 'h-[168px]',
      bg: 'var(--color-accent)',
      fg: 'var(--color-on-accent)',
      node: (
        <Centred
          kicker={v.tools.kicker}
          tag={v.tools.tag}
          showKickerOnPhones
          tagColor="var(--color-on-accent)"
          tagBg="rgb(255 255 255 / 0.24)"
          name={
            <span className="text-[clamp(32px,3.6vw,56px)] leading-[0.98]">
              {v.tools.name[0]}
              <br />
              {v.tools.name[1]}
            </span>
          }
          nameSize={nameSize}
          phoneName={v.tools.name.join(' ')}
          phoneNameSize="text-[26px]"
          line={lines.tools}
          extra={
            home ? (
              <ArrowLink href="/products" className="mt-3.5">
                {boardCopy.seeProducts}
              </ArrowLink>
            ) : undefined
          }
          phoneExtra={
            home ? (
              <Link
                href="/products"
                aria-label={boardCopy.seeProducts}
                className="absolute inset-0 flex items-end justify-end p-[18px] text-[24px] desk:hidden"
              >
                <span aria-hidden="true">→</span>
              </Link>
            ) : undefined
          }
        />
      ),
    },
  };

  return (
    <FlexTiles
      className={`grid grid-cols-2 gap-3 desk:flex desk:h-[600px] desk:flex-row desk:gap-4 ${className ?? ''}`}
    >
      {tiles.map((key, i) => {
        const t = body[key];
        const tile = (
          <FlexTile
            index={i}
            className={`relative w-full overflow-hidden rounded-3xl desk:h-full desk:rounded-[28px] ${t.phone}`}
            style={{ background: t.bg, color: t.fg }}
          >
            {t.node}
          </FlexTile>
        );
        // Phones: Raum and the tools tile span the row; the two between sit side by side.
        const span = key === 'raum' || key === 'tools' ? 'max-desk:col-span-2' : '';
        return home ? (
          <Parallax
            key={key}
            mode="enter"
            distance={90 + i * 90}
            fromOpacity={0.2}
            className={`flex-tile flex desk:h-full ${span}`}
          >
            {tile}
          </Parallax>
        ) : (
          <div key={key} className={`flex-tile flex desk:h-full ${span}`}>
            {tile}
          </div>
        );
      })}
    </FlexTiles>
  );
}
