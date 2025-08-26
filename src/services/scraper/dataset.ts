import { Prospect } from './types';

export interface DatasetConfig {
  baseUrl: string; // e.g., https://api.example.com
}

export async function fetchDataset(runId: string, apiToken: string, cfg: DatasetConfig): Promise<Prospect[]> {
  const url = `${cfg.baseUrl.replace(/\/+$/, '')}/runs/${encodeURIComponent(runId)}`;
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Accept': 'application/json',
    },
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Dataset fetch failed: ${res.status} ${t}`);
  }
  const data = await res.json();
  if (!Array.isArray(data)) return [];
  return data as Prospect[];
}


