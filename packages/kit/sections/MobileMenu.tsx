'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react';

import { getLenis } from '../motion/engine';
import { HandoffLink } from '../transitions/Handoff';
import { type NavItem } from './NavLinks';

export interface MobileMenuProps {
  links: readonly NavItem[];
  /** The brand shown at the top of the open menu, as in the header. */
  brand: ReactNode;
  /** Accessible name for the menu button and the open menu, e.g. "Menu". */
  label: string;
  openLabel: string;
  closeLabel: string;
  /** Small text above the call to action (city clocks). */
  footer?: ReactNode;
  /** Full-width call to action at the bottom. */
  cta?: ReactNode;
}

const FOCUSABLE = 'a[href], button:not([disabled])';

/**
 * The phone menu: a round button in the header opens a full-screen sheet with
 * the site links, large. Hidden from 900px up, where the header shows the
 * links itself. Escape and the close button shut it, scrolling is held while
 * it is open, and focus stays inside until it closes.
 */
export function MobileMenu({
  links,
  brand,
  label,
  openLabel,
  closeLabel,
  footer,
  cta,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const id = useId();
  const toggle = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLButtonElement>(null);

  // A route change (a link, the back button) always closes the sheet.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const lenis = getLenis();
    lenis?.stop();
    root.style.overflow = 'hidden';
    close.current?.focus();
    const button = toggle.current;
    // The wide layout has no menu; if the window grows past it, let go of the page.
    const mq = window.matchMedia('(min-width: 901px)');
    const onWide = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener('change', onWide);
    return () => {
      mq.removeEventListener('change', onWide);
      root.style.overflow = '';
      lenis?.start();
      button?.focus({ preventScroll: true });
    };
  }, [open]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (e.key !== 'Tab' || !sheet.current) return;
    const items = [...sheet.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="desk:hidden">
      <button
        ref={toggle}
        type="button"
        className="icon-btn glass-light"
        aria-label={openLabel}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(true)}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="M4 8H20M4 16H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {open ? (
        // The sheet is a modal dialog: the keyboard handler only keeps focus inside it.
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <div
          ref={sheet}
          id={id}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="mmenu"
          onKeyDown={onKeyDown}
        >
          <div className="mmenu-top">
            <span className="inline-flex items-center gap-2.5">{brand}</span>
            <button
              ref={close}
              type="button"
              className="icon-btn mmenu-close"
              aria-label={closeLabel}
              onClick={() => setOpen(false)}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <nav aria-label={label} className="mmenu-links">
            {links.map((item) => {
              const props = { href: item.href, className: 'mmenu-link' };
              const inner = (
                <>
                  {item.label}
                  <span aria-hidden="true">↗</span>
                </>
              );
              return item.handoff ? (
                <HandoffLink key={item.href} {...props}>
                  {inner}
                </HandoffLink>
              ) : (
                <Link key={item.href} {...props}>
                  {inner}
                </Link>
              );
            })}
          </nav>
          <div className="mmenu-foot">
            {footer ? <div className="type-label text-grey-400">{footer}</div> : null}
            {cta}
          </div>
        </div>
      ) : null}
    </div>
  );
}
