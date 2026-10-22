// One-off: creates the Briefs and Waitlist databases under a Notion page that is shared
// with the integration, then writes their ids into apps/anneal/.env.local.
// Reads NOTION_TOKEN and NOTION_PARENT_PAGE from that file. Prints ids and links only.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const envPath = resolve(import.meta.dirname, '../apps/anneal/.env.local');
const lines = readFileSync(envPath, 'utf8').split('\n');
const get = (k) => (lines.find((l) => l.startsWith(`${k}=`)) ?? '').slice(k.length + 1).trim();
const token = get('NOTION_TOKEN');
const parent = get('NOTION_PARENT_PAGE');
if (!token || !parent) {
  console.error('Set NOTION_TOKEN and NOTION_PARENT_PAGE in apps/anneal/.env.local first.');
  process.exit(1);
}

const text = { rich_text: {} };
const select = { select: {} };
const date = { date: {} };

async function createDb(title, properties) {
  const res = await fetch('https://api.notion.com/v1/databases', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parent: { type: 'page_id', page_id: parent },
      title: [{ type: 'text', text: { content: title } }],
      properties,
    }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`${title}: ${res.status} ${json.code ?? ''} ${json.message ?? ''}`);
  return { id: json.id, url: json.url };
}

const briefs = await createDb('Briefs', {
  Name: { title: {} },
  Email: { email: {} },
  Offer: select,
  Stage: select,
  Timing: select,
  Heard: select,
  Currency: select,
  Budget: text,
  Company: text,
  Message: text,
  Campaign: text,
  Received: date,
});
const waitlist = await createDb('Waitlist', {
  Email: { title: {} },
  Source: select,
  Joined: date,
});

const set = (k, v) => {
  const i = lines.findIndex((l) => l.startsWith(`${k}=`));
  if (i >= 0) lines[i] = `${k}=${v}`;
  else lines.push(`${k}=${v}`);
};
set('NOTION_BRIEFS_DB', briefs.id);
set('NOTION_WAITLIST_DB', waitlist.id);
writeFileSync(envPath, lines.join('\n'));
console.log('Briefs  ', briefs.id, briefs.url);
console.log('Waitlist', waitlist.id, waitlist.url);
