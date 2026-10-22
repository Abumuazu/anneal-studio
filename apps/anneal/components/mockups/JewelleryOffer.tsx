'use client';

// Markup ported from design/v6/HomeV6.dc.html. Product imagery, hidden from assistive tech.
import { PhoneFrame } from '@studio/kit/ui';
import { useRef } from 'react';

import { useSecondTicks } from './useSecondTicks';
import { replyCountdown } from './values';
import { type PhoneSize, phone } from './frames';

/** Size on Home (HomeV6). */
const HOME = phone(238, 493, 41, 0.56);

/** Jewellery marketplace: 'Make an offer' with the reply countdown. */
export function JewelleryOffer({ size = HOME }: { size?: PhoneSize }) {
  const ref = useRef<HTMLDivElement>(null);
  const tk = useSecondTicks(ref);
  const v = { jwLeft: replyCountdown(tk) };
  return (
    <div ref={ref}>
      <PhoneFrame {...size}>
        <div
          className="jwf"
          style={{
            position: 'absolute',
            inset: '0',
            background: '#FFFDF9',
            padding: '62px 20px 30px',
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
            <span style={{ fontSize: '22px', color: '#7A6F62' }}>×</span>
            <span style={{ fontSize: '17px', fontWeight: '600' }}>Make an offer</span>
            <span style={{ width: '16px' }}></span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginTop: '22px',
              padding: '12px',
              borderRadius: '18px',
              background: '#F6F1E9',
            }}
          >
            <div style={{ width: '76px', flex: 'none' }}>
              <div className="jwimg" style={{ height: '76px', borderRadius: '12px' }}>
                <svg
                  viewBox="0 0 200 200"
                  style={{ width: '62px', height: '62px' }}
                  aria-hidden="true"
                >
                  <use href="#jw-ring" />
                </svg>
              </div>
            </div>
            <div>
              <div
                className="jws"
                style={{ fontSize: '21px', fontWeight: '600', lineHeight: '1.05' }}
              >
                Solitaire ring, 18k gold
              </div>
              <div style={{ fontSize: '13px', color: '#7A6F62', marginTop: '4px' }}>
                Listed at ₦520,000
              </div>
            </div>
          </div>
          <div
            style={{ textAlign: 'center', marginTop: '30px', fontSize: '13px', color: '#7A6F62' }}
          >
            Your offer
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '18px',
              marginTop: '8px',
            }}
          >
            <span
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#F1ECE4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
              }}
            >
              −
            </span>
            <span style={{ fontSize: '46px', fontWeight: '700', letterSpacing: '-.03em' }}>
              ₦420,000
            </span>
            <span
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#F1ECE4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
              }}
            >
              +
            </span>
          </div>
          <div
            style={{ textAlign: 'center', fontSize: '13px', color: '#2E7D3A', marginTop: '6px' }}
          >
            19% below list price
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '22px' }}>
            <span
              style={{
                flex: '1',
                textAlign: 'center',
                padding: '10px 0',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                background: '#F4EFE7',
              }}
            >
              ₦400,000
            </span>
            <span
              style={{
                flex: '1',
                textAlign: 'center',
                padding: '10px 0',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                background: '#1B1712',
                color: '#FFFDF9',
              }}
            >
              ₦420,000
            </span>
            <span
              style={{
                flex: '1',
                textAlign: 'center',
                padding: '10px 0',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                background: '#F4EFE7',
              }}
            >
              ₦460,000
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '22px',
              padding: '14px 16px',
              borderRadius: '16px',
              border: '1px solid #EEE6DA',
            }}
          >
            <span
              style={{
                width: '42px',
                height: '28px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg,#1A1F71,#3A47C9)',
                color: '#fff',
                fontSize: '10px',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              VISA
            </span>
            <div style={{ flex: '1' }}>
              <div style={{ fontSize: '14.5px', fontWeight: '600' }}>Visa ending 4821</div>
              <div style={{ fontSize: '12.5px', color: '#7A6F62' }}>
                Held now, charged only on yes
              </div>
            </div>
            <span
              style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#2E7D3A',
                background: '#E9F4EA',
                padding: '5px 9px',
                borderRadius: '999px',
              }}
            >
              Hold
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '14px',
              fontSize: '13.5px',
              color: '#5A5045',
            }}
          >
            <span>Seller replies within</span>
            <span style={{ fontWeight: '600', fontVariantNumeric: 'tabular-nums' }}>
              {v.jwLeft}
            </span>
          </div>
          <span
            style={{
              marginTop: 'auto',
              textAlign: 'center',
              padding: '17px 0',
              borderRadius: '999px',
              background: '#1B1712',
              color: '#FFFDF9',
              fontSize: '16.5px',
              fontWeight: '600',
            }}
          >
            Send offer · ₦420,000
          </span>
        </div>
      </PhoneFrame>
    </div>
  );
}
