// Markup ported from design/v6/HomeV6.dc.html. Product imagery, hidden from assistive tech.
import { PhoneFrame } from '@studio/kit/ui';
import { type CSSProperties } from 'react';
import { type PhoneSize, phone } from './frames';

/** Size on Home (HomeV6). */
const HOME = phone(254, 526, 44, 0.6);

/** Wisp: the typing onboarding screen. */
export function WispOnboarding({ size = HOME }: { size?: PhoneSize }) {
  return (
    <PhoneFrame {...size}>
      <div
        style={{
          position: 'absolute',
          inset: '0',
          background: '#000',
          display: 'flex',
          flexDirection: 'column',
          padding: '52px 20px 40px',
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
        <div style={{ flex: '1' }}></div>
        <div
          className="gt"
          style={{
            width: '100%',
            fontSize: '31px',
            fontWeight: '700',
            color: '#fff',
            letterSpacing: '-.03em',
            lineHeight: '40px',
          }}
        >
          <span className="gtp p0">
            <span className="gtw" style={{ '--w': '8.6em' } as CSSProperties}>
              <span>Record meetings</span>
            </span>
            <span className="gcur">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#06140D"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="9" y="3" width="6" height="11" rx="3" />
                <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0" />
                <path d="M12 18v3" />
              </svg>
            </span>
          </span>
          <span className="gtp p1">
            <span className="gtw" style={{ '--w': '8.2em' } as CSSProperties}>
              <span>View summaries</span>
            </span>
            <span className="gcur">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#06140D"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 3.5h7l4.5 4.5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1z" />
                <path d="M13.5 3.5V9H19" />
              </svg>
            </span>
          </span>
          <span className="gtp p2">
            <span className="gtw" style={{ '--w': '7.1em' } as CSSProperties}>
              <span>Track actions</span>
            </span>
            <span className="gcur">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#06140D"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 13l4 4 10-10" />
              </svg>
            </span>
          </span>
        </div>
        <div style={{ flex: '1' }}></div>
        <span
          style={{
            display: 'block',
            textAlign: 'center',
            background: '#00FF5A',
            color: '#06140D',
            fontSize: '17px',
            fontWeight: '600',
            padding: '17px 0',
            borderRadius: '999px',
          }}
        >
          Create account
        </span>
        <span
          style={{
            display: 'block',
            textAlign: 'center',
            marginTop: '10px',
            background: 'rgba(255,255,255,.09)',
            border: '1px solid rgba(255,255,255,.14)',
            color: '#fff',
            fontSize: '17px',
            fontWeight: '600',
            padding: '16px 0',
            borderRadius: '999px',
          }}
        >
          Log in
        </span>
        <p
          style={{
            margin: '18px 0 0',
            fontSize: '12.5px',
            color: 'rgba(255,255,255,.3)',
            textAlign: 'center',
          }}
        >
          Encrypted, and stored on your own servers.
        </p>
      </div>
    </PhoneFrame>
  );
}
