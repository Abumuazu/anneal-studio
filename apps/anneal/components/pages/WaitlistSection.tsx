import { ClipIn, InView, LineMask, Reveal } from '@studio/kit/motion';
import { EmailCapture } from '@studio/kit/ui';
import { type ReactNode } from 'react';

import { joinWaitlist } from '@/app/actions/waitlist';
import { waitlistStates } from '@/content/interaction';

import { copy } from '@/content/copy';
import { waitlistCopy } from '@/content/pages';

interface WaitlistSectionProps {
  source: 'products' | 'studio';
  msg: string;
  lines: readonly [string, string];
  lead: string;
  note?: ReactNode;
}

/** Dark waitlist section (Products, Studio). The form only confirms once the address is stored. */
export function WaitlistSection({ source, msg, lines, lead, note }: WaitlistSectionProps) {
  return (
    <ClipIn data-msg={msg} className="relative bg-ink py-24 desk:py-40 text-panel">
      <InView className="wrap grid items-end gap-10 desk:grid-cols-12 desk:gap-6">
        <div className="desk:col-span-7">
          <h2 className="type-display-wide m-0 text-[clamp(44px,5.6vw,88px)]">
            <span aria-hidden="true">
              <LineMask line={0}>{lines[0]}</LineMask>
              <LineMask line={1}>
                <span className="text-grey-500">{lines[1]}</span>
              </LineMask>
            </span>
            <span className="sr-only">{`${lines[0]} ${lines[1]}`}</span>
          </h2>
          <Reveal as="p" step={1} className="type-lead mt-[30px] mb-0 max-w-[560px] text-grey-300">
            {lead}
          </Reveal>
        </div>
        <Reveal step={2} className="desk:col-span-5 desk:col-start-8">
          <EmailCapture
            action={joinWaitlist}
            source={source}
            label={waitlistCopy.emailLabel}
            placeholder={waitlistCopy.placeholder}
            submit={waitlistCopy.submit}
            pendingLabel={waitlistStates.Pending}
            failure={waitlistStates.Failure}
            invalidMessage={waitlistStates.Validation}
            note={note}
            className="glass rounded-[28px] p-7 [--glass-bg:rgb(255_255_255/0.06)]"
            success={
              <div className="p-1">
                <div className="type-label text-grey-400">{waitlistCopy.onTheList}</div>
                <p className="type-h3 mt-3.5 mb-0 text-[30px]">{copy['products.wait.ok']}</p>
              </div>
            }
          />
        </Reveal>
      </InView>
    </ClipIn>
  );
}
