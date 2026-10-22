// Markup ported from design/v6/WorkV6.dc.html. Product imagery, hidden from assistive tech.
import { PhoneFrame } from '@studio/kit/ui';

import { type PhoneSize } from './frames';

/** Wisp: the capture screen, before recording starts. */
export function WispCapture({ size }: { size: PhoneSize }) {
  return (
    <PhoneFrame {...size}>
      <>
        <div
          style={{
            position: 'absolute',
            inset: '0',
            background: '#fff',
            padding: '60px 20px 100px',
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
          <div
            style={{
              fontSize: '34px',
              fontWeight: '700',
              color: '#0A0F0C',
              letterSpacing: '-.037em',
              marginBottom: '22px',
            }}
          >
            Capture
          </div>
          <div
            style={{
              background: '#F2F3F2',
              borderRadius: '14px',
              padding: '11px 16px 13px',
              marginBottom: '8px',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '.06em',
                color: '#8A938D',
              }}
            >
              MEETING TITLE
            </div>
            <div style={{ fontSize: '17px', color: '#0A0F0C', marginTop: '2px' }}>
              Quarterly Strategy Review
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '13px',
              background: '#F2F3F2',
              borderRadius: '14px',
              padding: '13px 16px',
              marginBottom: '8px',
            }}
          >
            <span style={{ flex: '1', fontSize: '16px', color: '#0A0F0C' }}>Classification</span>
            <span style={{ fontSize: '16px', color: '#8A938D' }}>Confidential</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              background: '#F2F3F2',
              borderRadius: '14px',
              padding: '13px 16px',
            }}
          >
            <span style={{ flex: '1', fontSize: '15px', color: '#0A0F0C', lineHeight: '1.3' }}>
              Everyone present has been told this session is recorded
            </span>
            <span
              style={{
                width: '51px',
                height: '31px',
                borderRadius: '999px',
                background: '#00FF5A',
                position: 'relative',
                flex: 'none',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  left: '22px',
                  width: '27px',
                  height: '27px',
                  borderRadius: '50%',
                  background: '#fff',
                }}
              ></span>
            </span>
          </div>
          <div
            style={{
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                position: 'relative',
                width: '112px',
                height: '112px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span className="gring"></span>
              <span
                style={{
                  position: 'relative',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: '#C4362C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 14px 32px rgba(196,54,44,.26)',
                }}
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="9" y="3" width="6" height="11" rx="3"></rect>
                  <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0"></path>
                  <path d="M12 18v3"></path>
                </svg>
              </span>
            </span>
            <div
              style={{ marginTop: '20px', fontSize: '19px', fontWeight: '600', color: '#0A0F0C' }}
            >
              Start recording
            </div>
            <div style={{ marginTop: '4px', fontSize: '14px', color: '#8A938D' }}>
              Works offline. Syncs when you reconnect.
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              left: '12px',
              right: '12px',
              bottom: '18px',
              height: '64px',
              borderRadius: '32px',
              background: 'rgba(255,255,255,.82)',
              border: '1px solid rgba(255,255,255,.85)',
              boxShadow: '0 12px 34px rgba(10,15,12,.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                fontSize: '10px',
                fontWeight: '600',
                padding: '7px 14px',
                borderRadius: '19px',
                color: '#9AA29D',
              }}
            >
              <span
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '7px',
                  border: '1.9px solid currentColor',
                  boxSizing: 'border-box',
                }}
              ></span>
              Meetings
            </span>
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                fontSize: '10px',
                fontWeight: '600',
                padding: '7px 14px',
                borderRadius: '19px',
                color: '#0C1A12',
                background: 'rgba(0,255,90,.28)',
              }}
            >
              <span
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '7px',
                  border: '1.9px solid currentColor',
                  boxSizing: 'border-box',
                }}
              ></span>
              Capture
            </span>
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                fontSize: '10px',
                fontWeight: '600',
                padding: '7px 14px',
                borderRadius: '19px',
                color: '#9AA29D',
              }}
            >
              <span
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '7px',
                  border: '1.9px solid currentColor',
                  boxSizing: 'border-box',
                }}
              ></span>
              Alerts
            </span>
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                fontSize: '10px',
                fontWeight: '600',
                padding: '7px 14px',
                borderRadius: '19px',
                color: '#9AA29D',
              }}
            >
              <span
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '7px',
                  border: '1.9px solid currentColor',
                  boxSizing: 'border-box',
                }}
              ></span>
              Settings
            </span>
          </div>
        </div>
      </>
    </PhoneFrame>
  );
}
