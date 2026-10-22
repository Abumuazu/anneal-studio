'use client';

// Markup ported from design/v6/CaseWispV6.dc.html. Product imagery, hidden from assistive tech.
import { useRef } from 'react';

import { caseCopy } from '@/content/pages';

import { useSecondTicks } from './useSecondTicks';
import { recordingTime } from './values';

/** Wisp: the Dynamic Island compact, minimal and expanded, each labelled. */
export function WispIslandStates() {
  const ref = useRef<HTMLDivElement>(null);
  const tk = useSecondTicks(ref);
  const v = { gTime: recordingTime(tk) };
  const states = [
    {
      label: caseCopy.island.compact,
      art: (
        <div
          className="gsf"
          style={{
            width: '236px',
            height: '37px',
            borderRadius: '19px',
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 15px',
            boxSizing: 'border-box',
          }}
        >
          <span className="glv" aria-hidden="true" style={{ height: '15px' }}>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </span>
          <span
            style={{
              fontSize: '15px',
              fontWeight: '600',
              color: '#fff',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {v.gTime}
          </span>
        </div>
      ),
    },
    {
      label: caseCopy.island.minimal,
      art: (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          <span
            style={{ width: '126px', height: '37px', borderRadius: '19px', background: '#000' }}
          ></span>
          <span
            style={{
              width: '37px',
              height: '37px',
              borderRadius: '50%',
              background: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span className="glv" aria-hidden="true" style={{ height: '13px' }}>
              <i></i>
              <i></i>
              <i></i>
            </span>
          </span>
        </div>
      ),
    },
    {
      label: caseCopy.island.expanded,
      art: (
        <>
          <div className="gsf" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '380px' }}>
              <div
                style={{
                  boxSizing: 'border-box',
                  padding: '20px 20px 20px 22px',
                  borderRadius: '40px',
                  background: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    flex: '1',
                    minWidth: '0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '7px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      aria-hidden="true"
                      style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: '2px',
                        height: '11px',
                        flexShrink: '0',
                        opacity: '.72',
                      }}
                    >
                      <span
                        style={{
                          width: '2.5px',
                          height: '6px',
                          borderRadius: '1px',
                          background: '#fff',
                        }}
                      ></span>
                      <span
                        style={{
                          width: '2.5px',
                          height: '11px',
                          borderRadius: '1px',
                          background: '#fff',
                        }}
                      ></span>
                      <span
                        style={{
                          width: '2.5px',
                          height: '8px',
                          borderRadius: '1px',
                          background: '#fff',
                        }}
                      ></span>
                    </span>
                    <span
                      style={{
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#fff',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      Quarterly Strategy Review
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="glv" aria-hidden="true" style={{ height: '20px' }}>
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                    </span>
                    <span
                      style={{
                        fontSize: '34px',
                        fontWeight: '600',
                        color: '#fff',
                        letterSpacing: '-.03em',
                        lineHeight: '1',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {v.gTime}
                    </span>
                  </div>
                </div>
                <span
                  style={{
                    width: '46px',
                    height: '46px',
                    flexShrink: '0',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,.16)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <rect x="6.5" y="5" width="4" height="14" rx="1.5"></rect>
                    <rect x="13.5" y="5" width="4" height="14" rx="1.5"></rect>
                  </svg>
                </span>
                <span
                  style={{
                    width: '46px',
                    height: '46px',
                    flexShrink: '0',
                    borderRadius: '50%',
                    background: '#E5443B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      width: '15px',
                      height: '15px',
                      borderRadius: '4px',
                      background: '#fff',
                    }}
                  ></span>
                </span>
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];
  return (
    <div ref={ref} className="grid grid-cols-[minmax(0,1fr)] gap-10 desk:grid-cols-3 desk:gap-6">
      {states.map((s) => (
        <div key={s.label} className="flex flex-col items-center gap-6">
          <div className="flex min-h-[112px] w-full items-center justify-center max-desk:[zoom:0.8]">
            {s.art}
          </div>
          <div className="type-label text-center" style={{ color: '#00ff5a' }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
