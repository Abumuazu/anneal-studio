'use client';

// Markup ported from design/v6/CaseJewelleryV6.dc.html. Product imagery, hidden from assistive tech.
import { PhoneFrame } from '@studio/kit/ui';
import { useRef } from 'react';

import { type PhoneSize } from './frames';
import { useSecondTicks } from './useSecondTicks';
import { replyCountdown } from './values';

/** Jewellery marketplace: the seller's offers inbox. */
export function JewelleryInbox({ size }: { size: PhoneSize }) {
  const ref = useRef<HTMLDivElement>(null);
  const tk = useSecondTicks(ref);
  const v = { jwLeft: replyCountdown(tk) };
  return (
    <div ref={ref}>
      <PhoneFrame {...size}>
        <>
          <div
            className="jwf"
            style={{
              position: 'absolute',
              inset: '0',
              background: '#F9F5EE',
              padding: '62px 18px 30px',
              boxSizing: 'border-box',
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
            <div className="jws" style={{ fontSize: '34px', fontWeight: '600' }}>
              Offers
            </div>
            <div style={{ fontSize: '13.5px', color: '#7A6F62', margin: '4px 0 18px' }}>
              3 waiting · cards already held
            </div>
            <div
              style={{
                padding: '14px',
                borderRadius: '18px',
                background: '#FFFFFF',
                marginBottom: '10px',
                boxShadow: '0 10px 28px rgba(60,40,15,.12)',
              }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '58px', flex: 'none' }}>
                  <div className="jwimg" style={{ height: '58px', borderRadius: '10px' }}>
                    <svg
                      viewBox="0 0 200 200"
                      style={{ width: '46px', height: '46px' }}
                      aria-hidden="true"
                    >
                      <use href="#jw-ring"></use>
                    </svg>
                  </div>
                </div>
                <div style={{ flex: '1' }}>
                  <div style={{ fontSize: '15px', fontWeight: '600' }}>Solitaire ring</div>
                  <div style={{ fontSize: '12.5px', color: '#7A6F62', marginTop: '3px' }}>
                    From Kemi O. · {v.jwLeft} left
                  </div>
                </div>
                <div style={{ fontSize: '17px', fontWeight: '700' }}>₦420,000</div>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '6px',
                  marginTop: '12px',
                }}
              >
                <span
                  style={{
                    textAlign: 'center',
                    padding: '10px 0',
                    borderRadius: '999px',
                    background: '#1B1712',
                    color: '#FFFDF9',
                    fontSize: '13px',
                    fontWeight: '600',
                  }}
                >
                  Accept
                </span>
                <span
                  style={{
                    textAlign: 'center',
                    padding: '10px 0',
                    borderRadius: '999px',
                    background: '#F1ECE4',
                    fontSize: '13px',
                    fontWeight: '600',
                  }}
                >
                  Counter
                </span>
                <span
                  style={{
                    textAlign: 'center',
                    padding: '10px 0',
                    borderRadius: '999px',
                    background: '#F1ECE4',
                    fontSize: '13px',
                    fontWeight: '600',
                  }}
                >
                  Decline
                </span>
              </div>
            </div>
            <div
              style={{
                padding: '14px',
                borderRadius: '18px',
                background: '#F6F1E9',
                marginBottom: '10px',
              }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '58px', flex: 'none' }}>
                  <div className="jwimg" style={{ height: '58px', borderRadius: '10px' }}>
                    <svg
                      viewBox="0 0 200 200"
                      style={{ width: '46px', height: '46px' }}
                      aria-hidden="true"
                    >
                      <use href="#jw-ear"></use>
                    </svg>
                  </div>
                </div>
                <div style={{ flex: '1' }}>
                  <div style={{ fontSize: '15px', fontWeight: '600' }}>Pearl drop earrings</div>
                  <div style={{ fontSize: '12.5px', color: '#7A6F62', marginTop: '3px' }}>
                    You countered at ₦195,000
                  </div>
                </div>
                <div style={{ fontSize: '17px', fontWeight: '700' }}>₦180,000</div>
              </div>
            </div>
            <div
              style={{
                padding: '14px',
                borderRadius: '18px',
                background: '#F6F1E9',
                marginBottom: '10px',
              }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '58px', flex: 'none' }}>
                  <div className="jwimg" style={{ height: '58px', borderRadius: '10px' }}>
                    <svg
                      viewBox="0 0 200 200"
                      style={{ width: '46px', height: '46px' }}
                      aria-hidden="true"
                    >
                      <use href="#jw-neck"></use>
                    </svg>
                  </div>
                </div>
                <div style={{ flex: '1' }}>
                  <div style={{ fontSize: '15px', fontWeight: '600' }}>Teardrop pendant</div>
                  <div style={{ fontSize: '12.5px', color: '#7A6F62', marginTop: '3px' }}>
                    Expired · hold released
                  </div>
                </div>
                <div style={{ fontSize: '17px', fontWeight: '700' }}>₦96,000</div>
              </div>
            </div>
            <div
              style={{
                padding: '14px',
                borderRadius: '18px',
                background: '#F6F1E9',
                marginBottom: '10px',
              }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '58px', flex: 'none' }}>
                  <div className="jwimg" style={{ height: '58px', borderRadius: '10px' }}>
                    <svg
                      viewBox="0 0 200 200"
                      style={{ width: '46px', height: '46px' }}
                      aria-hidden="true"
                    >
                      <use href="#jw-brace"></use>
                    </svg>
                  </div>
                </div>
                <div style={{ flex: '1' }}>
                  <div style={{ fontSize: '15px', fontWeight: '600' }}>Silver bangle</div>
                  <div style={{ fontSize: '12.5px', color: '#7A6F62', marginTop: '3px' }}>
                    Accepted · paid
                  </div>
                </div>
                <div style={{ fontSize: '17px', fontWeight: '700' }}>₦64,000</div>
              </div>
            </div>
          </div>
        </>
      </PhoneFrame>
    </div>
  );
}
