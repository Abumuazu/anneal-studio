import { FlexTile, FlexTiles, Parallax } from '@studio/kit/motion';
import { ArrowLink, Tag } from '@studio/kit/ui';
import Image from 'next/image';
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
  name,
  nameSize,
  line,
  extra,
}: {
  kicker: string;
  tag: string;
  tagColor: string;
  tagBg?: string;
  name: ReactNode;
  nameSize: string;
  line: string | undefined;
  extra?: ReactNode;
}) {
  return (
    <>
      <div className="absolute top-[30px] right-8 left-8 flex items-start justify-between gap-4">
        <span className="type-label">{kicker}</span>
        <Tag bg={tagBg} color={tagColor}>
          {tag}
        </Tag>
      </div>
      <h3
        className={`type-display-wide absolute inset-x-0 top-1/2 m-0 -translate-y-1/2 text-center ${nameSize}`}
      >
        {name}
      </h3>
      <div className="absolute right-8 bottom-8 left-8">
        <p className="type-body m-0 max-w-[340px] text-[17px]">{line}</p>
        {extra}
      </div>
    </>
  );
}

/** The ventures row (Home, Products, Studio): the hovered or focused tile widens. */
export function VentureTiles({ tiles, lines, variant, className }: VentureTilesProps) {
  const home = variant === 'home';
  const nameSize = home ? 'text-[clamp(40px,4.6vw,72px)]' : 'text-[clamp(36px,4vw,62px)]';
  const body: Record<VentureKey, { bg: string; fg: string; node: ReactNode }> = {
    raum: {
      bg: '#0000ff',
      fg: '#ffffff',
      node: (
        <>
          <div className="absolute top-[30px] right-8 left-8 flex items-start justify-between gap-4">
            <Image
              src="/images/raum-logo.svg"
              alt={v.raum.logoAlt}
              width={126}
              height={34}
              className={home ? 'h-[34px] w-auto' : 'h-[30px] w-auto'}
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
          <div className="absolute right-8 bottom-8 left-8">
            <h3 className={`type-display-wide m-0 ${home ? 'text-[54px]' : 'text-[46px]'}`}>
              {v.raum.name}
            </h3>
            <p className="type-body mt-3.5 mb-0 max-w-[340px] text-[17px]">{lines.raum}</p>
          </div>
        </>
      ),
    },
    centiiv: {
      bg: '#161616',
      fg: '#ffffff',
      node: (
        <Centred
          kicker={v.centiiv.kicker}
          tag={v.centiiv.tag}
          tagColor="#ffffff"
          name={v.centiiv.name}
          nameSize={nameSize}
          line={lines.centiiv}
        />
      ),
    },
    clekey: {
      bg: '#f4f4f4',
      fg: 'var(--color-ink)',
      node: (
        <Centred
          kicker={v.clekey.kicker}
          tag={v.clekey.tag}
          tagColor="var(--color-ink)"
          name={v.clekey.name}
          nameSize={nameSize}
          line={lines.clekey}
        />
      ),
    },
    tools: {
      bg: 'var(--color-accent)',
      fg: 'var(--color-on-accent)',
      node: (
        <Centred
          kicker={v.tools.kicker}
          tag={v.tools.tag}
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
          line={lines.tools}
          extra={
            home ? (
              <ArrowLink href="/products" className="mt-3.5">
                {boardCopy.seeProducts}
              </ArrowLink>
            ) : undefined
          }
        />
      ),
    },
  };

  return (
    <FlexTiles className={`flex flex-col gap-4 desk:h-[600px] desk:flex-row ${className ?? ''}`}>
      {tiles.map((key, i) => {
        const t = body[key];
        const tile = (
          <FlexTile
            index={i}
            className="relative h-[460px] w-full overflow-hidden rounded-[28px] desk:h-full"
            style={{ background: t.bg, color: t.fg }}
          >
            {t.node}
          </FlexTile>
        );
        return home ? (
          <Parallax
            key={key}
            mode="enter"
            distance={90 + i * 90}
            fromOpacity={0.2}
            className="flex-tile flex desk:h-full"
          >
            {tile}
          </Parallax>
        ) : (
          <div key={key} className="flex-tile flex desk:h-full">
            {tile}
          </div>
        );
      })}
    </FlexTiles>
  );
}
