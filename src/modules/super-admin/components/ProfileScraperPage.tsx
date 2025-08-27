import { useState, useEffect } from 'react';
import { fetchDataset, DatasetConfig } from '../../shared/services/scraper/dataset';
import { getAllLinkedInUrls, insertProspect, AirtableConfig } from '../../shared/services/scraper/airtable';
import { SCRAPER_DATASET_BASE_URL, AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME, AIRTABLE_LINKEDIN_FIELD } from '../../shared/services/scraper/config';
import type { Prospect, ScrapeStats } from '../../shared/services/scraper/types';

export function ProfileScraperPage() {
  const [runId, setRunId] = useState('');
  const [apiToken, setApiToken] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [stats, setStats] = useState<ScrapeStats>({ total: 0, processed: 0, inserted: 0, duplicates: 0, errors: 0, rateLimitHits: 0 });
  const [isRunning, setIsRunning] = useState(false);

  const datasetCfg: DatasetConfig = { baseUrl: SCRAPER_DATASET_BASE_URL || 'https://example-dataset-api.local' };
  const airtableCfg: AirtableConfig = {
    apiKey: AIRTABLE_API_KEY,
    baseId: AIRTABLE_BASE_ID,
    tableName: AIRTABLE_TABLE_NAME || 'Prospects',
    linkedInField: AIRTABLE_LINKEDIN_FIELD || 'LinkedInURL',
  };

  const log = (line: string) => setLogs(prev => [...prev, line]);
  const updateStats = (patch: Partial<ScrapeStats>) => setStats(prev => ({ ...prev, ...patch }));

  const handleRun = async () => {
    setLogs([]);
    setStats({ total: 0, processed: 0, inserted: 0, duplicates: 0, errors: 0, rateLimitHits: 0 });
    setIsRunning(true);
    try {
      if (!runId.trim() || !apiToken.trim()) {
        log('Missing RunID or API Token');
        updateStats({ errors: stats.errors + 1 });
        setIsRunning(false);
        return;
      }

      log(`Fetching dataset for run ${runId}...`);
      const dataset: Prospect[] = await fetchDataset(runId.trim(), apiToken.trim(), datasetCfg);
      updateStats({ total: dataset.length });
      log(`Fetched ${dataset.length} records.`);

      log('Fetching existing LinkedIn URLs from Airtable...');
      let existing: Set<string>;
      try {
        existing = await getAllLinkedInUrls(airtableCfg);
      } catch (e: any) {
        if (String(e?.message || '').includes('RATE_LIMIT')) {
          log('Rate limit on Airtable fetch; pausing 30s...');
          updateStats({ rateLimitHits: stats.rateLimitHits + 1 });
          await new Promise(r => setTimeout(r, 30000));
          existing = await getAllLinkedInUrls(airtableCfg);
        } else {
          throw e;
        }
      }
      log(`Loaded ${existing.size} existing URLs.`);

      for (const item of dataset) {
        const url = (item.linkedInUrl || '').trim();
        updateStats({ processed: ++stats.processed, lastUrl: url });
        if (!url) {
          log('Skipping record with missing LinkedIn URL');
          continue;
        }
        if (existing.has(url)) {
          log(`Duplicate: ${url}`);
          updateStats({ duplicates: ++stats.duplicates });
          continue;
        }
        try {
          await insertProspect(airtableCfg, item);
          existing.add(url);
          log(`Inserted: ${url}`);
          updateStats({ inserted: ++stats.inserted });
        } catch (e: any) {
          if (String(e?.message || '').includes('RATE_LIMIT')) {
            log('Rate limit hit during insert; pausing 30s...');
            updateStats({ rateLimitHits: ++stats.rateLimitHits });
            await new Promise(r => setTimeout(r, 30000));
            // retry once
            await insertProspect(airtableCfg, item);
            existing.add(url);
            log(`Inserted after retry: ${url}`);
            updateStats({ inserted: ++stats.inserted });
          } else {
            log(`Error inserting ${url}: ${e?.message || e}`);
            updateStats({ errors: ++stats.errors });
            break; // halt on error per spec
          }
        }
      }
      log('Done.');
    } catch (e: any) {
      log(`Fatal error: ${e?.message || e}`);
      updateStats({ errors: ++stats.errors });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-sanjuan-darkest">Manual Profile Scraper</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm text-sanjuan-dark mb-1">Run ID</label>
          <input className="w-full rounded bg-white border border-sanjuan-lighter p-2 focus:outline-none focus:ring-2 focus:ring-sanjuan-light" value={runId} onChange={e => setRunId(e.target.value)} placeholder="e.g., run_123" />
        </div>
        <div>
          <label className="block text-sm text-sanjuan-dark mb-1">API Token</label>
          <input className="w-full rounded bg-white border border-sanjuan-lighter p-2 focus:outline-none focus:ring-2 focus:ring-sanjuan-light" value={apiToken} onChange={e => setApiToken(e.target.value)} placeholder="dataset api token" />
        </div>
        <div className="flex items-end">
          <button disabled={isRunning} onClick={handleRun} className="px-4 py-2 rounded-lg bg-sanjuan-base hover:bg-sanjuan-light text-white disabled:opacity-50">{isRunning ? 'Running…' : 'Start'}</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-sm mb-4">
        <div className="bg-white border border-sanjuan-lighter p-3 rounded text-sanjuan-dark">Total: {stats.total}</div>
        <div className="bg-white border border-sanjuan-lighter p-3 rounded text-sanjuan-dark">Processed: {stats.processed}</div>
        <div className="bg-white border border-sanjuan-lighter p-3 rounded text-sanjuan-dark">Inserted: {stats.inserted}</div>
        <div className="bg-white border border-sanjuan-lighter p-3 rounded text-sanjuan-dark">Duplicates: {stats.duplicates}</div>
        <div className="bg-white border border-sanjuan-lighter p-3 rounded text-sanjuan-dark">Errors: {stats.errors}</div>
        <div className="bg-white border border-sanjuan-lighter p-3 rounded text-sanjuan-dark">RateLimit: {stats.rateLimitHits}</div>
      </div>

      <div className="bg-white border border-sanjuan-lighter rounded p-3 text-sm h-64 overflow-auto">
        {logs.map((l, i) => (<div key={i} className="text-sanjuan-dark">{l}</div>))}
      </div>
    </div>
  );
}
