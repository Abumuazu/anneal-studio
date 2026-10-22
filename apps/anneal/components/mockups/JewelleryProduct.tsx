// Markup ported from design/v6/HomeV6.dc.html. Product imagery, hidden from assistive tech.
import { BrowserFrame } from '@studio/kit/ui';

import { type BrowserSize } from './frames';

/** Size on Home (HomeV6). */
const HOME: BrowserSize = { width: 624, height: 395, radius: 16, scale: 0.52 };

/** Jewellery marketplace: the web product page. */
export function JewelleryProduct({ size = HOME }: { size?: BrowserSize }) {
  return (
    <BrowserFrame
      width={size.width}
      height={size.height}
      radius={size.radius}
      canvasWidth={1200}
      canvasHeight={760}
      scale={size.scale}
      className="jwf"
      style={{
        background: '#FFFDF9',
        ['--browser-shadow' as string]: '0 40px 90px rgba(40,25,5,.2)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          height: '44px',
          padding: '0 18px',
          background: '#F1ECE4',
        }}
      >
        <i
          style={{
            width: '11px',
            height: '11px',
            borderRadius: '50%',
            background: '#E8685C',
            display: 'block',
          }}
        ></i>
        <i
          style={{
            width: '11px',
            height: '11px',
            borderRadius: '50%',
            background: '#E8B54C',
            display: 'block',
          }}
        ></i>
        <i
          style={{
            width: '11px',
            height: '11px',
            borderRadius: '50%',
            background: '#5DBB63',
            display: 'block',
          }}
        ></i>
        <span
          style={{
            marginLeft: '22px',
            flex: '1',
            maxWidth: '520px',
            height: '26px',
            borderRadius: '8px',
            background: '#FFFDF9',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            fontSize: '12.5px',
            color: '#7A6F62',
          }}
        >
          atelier.market/rings/solitaire-18k
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '36px',
          padding: '22px 44px',
          borderBottom: '1px solid #EEE6DA',
        }}
      >
        <span
          className="jws"
          style={{ fontSize: '30px', fontWeight: '600', letterSpacing: '.14em' }}
        >
          ATELIER
        </span>
        <span style={{ display: 'flex', gap: '26px', fontSize: '14.5px', fontWeight: '500' }}>
          <span style={{ color: '#1B1712' }}>Rings</span>
          <span style={{ color: '#7A6F62' }}>Necklaces</span>
          <span style={{ color: '#7A6F62' }}>Earrings</span>
          <span style={{ color: '#7A6F62' }}>Bracelets</span>
          <span style={{ color: '#7A6F62' }}>Sellers</span>
        </span>
        <span
          style={{
            marginLeft: 'auto',
            width: '240px',
            height: '38px',
            borderRadius: '999px',
            background: '#F4EFE7',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            fontSize: '13.5px',
            color: '#9A8F80',
          }}
        >
          Search pieces
        </span>
        <span
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: '#1B1712',
            color: '#FFFDF9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px',
            fontWeight: '600',
          }}
        >
          KO
        </span>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '44px',
          padding: '30px 44px',
        }}
      >
        <div>
          <div className="jwimg" style={{ height: '470px', borderRadius: '18px' }}>
            <svg
              viewBox="0 0 200 200"
              style={{ width: '330px', height: '330px' }}
              aria-hidden="true"
            >
              <use href="#jw-ring" />
            </svg>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
            <div style={{ flex: '1' }}>
              <div className="jwimg" style={{ height: '92px', borderRadius: '10px' }}>
                <svg
                  viewBox="0 0 200 200"
                  style={{ width: '70px', height: '70px' }}
                  aria-hidden="true"
                >
                  <use href="#jw-ring" />
                </svg>
              </div>
            </div>
            <div style={{ flex: '1' }}>
              <div className="jwimg" style={{ height: '92px', borderRadius: '10px' }}>
                <svg
                  viewBox="0 0 200 200"
                  style={{ width: '70px', height: '70px' }}
                  aria-hidden="true"
                >
                  <use href="#jw-ring" />
                </svg>
              </div>
            </div>
            <div style={{ flex: '1' }}>
              <div className="jwimg" style={{ height: '92px', borderRadius: '10px' }}>
                <svg
                  viewBox="0 0 200 200"
                  style={{ width: '70px', height: '70px' }}
                  aria-hidden="true"
                >
                  <use href="#jw-ring" />
                </svg>
              </div>
            </div>
            <div style={{ flex: '1' }}>
              <div className="jwimg" style={{ height: '92px', borderRadius: '10px' }}>
                <svg
                  viewBox="0 0 200 200"
                  style={{ width: '70px', height: '70px' }}
                  aria-hidden="true"
                >
                  <use href="#jw-ring" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '13px', color: '#7A6F62' }}>Rings · Solitaire</div>
          <div
            className="jws"
            style={{ fontSize: '44px', fontWeight: '600', lineHeight: '1.02', marginTop: '10px' }}
          >
            Solitaire ring in 18k yellow gold
          </div>
          <div style={{ fontSize: '15px', color: '#5A5045', marginTop: '12px' }}>
            1.2 ct lab-grown diamond · Sizes 5 to 9
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '20px',
              padding: '12px 14px',
              borderRadius: '14px',
              background: '#F6F1E9',
            }}
          >
            <span
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: '#C9A45A',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '700',
              }}
            >
              AF
            </span>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>Adeola Fine Jewels</div>
              <div style={{ fontSize: '12.5px', color: '#7A6F62' }}>
                Verified seller · Lagos · Ships in 2 days
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginTop: '26px' }}>
            <span style={{ fontSize: '34px', fontWeight: '700', letterSpacing: '-.02em' }}>
              ₦520,000
            </span>
            <span style={{ fontSize: '14px', color: '#7A6F62' }}>or make an offer</span>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginTop: '20px',
            }}
          >
            <span
              style={{
                textAlign: 'center',
                padding: '16px 0',
                borderRadius: '999px',
                background: '#1B1712',
                color: '#FFFDF9',
                fontSize: '15.5px',
                fontWeight: '600',
              }}
            >
              Make an offer
            </span>
            <span
              style={{
                textAlign: 'center',
                padding: '16px 0',
                borderRadius: '999px',
                background: '#F1ECE4',
                fontSize: '15.5px',
                fontWeight: '600',
              }}
            >
              Buy now
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
              marginTop: '16px',
              fontSize: '13.5px',
              color: '#5A5045',
              lineHeight: '1.45',
            }}
          >
            <span
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '6px',
                background: '#E9F4EA',
                color: '#2E7D3A',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                flex: 'none',
              }}
            >
              ✓
            </span>
            Your card is held when you offer. It is only charged if the seller accepts.
          </div>
          <div
            style={{
              marginTop: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: '10px',
              paddingTop: '24px',
              borderTop: '1px solid #EEE6DA',
            }}
          >
            <div>
              <div style={{ fontSize: '12px', color: '#9A8F80' }}>Metal</div>
              <div style={{ fontSize: '14px', fontWeight: '600', marginTop: '4px' }}>18k gold</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#9A8F80' }}>Stone</div>
              <div style={{ fontSize: '14px', fontWeight: '600', marginTop: '4px' }}>
                1.2 ct, VS1
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#9A8F80' }}>Certificate</div>
              <div style={{ fontSize: '14px', fontWeight: '600', marginTop: '4px' }}>Included</div>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
