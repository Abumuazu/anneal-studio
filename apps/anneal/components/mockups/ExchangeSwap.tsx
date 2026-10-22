'use client';

// Markup ported from design/v6/HomeV6.dc.html. Product imagery, hidden from assistive tech.
import { PhoneFrame } from '@studio/kit/ui';
import { useRef } from 'react';

import { useSecondTicks } from './useSecondTicks';
import { exchangeValues, rateHold } from './values';
import { type PhoneSize, phone } from './frames';

/** Size on Home (HomeV6). */
const HOME = phone(262, 543, 45, 0.62);

/** Exchange: USDT to BTC swap with the rate-hold countdown. */
export function ExchangeSwap({ size = HOME }: { size?: PhoneSize }) {
  const ref = useRef<HTMLDivElement>(null);
  const tk = useSecondTicks(ref);
  const v = { ...exchangeValues(tk), ...rateHold(tk) };
  return (
    <div ref={ref}>
      <PhoneFrame {...size}>
        <div
          className="fxf"
          style={{
            position: 'absolute',
            inset: '0',
            background: '#0B0A09',
            color: '#fff',
            padding: '60px 18px 24px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#1C1916',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                color: '#CFC8BE',
              }}
            >
              ‹
            </span>
            <span style={{ fontSize: '17px', fontWeight: '600' }}>Swap</span>
            <span style={{ width: '36px' }}></span>
          </div>
          <div
            style={{
              position: 'relative',
              marginTop: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div
              style={{
                background: '#141210',
                border: '1px solid #221E19',
                borderRadius: '20px',
                padding: '16px 18px',
              }}
            >
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span
                  style={{
                    fontSize: '12.5px',
                    fontWeight: '600',
                    letterSpacing: '.06em',
                    color: '#8E8A83',
                  }}
                >
                  FROM
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 10px',
                    borderRadius: '999px',
                    background: '#1F1C18',
                    fontSize: '12.5px',
                    color: '#CFC8BE',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#EB0029',
                    }}
                  ></span>
                  Tron ⌄
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '14px',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '9px',
                    fontSize: '22px',
                    fontWeight: '700',
                  }}
                >
                  <span
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: '#26A17B',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: '700',
                      fontSize: '16px',
                      flex: 'none',
                    }}
                  >
                    ₮
                  </span>
                  USDT
                  <span style={{ fontSize: '14px', color: '#8E8A83' }}>⌄</span>
                </span>
                <span
                  className="fxnum"
                  style={{ fontSize: '30px', fontWeight: '700', letterSpacing: '-.03em' }}
                >
                  250.00
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <span
                  style={{
                    padding: '3px 9px',
                    borderRadius: '7px',
                    background: '#1F1C18',
                    fontSize: '12px',
                    color: '#CFC8BE',
                  }}
                >
                  Max
                </span>
                <span className="fxnum" style={{ fontSize: '13px', color: '#8E8A83' }}>
                  Balance 1,204.50
                </span>
              </div>
            </div>
            <span
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%,-50%)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#FFA826',
                color: '#1A1206',
                border: '5px solid #0B0A09',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '17px',
                fontWeight: '700',
              }}
            >
              ⇅
            </span>
            <div
              style={{
                background: '#141210',
                border: '1px solid #221E19',
                borderRadius: '20px',
                padding: '16px 18px',
              }}
            >
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span
                  style={{
                    fontSize: '12.5px',
                    fontWeight: '600',
                    letterSpacing: '.06em',
                    color: '#8E8A83',
                  }}
                >
                  TO
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 10px',
                    borderRadius: '999px',
                    background: '#1F1C18',
                    fontSize: '12.5px',
                    color: '#CFC8BE',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#F7931A',
                    }}
                  ></span>
                  Bitcoin ⌄
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '14px',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '9px',
                    fontSize: '22px',
                    fontWeight: '700',
                  }}
                >
                  <span
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: '#F7931A',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: '700',
                      fontSize: '16px',
                      flex: 'none',
                    }}
                  >
                    ₿
                  </span>
                  BTC
                  <span style={{ fontSize: '14px', color: '#8E8A83' }}>⌄</span>
                </span>
                <span
                  className="fxnum"
                  style={{ fontSize: '30px', fontWeight: '700', letterSpacing: '-.03em' }}
                >
                  {v.sxGet}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <span
                  style={{
                    padding: '3px 9px',
                    borderRadius: '7px',
                    background: '#1F1C18',
                    fontSize: '12px',
                    color: '#CFC8BE',
                  }}
                >
                  Max
                </span>
                <span className="fxnum" style={{ fontSize: '13px', color: '#8E8A83' }}>
                  ≈ {v.sxNgn}
                </span>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: '10px',
              background: '#141210',
              border: '1px solid #221E19',
              borderRadius: '18px',
              padding: '14px 16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px' }}>
              <span style={{ color: '#8E8A83' }}>Exchange fee</span>
              <span
                style={{
                  padding: '2px 8px',
                  borderRadius: '7px',
                  background: 'rgba(47,208,122,.14)',
                  color: '#2FD07A',
                  fontWeight: '600',
                }}
              >
                0.5%
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '13.5px',
                marginTop: '10px',
              }}
            >
              <span style={{ color: '#8E8A83' }}>Rate</span>
              <span className="fxnum">1 BTC ≈ {v.sxRate} USDT</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '13.5px',
                marginTop: '10px',
              }}
            >
              <span style={{ color: '#8E8A83' }}>Rate held for</span>
              <span className="fxnum" style={{ color: '#FFA826', fontWeight: '600' }}>
                0:{v.lockS}
              </span>
            </div>
            <div
              style={{
                height: '3px',
                borderRadius: '3px',
                background: '#221E19',
                marginTop: '10px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: v.lockW,
                  background: '#FFA826',
                  transition: 'width 1000ms linear',
                }}
              ></div>
            </div>
          </div>
          <span
            style={{
              marginTop: '12px',
              textAlign: 'center',
              padding: '16px 0',
              borderRadius: '999px',
              background: '#FFA826',
              color: '#1A1206',
              fontSize: '16.5px',
              fontWeight: '700',
            }}
          >
            Swap now
          </span>
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', margin: '8px -4px 0' }}
          >
            <span className="fxk">1</span>
            <span className="fxk">2</span>
            <span className="fxk">3</span>
            <span className="fxk">4</span>
            <span className="fxk">5</span>
            <span className="fxk">6</span>
            <span className="fxk">7</span>
            <span className="fxk">8</span>
            <span className="fxk">9</span>
            <span className="fxk">·</span>
            <span className="fxk">0</span>
            <span className="fxk">⌫</span>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}
