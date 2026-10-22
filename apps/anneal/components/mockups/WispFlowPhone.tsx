'use client';

// Markup ported from design/v6/CaseWispV6.dc.html. Product imagery, hidden from assistive tech.
import { useAutoSteps } from '@studio/kit/motion';
import { PhoneFrame } from '@studio/kit/ui';
import { useRef, useState } from 'react';

import { phone } from './frames';
import { useSecondTicks } from './useSecondTicks';
import { wispFlow } from './values';

const SIZE = phone(352, 733, 59, 0.84, 12);

/**
 * Wisp: one phone that plays the capture flow. Each stage of the enclosing
 * AutoSteps shows a layer (capture, recording, lock screen, the island over
 * another app, saved, minutes); the Dynamic Island morphs between its states.
 */
export function WispFlowPhone() {
  const ref = useRef<HTMLDivElement>(null);
  const tk = useSecondTicks(ref);
  const { stage } = useAutoSteps();
  // The recording clock starts on "recording" and keeps going until the flow loops.
  const [seen, setSeen] = useState(stage);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  if (stage !== seen) {
    setSeen(stage);
    setStartedAt(stage === 0 ? null : stage === 1 ? tk : (startedAt ?? tk - 4));
  }
  const v = wispFlow(stage, startedAt === null ? 0 : tk - startedAt);
  return (
    <div ref={ref}>
      <PhoneFrame {...SIZE}>
        <>
          <div className="glay" style={{ opacity: v.L0op, transform: v.L0tr }}>
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
                <span style={{ flex: '1', fontSize: '16px', color: '#0A0F0C' }}>
                  Classification
                </span>
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
                  style={{
                    marginTop: '20px',
                    fontSize: '19px',
                    fontWeight: '600',
                    color: '#0A0F0C',
                  }}
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
              <span
                className={`gtap ${v.gTap}`}
                style={{ left: '195px', top: '470px', opacity: v.gTapOp }}
              ></span>
            </div>
          </div>
          <div className="glay" style={{ opacity: v.L1op, transform: v.L1tr }}>
            <div
              style={{
                position: 'absolute',
                inset: '0',
                background: '#0B0C0B',
                padding: '58px 20px 40px',
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
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '7px',
                  marginTop: '40px',
                }}
              >
                <span
                  className="gblink"
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#FF453A',
                  }}
                ></span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '.11em',
                    color: '#FF6A5F',
                  }}
                >
                  RECORDING
                </span>
              </div>
              <div
                style={{
                  flex: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '68px',
                    fontWeight: '600',
                    color: '#fff',
                    letterSpacing: '-.045em',
                    fontVariantNumeric: 'tabular-nums',
                    lineHeight: '1',
                  }}
                >
                  {v.gTime}
                </div>
                <div
                  style={{ marginTop: '16px', fontSize: '19px', fontWeight: '600', color: '#fff' }}
                >
                  Quarterly Strategy Review
                </div>
                <div style={{ marginTop: '5px', fontSize: '14px', color: 'rgba(255,255,255,.45)' }}>
                  In person · Board room, 4th floor
                </div>
                <div className="gwv" style={{ marginTop: '46px', width: '100%' }}>
                  <i
                    style={{ height: '20%', animationDelay: '0.00s', animationDuration: '1.30s' }}
                  ></i>
                  <i
                    style={{ height: '38%', animationDelay: '0.18s', animationDuration: '1.10s' }}
                  ></i>
                  <i
                    style={{ height: '64%', animationDelay: '0.32s', animationDuration: '1.25s' }}
                  ></i>
                  <i
                    style={{ height: '90%', animationDelay: '0.08s', animationDuration: '1.00s' }}
                  ></i>
                  <i
                    style={{ height: '52%', animationDelay: '0.42s', animationDuration: '1.35s' }}
                  ></i>
                  <i
                    style={{ height: '78%', animationDelay: '0.22s', animationDuration: '1.15s' }}
                  ></i>
                  <i
                    style={{ height: '100%', animationDelay: '0.36s', animationDuration: '1.05s' }}
                  ></i>
                  <i
                    style={{ height: '60%', animationDelay: '0.12s', animationDuration: '1.28s' }}
                  ></i>
                  <i
                    style={{ height: '84%', animationDelay: '0.48s', animationDuration: '1.12s' }}
                  ></i>
                  <i
                    style={{ height: '44%', animationDelay: '0.26s', animationDuration: '1.30s' }}
                  ></i>
                  <i
                    style={{ height: '70%', animationDelay: '0.05s', animationDuration: '1.08s' }}
                  ></i>
                  <i
                    style={{ height: '96%', animationDelay: '0.40s', animationDuration: '1.22s' }}
                  ></i>
                  <i
                    style={{ height: '56%', animationDelay: '0.16s', animationDuration: '1.18s' }}
                  ></i>
                  <i
                    style={{ height: '82%', animationDelay: '0.30s', animationDuration: '1.02s' }}
                  ></i>
                  <i
                    style={{ height: '36%', animationDelay: '0.46s', animationDuration: '1.32s' }}
                  ></i>
                  <i
                    style={{ height: '68%', animationDelay: '0.10s', animationDuration: '1.14s' }}
                  ></i>
                  <i
                    style={{ height: '92%', animationDelay: '0.34s', animationDuration: '1.26s' }}
                  ></i>
                  <i
                    style={{ height: '48%', animationDelay: '0.20s', animationDuration: '1.06s' }}
                  ></i>
                  <i
                    style={{ height: '74%', animationDelay: '0.44s', animationDuration: '1.20s' }}
                  ></i>
                </div>
                <div
                  style={{
                    marginTop: '40px',
                    background: 'rgba(255,255,255,.07)',
                    border: '1px solid rgba(255,255,255,.12)',
                    borderRadius: '999px',
                    padding: '8px 15px',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,.62)',
                  }}
                >
                  Saving on device · syncs on Wi-Fi
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '30px',
                }}
              >
                <span
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,.08)',
                    border: '1px solid rgba(255,255,255,.14)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <rect x="6.5" y="5" width="4" height="14" rx="1.5"></rect>
                    <rect x="13.5" y="5" width="4" height="14" rx="1.5"></rect>
                  </svg>
                </span>
                <span
                  style={{
                    width: '82px',
                    height: '82px',
                    borderRadius: '50%',
                    background: '#E5443B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      width: '27px',
                      height: '27px',
                      borderRadius: '7px',
                      background: '#fff',
                    }}
                  ></span>
                </span>
                <span
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,.08)',
                    border: '1px solid rgba(255,255,255,.14)',
                  }}
                ></span>
              </div>
              <p
                style={{
                  margin: '20px 0 0',
                  textAlign: 'center',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,.34)',
                }}
              >
                Keeps recording if you lock your phone
              </p>
            </div>
          </div>
          <div className="glay" style={{ opacity: v.L3op, transform: v.L3tr }}>
            <div
              style={{
                position: 'absolute',
                inset: '0',
                background:
                  'radial-gradient(120% 80% at 20% 10%,#1F3A2C 0%,#0F1F17 45%,#070D0A 100%)',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: '27px',
                  top: '96px',
                  width: '64px',
                  height: '64px',
                  borderRadius: '15px',
                  background: '#E8E2D6',
                  opacity: '.92',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '39px',
                  top: '170px',
                  width: '40px',
                  height: '6px',
                  borderRadius: '3px',
                  background: 'rgba(255,255,255,.4)',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '115px',
                  top: '96px',
                  width: '64px',
                  height: '64px',
                  borderRadius: '15px',
                  background: '#C9D6CF',
                  opacity: '.92',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '127px',
                  top: '170px',
                  width: '40px',
                  height: '6px',
                  borderRadius: '3px',
                  background: 'rgba(255,255,255,.4)',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '203px',
                  top: '96px',
                  width: '64px',
                  height: '64px',
                  borderRadius: '15px',
                  background: '#2B3A33',
                  opacity: '.92',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '215px',
                  top: '170px',
                  width: '40px',
                  height: '6px',
                  borderRadius: '3px',
                  background: 'rgba(255,255,255,.4)',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '291px',
                  top: '96px',
                  width: '64px',
                  height: '64px',
                  borderRadius: '15px',
                  background: '#F2B8A0',
                  opacity: '.92',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '303px',
                  top: '170px',
                  width: '40px',
                  height: '6px',
                  borderRadius: '3px',
                  background: 'rgba(255,255,255,.4)',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '27px',
                  top: '200px',
                  width: '64px',
                  height: '64px',
                  borderRadius: '15px',
                  background: '#9FB7D9',
                  opacity: '.92',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '39px',
                  top: '274px',
                  width: '40px',
                  height: '6px',
                  borderRadius: '3px',
                  background: 'rgba(255,255,255,.4)',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '115px',
                  top: '200px',
                  width: '64px',
                  height: '64px',
                  borderRadius: '15px',
                  background: '#F4E3A1',
                  opacity: '.92',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '127px',
                  top: '274px',
                  width: '40px',
                  height: '6px',
                  borderRadius: '3px',
                  background: 'rgba(255,255,255,.4)',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '203px',
                  top: '200px',
                  width: '64px',
                  height: '64px',
                  borderRadius: '15px',
                  background: '#00FF5A',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  gap: '4px',
                  paddingBottom: '17px',
                  boxSizing: 'border-box',
                  boxShadow: '0 6px 16px rgba(0,0,0,.25)',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '16px',
                    borderRadius: '4px',
                    background: '#0C1A12',
                  }}
                ></span>
                <span
                  style={{
                    width: '7px',
                    height: '28px',
                    borderRadius: '4px',
                    background: '#0C1A12',
                  }}
                ></span>
                <span
                  style={{
                    width: '7px',
                    height: '21px',
                    borderRadius: '4px',
                    background: '#0C1A12',
                  }}
                ></span>
              </span>
              <span
                style={{
                  position: 'absolute',
                  left: '197px',
                  top: '270px',
                  width: '76px',
                  textAlign: 'center',
                  fontSize: '11.5px',
                  color: '#fff',
                  fontWeight: '500',
                }}
              >
                Wisp
              </span>
              <span
                style={{
                  position: 'absolute',
                  left: '291px',
                  top: '200px',
                  width: '64px',
                  height: '64px',
                  borderRadius: '15px',
                  background: '#BFD8C8',
                  opacity: '.92',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '303px',
                  top: '274px',
                  width: '40px',
                  height: '6px',
                  borderRadius: '3px',
                  background: 'rgba(255,255,255,.4)',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '27px',
                  top: '304px',
                  width: '64px',
                  height: '64px',
                  borderRadius: '15px',
                  background: '#3A3F47',
                  opacity: '.92',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '39px',
                  top: '378px',
                  width: '40px',
                  height: '6px',
                  borderRadius: '3px',
                  background: 'rgba(255,255,255,.4)',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '115px',
                  top: '304px',
                  width: '64px',
                  height: '64px',
                  borderRadius: '15px',
                  background: '#E9C6C6',
                  opacity: '.92',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '127px',
                  top: '378px',
                  width: '40px',
                  height: '6px',
                  borderRadius: '3px',
                  background: 'rgba(255,255,255,.4)',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '203px',
                  top: '304px',
                  width: '64px',
                  height: '64px',
                  borderRadius: '15px',
                  background: '#CFE3EE',
                  opacity: '.92',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '215px',
                  top: '378px',
                  width: '40px',
                  height: '6px',
                  borderRadius: '3px',
                  background: 'rgba(255,255,255,.4)',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '291px',
                  top: '304px',
                  width: '64px',
                  height: '64px',
                  borderRadius: '15px',
                  background: '#F0D9B5',
                  opacity: '.92',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '303px',
                  top: '378px',
                  width: '40px',
                  height: '6px',
                  borderRadius: '3px',
                  background: 'rgba(255,255,255,.4)',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '27px',
                  top: '408px',
                  width: '64px',
                  height: '64px',
                  borderRadius: '15px',
                  background: '#A7C4B5',
                  opacity: '.92',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '39px',
                  top: '482px',
                  width: '40px',
                  height: '6px',
                  borderRadius: '3px',
                  background: 'rgba(255,255,255,.4)',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '115px',
                  top: '408px',
                  width: '64px',
                  height: '64px',
                  borderRadius: '15px',
                  background: '#E4E4E4',
                  opacity: '.92',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '127px',
                  top: '482px',
                  width: '40px',
                  height: '6px',
                  borderRadius: '3px',
                  background: 'rgba(255,255,255,.4)',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '203px',
                  top: '408px',
                  width: '64px',
                  height: '64px',
                  borderRadius: '15px',
                  background: '#C2B9A8',
                  opacity: '.92',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '215px',
                  top: '482px',
                  width: '40px',
                  height: '6px',
                  borderRadius: '3px',
                  background: 'rgba(255,255,255,.4)',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '291px',
                  top: '408px',
                  width: '64px',
                  height: '64px',
                  borderRadius: '15px',
                  background: '#DCE8D2',
                  opacity: '.92',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '303px',
                  top: '482px',
                  width: '40px',
                  height: '6px',
                  borderRadius: '3px',
                  background: 'rgba(255,255,255,.4)',
                }}
              ></span>
              <div
                style={{
                  position: 'absolute',
                  left: '14px',
                  right: '14px',
                  bottom: '22px',
                  height: '92px',
                  borderRadius: '32px',
                  background: 'rgba(255,255,255,.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                <span
                  style={{
                    width: '62px',
                    height: '62px',
                    borderRadius: '15px',
                    background: '#F5F5F5',
                  }}
                ></span>
                <span
                  style={{
                    width: '62px',
                    height: '62px',
                    borderRadius: '15px',
                    background: '#BFD8C8',
                  }}
                ></span>
                <span
                  style={{
                    width: '62px',
                    height: '62px',
                    borderRadius: '15px',
                    background: '#9FB7D9',
                  }}
                ></span>
                <span
                  style={{
                    width: '62px',
                    height: '62px',
                    borderRadius: '15px',
                    background: '#E8E2D6',
                  }}
                ></span>
              </div>
            </div>
          </div>
          <div className="glay" style={{ opacity: v.L2op, transform: v.L2tr }}>
            <div
              style={{
                position: 'absolute',
                inset: '0',
                background: 'linear-gradient(180deg,#5B6670 0%,#3E4A44 100%)',
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
                  top: '70px',
                  left: '0',
                  right: '0',
                  textAlign: 'center',
                  color: '#fff',
                }}
              >
                <div style={{ fontSize: '19px', fontWeight: '600', opacity: '.88' }}>
                  Tuesday 29 September
                </div>
                <div
                  style={{
                    fontSize: '98px',
                    fontWeight: '600',
                    letterSpacing: '-.035em',
                    lineHeight: '1',
                    marginTop: '4px',
                  }}
                >
                  10:24
                </div>
              </div>
              <div style={{ position: 'absolute', left: '12px', right: '12px', bottom: '122px' }}>
                <div
                  style={{
                    boxSizing: 'border-box',
                    padding: '16px 16px 16px 18px',
                    borderRadius: '26px',
                    background: 'rgba(12,19,15,.9)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      flex: '1',
                      minWidth: '0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '7px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        aria-hidden="true"
                        style={{
                          display: 'flex',
                          alignItems: 'flex-end',
                          gap: '2px',
                          height: '11px',
                          flexShrink: '0',
                          opacity: '.72',
                        }}
                      >
                        <span
                          style={{
                            width: '2.5px',
                            height: '6px',
                            borderRadius: '1px',
                            background: '#fff',
                          }}
                        ></span>
                        <span
                          style={{
                            width: '2.5px',
                            height: '11px',
                            borderRadius: '1px',
                            background: '#fff',
                          }}
                        ></span>
                        <span
                          style={{
                            width: '2.5px',
                            height: '8px',
                            borderRadius: '1px',
                            background: '#fff',
                          }}
                        ></span>
                      </span>
                      <span
                        style={{
                          fontSize: '15px',
                          fontWeight: '600',
                          color: '#fff',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        Quarterly Strategy Review
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="glv" aria-hidden="true" style={{ height: '20px' }}>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                      </span>
                      <span
                        style={{
                          fontSize: '34px',
                          fontWeight: '600',
                          color: '#fff',
                          letterSpacing: '-.03em',
                          lineHeight: '1',
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {v.gTime}
                      </span>
                    </div>
                  </div>
                  <span
                    style={{
                      width: '46px',
                      height: '46px',
                      flexShrink: '0',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,.16)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <rect x="6.5" y="5" width="4" height="14" rx="1.5"></rect>
                      <rect x="13.5" y="5" width="4" height="14" rx="1.5"></rect>
                    </svg>
                  </span>
                  <span
                    style={{
                      width: '46px',
                      height: '46px',
                      flexShrink: '0',
                      borderRadius: '50%',
                      background: '#E5443B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span
                      style={{
                        width: '15px',
                        height: '15px',
                        borderRadius: '4px',
                        background: '#fff',
                      }}
                    ></span>
                  </span>
                </div>
              </div>
              <span
                style={{
                  position: 'absolute',
                  left: '46px',
                  bottom: '48px',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,.16)',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  right: '46px',
                  bottom: '48px',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,.16)',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  left: '128px',
                  bottom: '8px',
                  width: '134px',
                  height: '5px',
                  borderRadius: '3px',
                  background: 'rgba(255,255,255,.85)',
                }}
              ></span>
            </div>
          </div>
          <div className="glay" style={{ opacity: v.L5op, transform: v.L5tr }}>
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
                  flex: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <span
                  className="gpop"
                  style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: '50%',
                    background: '#00FF5A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 14px 34px rgba(0,200,70,.3)',
                  }}
                >
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0C1A12"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 13l4 4 10-10"></path>
                  </svg>
                </span>
                <div
                  style={{
                    margin: '26px 0 8px',
                    fontSize: '30px',
                    fontWeight: '700',
                    color: '#0A0F0C',
                    letterSpacing: '-.035em',
                  }}
                >
                  Recording saved
                </div>
                <div style={{ fontSize: '17px', color: '#6B7671', lineHeight: '1.4' }}>
                  Quarterly Strategy Review
                  <br />
                  18 min · captured just now
                </div>
              </div>
              <div
                style={{
                  background: '#F7F8F7',
                  borderRadius: '20px',
                  padding: '6px 16px',
                  marginBottom: '22px',
                }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '13px 0' }}
                >
                  <span
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: '#00FF5A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: '0',
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0C1A12"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 13l4 4 10-10"></path>
                    </svg>
                  </span>
                  <span style={{ flex: '1', fontSize: '15.5px', color: '#0A0F0C' }}>
                    Uploaded to your workspace
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '13px 0',
                    borderTop: '1px solid rgba(10,15,12,.07)',
                  }}
                >
                  <span className="gspin"></span>
                  <span style={{ flex: '1', fontSize: '15.5px', color: '#0A0F0C' }}>
                    Transcribing and labelling speakers
                  </span>
                  <span style={{ fontSize: '13.5px', color: '#8A938D' }}>~4 min</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '13px 0',
                    borderTop: '1px solid rgba(10,15,12,.07)',
                  }}
                >
                  <span
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      border: '1.8px solid #D6DAD7',
                      boxSizing: 'border-box',
                      flexShrink: '0',
                    }}
                  ></span>
                  <span style={{ flex: '1', fontSize: '15.5px', color: '#8A938D' }}>
                    Draft minutes for your review
                  </span>
                </div>
              </div>
              <span
                style={{
                  display: 'block',
                  textAlign: 'center',
                  background: '#0C1A12',
                  color: '#00FF5A',
                  fontSize: '17px',
                  fontWeight: '600',
                  padding: '17px 0',
                  borderRadius: '999px',
                }}
              >
                Back to meetings
              </span>
            </div>
          </div>
          <div className="glay" style={{ opacity: v.L6op, transform: v.L6tr }}>
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
                  style={{
                    fontSize: '14.5px',
                    color: '#4A554F',
                    lineHeight: '1.45',
                    marginTop: '5px',
                  }}
                >
                  8 of 10 invited members were present. Quorum was met at 14:07.
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#0A0F0C' }}>
                  2. Matters discussed
                </div>
                <div
                  style={{
                    fontSize: '14.5px',
                    color: '#4A554F',
                    lineHeight: '1.45',
                    marginTop: '5px',
                  }}
                >
                  The vendor timeline, then the revised Q4 budget memo.
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#0A0F0C' }}>
                  3. Decisions
                </div>
                <div
                  style={{
                    fontSize: '14.5px',
                    color: '#4A554F',
                    lineHeight: '1.45',
                    marginTop: '5px',
                  }}
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
          </div>
          <div
            className="gisl"
            style={{ width: v.iW, height: v.iH, borderRadius: v.iR, transform: 'translateX(-50%)' }}
          >
            <div className="gic" style={{ opacity: v.iC }}>
              <span className="glv" aria-hidden="true" style={{ height: '15px' }}>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </span>
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#fff',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {v.gTime}
              </span>
            </div>
            <div className="gie" style={{ opacity: v.iE }}>
              <div
                style={{
                  flex: '1',
                  minWidth: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '7px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    aria-hidden="true"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      gap: '2px',
                      height: '11px',
                      flexShrink: '0',
                      opacity: '.72',
                    }}
                  >
                    <span
                      style={{
                        width: '2.5px',
                        height: '6px',
                        borderRadius: '1px',
                        background: '#fff',
                      }}
                    ></span>
                    <span
                      style={{
                        width: '2.5px',
                        height: '11px',
                        borderRadius: '1px',
                        background: '#fff',
                      }}
                    ></span>
                    <span
                      style={{
                        width: '2.5px',
                        height: '8px',
                        borderRadius: '1px',
                        background: '#fff',
                      }}
                    ></span>
                  </span>
                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#fff',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Quarterly Strategy Review
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="glv" aria-hidden="true" style={{ height: '20px' }}>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                  </span>
                  <span
                    style={{
                      fontSize: '32px',
                      fontWeight: '600',
                      color: '#fff',
                      letterSpacing: '-.03em',
                      lineHeight: '1',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {v.gTime}
                  </span>
                </div>
              </div>
              <span
                style={{
                  width: '44px',
                  height: '44px',
                  flexShrink: '0',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,.16)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <rect x="6.5" y="5" width="4" height="14" rx="1.5"></rect>
                  <rect x="13.5" y="5" width="4" height="14" rx="1.5"></rect>
                </svg>
              </span>
              <span
                style={{
                  width: '44px',
                  height: '44px',
                  flexShrink: '0',
                  borderRadius: '50%',
                  background: '#E5443B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#fff' }}
                ></span>
              </span>
            </div>
          </div>
          <span
            className={`gpress ${v.gPress}`}
            style={{ left: '195px', top: '30px', opacity: v.gPressOp }}
          ></span>
        </>
      </PhoneFrame>
    </div>
  );
}
