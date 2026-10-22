'use client';

// Markup ported from design/v6/HomeV6.dc.html. Product imagery, hidden from assistive tech.
import { PhoneFrame } from '@studio/kit/ui';
import { useRef } from 'react';

import { useSecondTicks } from './useSecondTicks';
import { recordingTime } from './values';
import { type PhoneSize, phone } from './frames';

/** Size on Home (HomeV6). */
const HOME = phone(254, 526, 44, 0.6);

/** Wisp: the lock screen Live Activity, with a running timer. */
export function WispLockScreen({ size = HOME }: { size?: PhoneSize }) {
  const ref = useRef<HTMLDivElement>(null);
  const tk = useSecondTicks(ref);
  const v = { gTime: recordingTime(tk) };
  return (
    <div ref={ref}>
      <PhoneFrame {...size}>
        <div
          style={{
            position: 'absolute',
            inset: '0',
            background: 'linear-gradient(180deg,#5B6670 0%,#3E4A44 100%)',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '132px',
              top: '11px',
              width: '126px',
              height: '37px',
              borderRadius: '19px',
              background: '#000',
              zIndex: '20',
            }}
          ></span>
          <div
            style={{
              position: 'absolute',
              top: '70px',
              left: '0',
              right: '0',
              textAlign: 'center',
              color: '#fff',
            }}
          >
            <div style={{ fontSize: '19px', fontWeight: '600', opacity: '.88' }}>
              Tuesday 29 September
            </div>
            <div
              style={{
                fontSize: '98px',
                fontWeight: '600',
                letterSpacing: '-.035em',
                lineHeight: '1',
                marginTop: '4px',
              }}
            >
              10:24
            </div>
          </div>
          <div style={{ position: 'absolute', left: '12px', right: '12px', bottom: '122px' }}>
            <div
              style={{
                boxSizing: 'border-box',
                padding: '16px 16px 16px 18px',
                borderRadius: '26px',
                background: 'rgba(12,19,15,.9)',
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
                  <rect x="6.5" y="5" width="4" height="14" rx="1.5" />
                  <rect x="13.5" y="5" width="4" height="14" rx="1.5" />
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
                  style={{ width: '15px', height: '15px', borderRadius: '4px', background: '#fff' }}
                ></span>
              </span>
            </div>
          </div>
          <span
            style={{
              position: 'absolute',
              left: '46px',
              bottom: '48px',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,.16)',
            }}
          ></span>
          <span
            style={{
              position: 'absolute',
              right: '46px',
              bottom: '48px',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,.16)',
            }}
          ></span>
          <span
            style={{
              position: 'absolute',
              left: '128px',
              bottom: '8px',
              width: '134px',
              height: '5px',
              borderRadius: '3px',
              background: 'rgba(255,255,255,.85)',
            }}
          ></span>
        </div>
      </PhoneFrame>
    </div>
  );
}
