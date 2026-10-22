'use client';

// Markup ported from design/v6/HomeV6.dc.html. Product imagery, hidden from assistive tech.
import { PhoneFrame } from '@studio/kit/ui';
import { useRef } from 'react';

import { useSecondTicks } from './useSecondTicks';
import { exchangeValues } from './values';
import { type PhoneSize, phone } from './frames';

const CHART_DOTS = Array.from({ length: 18 * 9 }, (_, i) => (
  <circle key={i} cx={12 + Math.floor(i / 9) * 22} cy={14 + (i % 9) * 22} r="0.9" fill="#3A332A" />
));

/** Size on Home (HomeV6). */
const HOME = phone(262, 543, 45, 0.62);

/** Exchange: portfolio with the static chart and a live tip. */
export function ExchangePortfolio({ size = HOME }: { size?: PhoneSize }) {
  const ref = useRef<HTMLDivElement>(null);
  const tk = useSecondTicks(ref);
  const v = exchangeValues(tk);
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
            padding: '60px 20px 0',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
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
              left: '-60px',
              right: '-60px',
              top: '160px',
              height: '320px',
              background:
                'radial-gradient(50% 50% at 50% 50%,rgba(255,140,30,.22),rgba(255,140,30,0))',
              pointerEvents: 'none',
            }}
          ></div>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#1C1916',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: '700',
                color: '#CFC8BE',
              }}
            >
              TA
            </span>
            <span style={{ display: 'flex', gap: '8px' }}>
              <span
                style={{
                  padding: '8px 14px',
                  borderRadius: '999px',
                  background: '#1C1916',
                  fontSize: '13.5px',
                  fontWeight: '600',
                  color: '#E9E2D8',
                }}
              >
                Rewards
              </span>
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#1C1916',
                }}
              ></span>
            </span>
          </div>
          <div
            style={{ position: 'relative', marginTop: '22px', fontSize: '14px', color: '#8E8A83' }}
          >
            Portfolio
          </div>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'baseline',
              marginTop: '4px',
            }}
          >
            <span
              className="fxnum"
              style={{ fontSize: '42px', fontWeight: '700', letterSpacing: '-.035em' }}
            >
              {v.pfMain}
            </span>
            <span
              className="fxnum"
              style={{ fontSize: '22px', fontWeight: '600', color: '#8E8A83', marginLeft: '2px' }}
            >
              .{v.pfDec}
            </span>
          </div>
          <div style={{ position: 'relative', marginTop: '6px', fontSize: '14px' }}>
            <span style={{ color: '#2FD07A', fontWeight: '600' }}>↗ {v.pfChg}</span>{' '}
            <span style={{ color: '#8E8A83' }}>in past 24 hours</span>
          </div>
          <div style={{ position: 'relative', margin: '14px -20px 0', height: '210px' }}>
            <svg
              viewBox="0 0 390 210"
              width="390"
              height="210"
              aria-hidden="true"
              style={{ display: 'block', overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="fxa" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#FF8A1F" stopOpacity=".45" />
                  <stop offset="1" stopColor="#FF8A1F" stopOpacity="0" />
                </linearGradient>
              </defs>
              {CHART_DOTS}
              <path
                d="M0.0 120.5 L2.4 117.2 L4.8 118.5 L7.2 119.0 L9.6 121.6 L11.9 118.8 L14.3 109.5 L16.7 106.4 L19.1 100.3 L21.5 99.5 L23.9 97.1 L26.3 95.5 L28.7 102.5 L31.1 93.0 L33.4 87.8 L35.8 83.5 L38.2 90.8 L40.6 94.3 L43.0 91.1 L45.4 86.2 L47.8 78.6 L50.2 75.0 L52.6 69.4 L55.0 71.4 L57.3 67.5 L59.7 64.6 L62.1 68.1 L64.5 58.6 L66.9 58.8 L69.3 56.0 L71.7 63.7 L74.1 69.2 L76.5 70.8 L78.8 71.0 L81.2 67.8 L83.6 68.2 L86.0 72.2 L88.4 77.6 L90.8 78.9 L93.2 71.3 L95.6 77.1 L98.0 75.6 L100.3 73.9 L102.7 82.5 L105.1 80.0 L107.5 72.1 L109.9 84.1 L112.3 83.2 L114.7 81.9 L117.1 85.2 L119.5 81.0 L121.9 81.8 L124.2 89.7 L126.6 83.6 L129.0 81.1 L131.4 78.8 L133.8 75.3 L136.2 79.0 L138.6 82.8 L141.0 92.4 L143.4 88.7 L145.7 92.8 L148.1 94.4 L150.5 99.3 L152.9 101.3 L155.3 101.0 L157.7 92.7 L160.1 105.3 L162.5 111.1 L164.9 107.4 L167.2 100.3 L169.6 101.7 L172.0 116.1 L174.4 129.1 L176.8 123.7 L179.2 126.9 L181.6 131.8 L184.0 125.1 L186.4 121.1 L188.8 124.0 L191.1 125.5 L193.5 125.5 L195.9 119.5 L198.3 120.9 L200.7 122.8 L203.1 124.5 L205.5 137.0 L207.9 131.1 L210.3 130.2 L212.6 132.7 L215.0 147.6 L217.4 150.8 L219.8 146.2 L222.2 157.5 L224.6 156.8 L227.0 150.8 L229.4 159.2 L231.8 149.8 L234.1 149.3 L236.5 152.2 L238.9 150.9 L241.3 147.9 L243.7 148.0 L246.1 142.1 L248.5 146.8 L250.9 147.7 L253.3 140.3 L255.7 140.4 L258.0 144.6 L260.4 137.9 L262.8 131.5 L265.2 136.9 L267.6 143.4 L270.0 139.3 L272.4 134.7 L274.8 130.2 L277.2 116.5 L279.5 117.7 L281.9 104.2 L284.3 106.1 L286.7 102.1 L289.1 90.2 L291.5 78.3 L293.9 70.5 L296.3 66.7 L298.7 64.2 L301.0 61.9 L303.4 58.3 L305.8 60.2 L308.2 59.4 L310.6 57.0 L313.0 57.6 L315.4 53.6 L317.8 51.4 L320.2 42.3 L322.6 44.7 L324.9 49.5 L327.3 51.9 L329.7 51.5 L332.1 47.0 L334.5 51.7 L336.9 52.4 L339.3 47.2 L341.7 67.6 L344.1 74.2 L346.4 72.8 L348.8 72.2 L351.2 73.3 L353.6 77.6 L356.0 74.3 L356.0 210 L0 210 Z"
                fill="url(#fxa)"
              />
              <path
                d="M0.0 120.5 L2.4 117.2 L4.8 118.5 L7.2 119.0 L9.6 121.6 L11.9 118.8 L14.3 109.5 L16.7 106.4 L19.1 100.3 L21.5 99.5 L23.9 97.1 L26.3 95.5 L28.7 102.5 L31.1 93.0 L33.4 87.8 L35.8 83.5 L38.2 90.8 L40.6 94.3 L43.0 91.1 L45.4 86.2 L47.8 78.6 L50.2 75.0 L52.6 69.4 L55.0 71.4 L57.3 67.5 L59.7 64.6 L62.1 68.1 L64.5 58.6 L66.9 58.8 L69.3 56.0 L71.7 63.7 L74.1 69.2 L76.5 70.8 L78.8 71.0 L81.2 67.8 L83.6 68.2 L86.0 72.2 L88.4 77.6 L90.8 78.9 L93.2 71.3 L95.6 77.1 L98.0 75.6 L100.3 73.9 L102.7 82.5 L105.1 80.0 L107.5 72.1 L109.9 84.1 L112.3 83.2 L114.7 81.9 L117.1 85.2 L119.5 81.0 L121.9 81.8 L124.2 89.7 L126.6 83.6 L129.0 81.1 L131.4 78.8 L133.8 75.3 L136.2 79.0 L138.6 82.8 L141.0 92.4 L143.4 88.7 L145.7 92.8 L148.1 94.4 L150.5 99.3 L152.9 101.3 L155.3 101.0 L157.7 92.7 L160.1 105.3 L162.5 111.1 L164.9 107.4 L167.2 100.3 L169.6 101.7 L172.0 116.1 L174.4 129.1 L176.8 123.7 L179.2 126.9 L181.6 131.8 L184.0 125.1 L186.4 121.1 L188.8 124.0 L191.1 125.5 L193.5 125.5 L195.9 119.5 L198.3 120.9 L200.7 122.8 L203.1 124.5 L205.5 137.0 L207.9 131.1 L210.3 130.2 L212.6 132.7 L215.0 147.6 L217.4 150.8 L219.8 146.2 L222.2 157.5 L224.6 156.8 L227.0 150.8 L229.4 159.2 L231.8 149.8 L234.1 149.3 L236.5 152.2 L238.9 150.9 L241.3 147.9 L243.7 148.0 L246.1 142.1 L248.5 146.8 L250.9 147.7 L253.3 140.3 L255.7 140.4 L258.0 144.6 L260.4 137.9 L262.8 131.5 L265.2 136.9 L267.6 143.4 L270.0 139.3 L272.4 134.7 L274.8 130.2 L277.2 116.5 L279.5 117.7 L281.9 104.2 L284.3 106.1 L286.7 102.1 L289.1 90.2 L291.5 78.3 L293.9 70.5 L296.3 66.7 L298.7 64.2 L301.0 61.9 L303.4 58.3 L305.8 60.2 L308.2 59.4 L310.6 57.0 L313.0 57.6 L315.4 53.6 L317.8 51.4 L320.2 42.3 L322.6 44.7 L324.9 49.5 L327.3 51.9 L329.7 51.5 L332.1 47.0 L334.5 51.7 L336.9 52.4 L339.3 47.2 L341.7 67.6 L344.1 74.2 L346.4 72.8 L348.8 72.2 L351.2 73.3 L353.6 77.6 L356.0 74.3"
                fill="none"
                stroke="#FFA826"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <path
                className="fxtip"
                d={v.tipD}
                fill="none"
                stroke="#FFA826"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <circle className="fxdot fxglow" cx={v.tipX} cy={v.tipY} r="6" fill="#FFA826" />
              <circle
                className="fxdot"
                cx={v.tipX}
                cy={v.tipY}
                r="4.5"
                fill="#FFA826"
                stroke="#0B0A09"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '8px',
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '.06em',
                color: '#CFC8BE',
              }}
            >
              <span
                className="fxlive"
                style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2FD07A' }}
              ></span>
              LIVE
            </span>
            <span
              style={{
                padding: '7px 14px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: '600',
                background: '#26221C',
                color: '#fff',
              }}
            >
              1D
            </span>
            <span
              style={{
                padding: '7px 14px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#8E8A83',
              }}
            >
              1W
            </span>
            <span
              style={{
                padding: '7px 14px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#8E8A83',
              }}
            >
              1M
            </span>
            <span
              style={{
                padding: '7px 14px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#8E8A83',
              }}
            >
              3M
            </span>
            <span
              style={{
                padding: '7px 14px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#8E8A83',
              }}
            >
              1Y
            </span>
          </div>
          <div
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginTop: '18px',
            }}
          >
            <span
              style={{
                textAlign: 'center',
                padding: '16px 0',
                borderRadius: '999px',
                background: '#26221C',
                fontSize: '16px',
                fontWeight: '600',
              }}
            >
              Transfer
            </span>
            <span
              style={{
                textAlign: 'center',
                padding: '16px 0',
                borderRadius: '999px',
                background: '#FFA826',
                color: '#1A1206',
                fontSize: '16px',
                fontWeight: '700',
              }}
            >
              Buy &amp; Sell
            </span>
          </div>
          <div
            style={{ position: 'relative', marginTop: '22px', fontSize: '20px', fontWeight: '700' }}
          >
            Assets
          </div>
          <div style={{ position: 'relative', marginTop: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0' }}>
              <span>
                <span
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#F7931A',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '20px',
                    flex: 'none',
                  }}
                >
                  ₿
                </span>
              </span>
              <div style={{ flex: '1' }}>
                <div style={{ fontSize: '16px', fontWeight: '600' }}>Bitcoin</div>
                <div style={{ fontSize: '13px', color: '#8E8A83' }}>BTC</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="fxnum" style={{ fontSize: '16px', fontWeight: '600' }}>
                  {v.btcVal}
                </div>
                <div className="fxnum" style={{ fontSize: '13px', color: '#8E8A83' }}>
                  0.0798 BTC
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0' }}>
              <span>
                <span
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#627EEA',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '20px',
                    flex: 'none',
                  }}
                >
                  Ξ
                </span>
              </span>
              <div style={{ flex: '1' }}>
                <div style={{ fontSize: '16px', fontWeight: '600' }}>Ethereum</div>
                <div style={{ fontSize: '13px', color: '#8E8A83' }}>ETH</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="fxnum" style={{ fontSize: '16px', fontWeight: '600' }}>
                  ₦4,381,640
                </div>
                <div className="fxnum" style={{ fontSize: '13px', color: '#8E8A83' }}>
                  0.8935 ETH
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0' }}>
              <span>
                <span
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#26A17B',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '20px',
                    flex: 'none',
                  }}
                >
                  ₮
                </span>
              </span>
              <div style={{ flex: '1' }}>
                <div style={{ fontSize: '16px', fontWeight: '600' }}>Tether</div>
                <div style={{ fontSize: '13px', color: '#8E8A83' }}>USDT</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="fxnum" style={{ fontSize: '16px', fontWeight: '600' }}>
                  ₦1,697,240
                </div>
                <div className="fxnum" style={{ fontSize: '13px', color: '#8E8A83' }}>
                  1,204.50 USDT
                </div>
              </div>
            </div>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}
