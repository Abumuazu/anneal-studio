import 'server-only';

import { isMemory, outbox } from './memory';

export interface Mail {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}

export interface Mailer {
  send(mail: Mail): Promise<void>;
}

const memoryMailer: Mailer = {
  send(mail) {
    outbox().mail.push(mail);
    return Promise.resolve();
  },
};

/** Resend's REST API (no SDK needed for one call). */
export function resend(apiKey: string, from: string, fetcher: typeof fetch = fetch): Mailer {
  return {
    async send(mail) {
      const res = await fetcher('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to: [mail.to],
          subject: mail.subject,
          text: mail.text,
          ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
        }),
      });
      if (!res.ok) throw new Error(`Resend: ${String(res.status)}`);
    },
  };
}

/** The configured mailer, or null when email is not set up. */
export function mailer(): Mailer | null {
  if (isMemory()) return memoryMailer;
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  if (key && from) return resend(key, from);
  return null;
}
