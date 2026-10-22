// Markup ported from design/v6/WorkV6.dc.html. Product imagery, hidden from assistive tech.
import { PhoneFrame } from '@studio/kit/ui';

import { type PhoneSize } from './frames';

/** Wisp: draft minutes waiting for the secretary. */
export function WispMinutes({ size }: { size: PhoneSize }) {
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
                fontWeight: '500',
                color: '#6B7671',
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
                fontWeight: '600',
                color: '#0A0F0C',
                background: '#fff',
                boxShadow: '0 1px 3px rgba(10,15,12,.12)',
              }}
            >
              Minutes
            </span>
          </div>
          <div
            style={{
              background: '#FFF6E0',
              color: '#7A5A12',
              borderRadius: '12px',
              padding: '10px 12px',
              fontSize: '13px',
              lineHeight: '1.35',
              marginBottom: '18px',
            }}
          >
            Draft. Awaiting secretary review before this becomes the official record.
          </div>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#0A0F0C' }}>
              1. Attendance
            </div>
            <div
              style={{ fontSize: '14.5px', color: '#4A554F', lineHeight: '1.45', marginTop: '5px' }}
            >
              8 of 10 invited members were present. Quorum was met at 14:07.
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#0A0F0C' }}>
              2. Matters discussed
            </div>
            <div
              style={{ fontSize: '14.5px', color: '#4A554F', lineHeight: '1.45', marginTop: '5px' }}
            >
              The vendor timeline, then the revised Q4 budget memo.
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#0A0F0C' }}>
              3. Decisions
            </div>
            <div
              style={{ fontSize: '14.5px', color: '#4A554F', lineHeight: '1.45', marginTop: '5px' }}
            >
              Outstanding contracts are signed off by 18 September. The revised memo goes out by
              Friday.
            </div>
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
            <span
              style={{
                flex: '1',
                textAlign: 'center',
                background: '#F2F3F2',
                color: '#0A0F0C',
                fontSize: '16px',
                fontWeight: '600',
                padding: '15px 0',
                borderRadius: '999px',
              }}
            >
              Suggest edit
            </span>
            <span
              style={{
                flex: '1',
                textAlign: 'center',
                background: '#00FF5A',
                color: '#0C1A12',
                fontSize: '16px',
                fontWeight: '600',
                padding: '15px 0',
                borderRadius: '999px',
              }}
            >
              Approve
            </span>
          </div>
        </div>
      </>
    </PhoneFrame>
  );
}
