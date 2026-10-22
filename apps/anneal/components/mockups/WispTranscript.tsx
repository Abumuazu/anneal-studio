// Markup ported from design/v6/CaseWispV6.dc.html. Product imagery, hidden from assistive tech.
import { PhoneFrame } from '@studio/kit/ui';

import { type PhoneSize } from './frames';

/** Wisp: a transcript with speaker labels. */
export function WispTranscript({ size }: { size: PhoneSize }) {
  return (
    <PhoneFrame {...size}>
      <>
        <div
          style={{
            position: 'absolute',
            inset: '0',
            background: '#fff',
            padding: '60px 20px 36px',
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
              fontSize: '24px',
              fontWeight: '700',
              color: '#0A0F0C',
              letterSpacing: '-.03em',
              lineHeight: '1.15',
              marginTop: '8px',
            }}
          >
            Budget Committee, Q3
          </div>
          <div style={{ fontSize: '13.5px', color: '#8A938D', marginTop: '4px' }}>
            Finance · Sep 12
          </div>
          <div
            style={{
              display: 'flex',
              background: '#F2F3F2',
              borderRadius: '10px',
              padding: '2px',
              margin: '16px 0 18px',
            }}
          >
            <span
              style={{
                flex: '1',
                textAlign: 'center',
                fontSize: '13px',
                padding: '6px 0',
                borderRadius: '8px',
                fontWeight: '500',
                color: '#6B7671',
              }}
            >
              Overview
            </span>
            <span
              style={{
                flex: '1',
                textAlign: 'center',
                fontSize: '13px',
                padding: '6px 0',
                borderRadius: '8px',
                fontWeight: '600',
                color: '#0A0F0C',
                background: '#fff',
                boxShadow: '0 1px 3px rgba(10,15,12,.12)',
              }}
            >
              Transcript
            </span>
            <span
              style={{
                flex: '1',
                textAlign: 'center',
                fontSize: '13px',
                padding: '6px 0',
                borderRadius: '8px',
                fontWeight: '500',
                color: '#6B7671',
              }}
            >
              Actions
            </span>
            <span
              style={{
                flex: '1',
                textAlign: 'center',
                fontSize: '13px',
                padding: '6px 0',
                borderRadius: '8px',
                fontWeight: '500',
                color: '#6B7671',
              }}
            >
              Minutes
            </span>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <span
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: '#0C1A12',
                color: '#00FF5A',
                fontSize: '11px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 'none',
              }}
            >
              ML
            </span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#0A0F0C' }}>
                M. Laurent <span style={{ color: '#8A938D', fontWeight: '500' }}>00:02</span>
              </div>
              <div
                style={{
                  fontSize: '14.5px',
                  color: '#2C332F',
                  lineHeight: '1.42',
                  marginTop: '3px',
                }}
              >
                Good afternoon everyone. Let's start with the Q4 budget memo, since it has the
                tightest deadline.
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <span
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: '#0C1A12',
                color: '#00FF5A',
                fontSize: '11px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 'none',
              }}
            >
              JO
            </span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#0A0F0C' }}>
                J. Okafor <span style={{ color: '#8A938D', fontWeight: '500' }}>00:34</span>
              </div>
              <div
                style={{
                  fontSize: '14.5px',
                  color: '#2C332F',
                  lineHeight: '1.42',
                  marginTop: '3px',
                }}
              >
                Before we do that, operations asked for five minutes on the vendor timeline.
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <span
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: '#0C1A12',
                color: '#00FF5A',
                fontSize: '11px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 'none',
              }}
            >
              TS
            </span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#0A0F0C' }}>
                T. Silva <span style={{ color: '#8A938D', fontWeight: '500' }}>01:22</span>
              </div>
              <div
                style={{
                  fontSize: '14.5px',
                  color: '#2C332F',
                  lineHeight: '1.42',
                  marginTop: '3px',
                }}
              >
                The outstanding contracts should be signed off by the 18th.
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: 'auto',
              background: '#F2F3F2',
              borderRadius: '999px',
              padding: '14px 18px',
              fontSize: '15px',
              color: '#8A938D',
            }}
          >
            Ask about this meeting
          </div>
        </div>
      </>
    </PhoneFrame>
  );
}
