import { useState } from 'react';
import { fetchDataset, DatasetConfig } from '../services/scraper/dataset';
import { getAllLinkedInUrls, insertProspect, AirtableConfig } from '../services/scraper/airtable';
import { SCRAPER_DATASET_BASE_URL, AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME, AIRTABLE_LINKEDIN_FIELD } from '../services/scraper/config';
import type { Prospect, ScrapeStats } from '../services/scraper/types';

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

  const handleStop = () => {
    setIsRunning(false);
    log('Stopped by user.');
  };

  const clearLogs = () => setLogs([]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sanjuan-dark">Manual Profile Scraper</h1>
          <p className="text-sm text-gray-600">Scrape LinkedIn profiles and insert into Airtable with deduplication</p>
        </div>
        <div>
          <button
            onClick={isRunning ? handleStop : handleRun}
            className={`px-8 py-3 rounded-lg font-medium text-lg transition-all duration-200 ${
              isRunning 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isRunning ? 'Stop Scraping' : 'Start Scraping'}
          </button>
        </div>
      </div>

      {/* Configuration */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Run ID</label>
            <input
              type="text"
              value={runId}
              onChange={(e) => setRunId(e.target.value)}
              placeholder="Enter dataset run ID"
              className="w-full px-3 py-2 border border-sanjuan-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-sanjuan-light bg-white text-sanjuan-dark"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">API Token</label>
            <input
              type="password"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              placeholder="Enter API token"
              className="w-full px-3 py-2 border border-sanjuan-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-sanjuan-light bg-white text-sanjuan-dark"
            />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.processed}</div>
            <div className="text-sm text-gray-600">Processed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.inserted}</div>
            <div className="text-sm text-gray-600">Inserted</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.duplicates}</div>
            <div className="text-sm text-gray-600">Duplicates</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{stats.errors}</div>
            <div className="text-sm text-gray-600">Errors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.rateLimitHits}</div>
            <div className="text-sm text-gray-600">Rate Limits</div>
          </div>
        </div>
      </div>

      {/* Live Logs */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Live Logs</h2>
          <button
            onClick={clearLogs}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
          >
            Clear Logs
          </button>
        </div>
        <div className="bg-gray-100 rounded-md p-4 h-64 overflow-y-auto font-mono text-sm">
          {logs.length === 0 ? (
            <div className="text-gray-500">No logs yet. Start scraping to see activity.</div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="mb-1">{log}</div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
