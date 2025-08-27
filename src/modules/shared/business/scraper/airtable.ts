import { Prospect } from './types';

const AIRTABLE_BASE_URL = 'https://api.airtable.com/v0';

export interface AirtableConfig {
  apiKey: string;
  baseId: string;
  tableName: string;
  linkedInField: string; // Field name storing LinkedIn URL
}

async function airtableRequest(
  path: string,
  cfg: AirtableConfig,
  init?: RequestInit,
): Promise<Response> {
  const headers: HeadersInit = {
    'Authorization': `Bearer ${cfg.apiKey}`,
    'Content-Type': 'application/json',
    ...(init?.headers || {}),
  };
  return fetch(`${AIRTABLE_BASE_URL}/${cfg.baseId}/${encodeURIComponent(cfg.tableName)}${path}`, {
    ...init,
    headers,
  });
}

export async function getAllLinkedInUrls(cfg: AirtableConfig): Promise<Set<string>> {
  const urls = new Set<string>();
  let offset: string | undefined = undefined;
  do {
    const params = new URLSearchParams();
    if (offset) params.set('offset', offset);
    params.set('fields[]', cfg.linkedInField);
    const res = await airtableRequest(`?${params.toString()}`, cfg);
    if (res.status === 429) throw new Error('RATE_LIMIT');
    if (!res.ok) throw new Error(`Airtable fetch failed: ${res.status}`);
    const data = await res.json();
    for (const rec of data.records || []) {
      const v = rec.fields?.[cfg.linkedInField];
      if (typeof v === 'string' && v.trim()) urls.add(v.trim());
    }
    offset = data.offset;
  } while (offset);
  return urls;
}

export async function insertProspect(cfg: AirtableConfig, prospect: Prospect): Promise<void> {
  const body = {
    records: [
      {
        fields: prospect,
      },
    ],
  };
  const res = await airtableRequest('', cfg, { method: 'POST', body: JSON.stringify(body) });
  if (res.status === 429) throw new Error('RATE_LIMIT');
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Airtable insert failed: ${res.status} ${t}`);
  }
}


