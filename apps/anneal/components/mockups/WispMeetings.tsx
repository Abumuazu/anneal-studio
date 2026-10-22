// Markup ported from design/v6/CaseWispV6.dc.html. Product imagery, hidden from assistive tech.
import { PhoneFrame } from '@studio/kit/ui';

import { type PhoneSize } from './frames';

/** Wisp: the meetings list, one of them recording. */
export function WispMeetings({ size }: { size: PhoneSize }) {
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <span
              style={{
                fontSize: '34px',
                fontWeight: '700',
                color: '#0A0F0C',
                letterSpacing: '-.037em',
              }}
            >
              Meetings
            </span>
            <span
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: '#0C1A12',
                color: '#00FF5A',
                fontSize: '13.5px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              AB
            </span>
          </div>
          <div
            style={{
              background: '#F2F3F2',
              borderRadius: '14px',
              padding: '11px 14px',
              marginBottom: '14px',
              fontSize: '15.5px',
              color: '#8A938D',
            }}
          >
            Search meetings, people, decisions
          </div>
          <div
            style={{
              background: '#131614',
              borderRadius: '20px',
              padding: '15px 16px',
              marginBottom: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <span
                className="gblink"
                style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#FF453A' }}
              ></span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  letterSpacing: '.1em',
                  color: '#FF6A5F',
                }}
              >
                RECORDING
              </span>
              <span
                style={{ marginLeft: 'auto', fontSize: '13.5px', fontWeight: '600', color: '#fff' }}
              >
                18:42
              </span>
            </div>
            <div
              style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}
            >
              <div>
                <div
                  style={{
                    fontSize: '17px',
                    fontWeight: '600',
                    color: '#fff',
                    marginBottom: '3px',
                  }}
                >
                  Quarterly Strategy Review
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.5)' }}>
                  In person · Board room, 4th floor
                </div>
              </div>
              <span className="glv" aria-hidden="true" style={{ height: '24px' }}>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </span>
            </div>
          </div>
          <div
            style={{
              background: '#F7F8F7',
              borderRadius: '20px',
              padding: '15px 16px 14px',
              marginBottom: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#5C665F' }}>
                Teams bot · Restricted
              </span>
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '12.5px',
                  fontWeight: '600',
                  color: '#0C1A12',
                }}
              >
                In review
              </span>
            </div>
            <div
              style={{
                fontSize: '17px',
                fontWeight: '600',
                color: '#0A0F0C',
                lineHeight: '1.25',
                margin: '9px 0 3px',
              }}
            >
              Budget Committee, Q3
            </div>
            <div style={{ fontSize: '13.5px', color: '#8A938D' }}>Finance committee · 54 min</div>
          </div>
          <div
            style={{
              background: '#F7F8F7',
              borderRadius: '20px',
              padding: '15px 16px 14px',
              marginBottom: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#5C665F' }}>
                In person · Restricted
              </span>
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '12.5px',
                  fontWeight: '600',
                  color: '#0C1A12',
                }}
              >
                Final
              </span>
            </div>
            <div
              style={{
                fontSize: '17px',
                fontWeight: '600',
                color: '#0A0F0C',
                lineHeight: '1.25',
                margin: '9px 0 3px',
              }}
            >
              Leadership Weekly
            </div>
            <div style={{ fontSize: '13.5px', color: '#8A938D' }}>Executive team · 96 min</div>
          </div>
          <div
            style={{
              background: '#F7F8F7',
              borderRadius: '20px',
              padding: '15px 16px 14px',
              marginBottom: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#5C665F' }}>
                Zoom bot
              </span>
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '12.5px',
                  fontWeight: '600',
                  color: '#0C1A12',
                }}
              >
                Transcribing
              </span>
            </div>
            <div
              style={{
                fontSize: '17px',
                fontWeight: '600',
                color: '#0A0F0C',
                lineHeight: '1.25',
                margin: '9px 0 3px',
              }}
            >
              Vendor Selection Panel
            </div>
            <div style={{ fontSize: '13.5px', color: '#8A938D' }}>Operations · Today</div>
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
