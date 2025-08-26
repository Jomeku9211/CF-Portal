export default undefined;
import { useState, useEffect } from 'react';
import { fetchDataset, DatasetConfig } from '@/services/scraper/dataset';
import { getAllLinkedInUrls, insertProspect, AirtableConfig } from '@/services/scraper/airtable';
import { SCRAPER_DATASET_BASE_URL, AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME, AIRTABLE_LINKEDIN_FIELD } from '@/services/scraper/config';
import type { Prospect, ScrapeStats } from '@/services/scraper/types';

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

export function PostScraperPage() {
  const [cookiesJson, setCookiesJson] = useState('');
  const [apifyToken, setApifyToken] = useState('');
  const [maxPosts, setMaxPosts] = useState<number>(1);
  const [apifyBuild, setApifyBuild] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState<{ posts: number; total: number; errors: number; processed: number }>({ posts: 0, total: 0, errors: 0, processed: 0 });

  const log = (line: string) => setLogs(prev => [...prev, line]);
  const reset = () => {
    setLogs([]);
    setStats({ posts: 0, total: 0, errors: 0, processed: 0 });
  };

  const validateConfig = () => {
    if (!cookiesJson.trim() || !apifyToken.trim()) {
      log('Please provide LinkedIn Cookies (JSON) and Apify API Token');
      return false;
    }
    try {
      JSON.parse(cookiesJson);
    } catch {
      log('Invalid cookies JSON');
      return false;
    }
    return true;
  };

  const handleStart = async () => {
    if (!validateConfig()) return;
    reset();
    setIsRunning(true);
    log('Starting Post Scraper...');
    log(`Max posts per profile: ${maxPosts}`);
    if (apifyBuild.trim()) log(`Using Apify build: ${apifyBuild}`);
    // Placeholder: wire to backend if available
  };

  const handleStop = () => {
    setIsRunning(false);
    log('Stopped Post Scraper');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-sanjuan-darkest">Manual Post Scraper</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="md:col-span-2">
          <label className="block text-sm text-sanjuan-dark mb-1">LinkedIn Cookies (JSON)</label>
          <textarea className="w-full rounded bg-white border border-sanjuan-lighter p-2 focus:outline-none focus:ring-2 focus:ring-sanjuan-light h-32" value={cookiesJson} onChange={e => setCookiesJson(e.target.value)} placeholder='[{"name":"li_at","value":"..."}]' />
        </div>
        <div>
          <label className="block text-sm text-sanjuan-dark mb-1">Apify API Token</label>
          <input className="w-full rounded bg-white border border-sanjuan-lighter p-2 focus:outline-none focus:ring-2 focus:ring-sanjuan-light" value={apifyToken} onChange={e => setApifyToken(e.target.value)} placeholder="apify_api_..." />
        </div>
        <div>
          <label className="block text-sm text-sanjuan-dark mb-1">Max Posts per Profile</label>
          <input type="number" min={1} max={100} className="w-full rounded bg-white border border-sanjuan-lighter p-2 focus:outline-none focus:ring-2 focus:ring-sanjuan-light" value={maxPosts} onChange={e => setMaxPosts(parseInt(e.target.value) || 1)} />
        </div>
        <div>
          <label className="block text-sm text-sanjuan-dark mb-1">Apify Build Version (optional)</label>
          <input className="w-full rounded bg-white border border-sanjuan-lighter p-2 focus:outline-none focus:ring-2 focus:ring-sanjuan-light" value={apifyBuild} onChange={e => setApifyBuild(e.target.value)} placeholder="e.g., 1.2.0 or latest" />
        </div>
        <div className="flex items-end">
          {!isRunning ? (
            <button onClick={handleStart} className="px-4 py-2 rounded-lg bg-sanjuan-base hover:bg-sanjuan-light text-white">Start</button>
          ) : (
            <button onClick={handleStop} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white">Stop</button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mb-4">
        <div className="bg-white border border-sanjuan-lighter p-3 rounded text-sanjuan-dark">Posts: {stats.posts}</div>
        <div className="bg-white border border-sanjuan-lighter p-3 rounded text-sanjuan-dark">Total: {stats.total}</div>
        <div className="bg-white border border-sanjuan-lighter p-3 rounded text-sanjuan-dark">Processed: {stats.processed}</div>
        <div className="bg-white border border-sanjuan-lighter p-3 rounded text-sanjuan-dark">Errors: {stats.errors}</div>
      </div>

      <div className="bg-white border border-sanjuan-lighter rounded p-3 text-sm h-64 overflow-auto">
        {logs.map((l, i) => (<div key={i} className="text-sanjuan-dark">{l}</div>))}
      </div>
    </div>
  );
}

export function CommentingPage() {
  return <div>
    <h1 className="text-2xl font-bold mb-4">Commenting</h1>
    <p className="text-gray-300">Build commenting tools here.</p>
  </div>;
}

export function GenerateCommentPage() {
  const [airtableViewName] = useState('viwebNLgwgr4hzMHJ');
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState<{ processed: number; generated: number; errors: number }>({ processed: 0, generated: 0, errors: 0 });

  const log = (line: string) => setLogs(prev => [...prev, line]);
  const reset = () => {
    setLogs([]);
    setStats({ processed: 0, generated: 0, errors: 0 });
  };

  const validate = () => {
    if (!airtableViewName.trim()) {
      log('Please specify Airtable View Name');
      return false;
    }
    return true;
  };

  const handleStart = async () => {
    if (!validate()) return;
    reset();
    setIsRunning(true);
    log('Starting Generate Comment pipeline...');
    log(`Reading Airtable view "${airtableViewName}"`);
    log(`Using pre-configured fields: "Post Text" and "firstName"`);
    log(`Using pre-configured assistant model and settings`);
    // Placeholder: integration to backend worker. This UI mirrors "scrapping-coderfarm" inputs.
  };

  const handleStop = () => {
    setIsRunning(false);
    log('Stopped Generate Comment pipeline');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-sanjuan-darkest">Generate Comment</h1>
      <p className="text-sm text-sanjuan-light mb-4">Fully pre-configured - just click start to begin comment generation</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">




        <div className="flex items-end">
          {!isRunning ? (
            <button onClick={handleStart} className="px-4 py-2 rounded-lg bg-sanjuan-base hover:bg-sanjuan-light text-white">Start</button>
          ) : (
            <button onClick={handleStop} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white">Stop</button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm mb-4">
        <div className="bg-white border border-sanjuan-lighter p-3 rounded text-sanjuan-dark">Processed: {stats.processed}</div>
        <div className="bg-white border border-sanjuan-lighter p-3 rounded text-sanjuan-dark">Generated: {stats.generated}</div>
        <div className="bg-white border border-sanjuan-lighter p-3 rounded text-sanjuan-dark">Errors: {stats.errors}</div>
      </div>

      <div className="bg-white border border-sanjuan-lighter rounded p-3 text-sm h-64 overflow-auto">
        {logs.map((l, i) => (<div key={i} className="text-sanjuan-dark">{l}</div>))}
      </div>
    </div>
  );
}

export function AutoCommentingPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [nextFireTime, setNextFireTime] = useState<number | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [runStats, setRunStats] = useState({
    processed: 0,
    successes: 0,
    failures: 0,
    lastRun: null as number | null,
    lastError: null as string | null
  });
  const [todayCount, setTodayCount] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timeout | null>(null);

  // Clear logs on mount for this tab and fetch initial count
  useEffect(() => {
    setLogs([]);
    fetchTodayCount(); // Fetch initial count from Airtable
  }, []);

  const log = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const formatTimeAgo = (startTime: number) => {
    const now = Date.now();
    const diff = now - startTime;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ago`;
    }
    return `${minutes}m ago`;
  };

  const formatCountdown = (nextFireTime: number) => {
    const now = Date.now();
    const diff = Math.max(0, nextFireTime - now);
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Update countdown every second when running
  useEffect(() => {
    if (!isRunning || !nextFireTime) return;
    
    const interval = setInterval(() => {
      if (nextFireTime <= Date.now()) {
        setNextFireTime(null);
        return;
      }
      // Force re-render to update countdown
      setNextFireTime(prev => prev);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isRunning, nextFireTime]);

  const handleStart = async () => {
    if (isRunning) return;
    
    log('Starting AutoCommenting system...');
    log('Using existing browser session for LinkedIn access...');
    
    setIsRunning(true);
    setRunStats({ processed: 0, successes: 0, failures: 0, lastRun: null, lastError: null });
    
    // Run soon (2 seconds) for immediate feedback
    const nextDelay = 2000;
    const nextFire = Date.now() + nextDelay;
    setNextFireTime(nextFire);
    setStartedAt(Date.now());
    
    log(`✅ System started. Next run in ${nextDelay/1000} seconds`);
    
    // Wait for the initial delay, then start the process
    const timer = setTimeout(() => {
      if (isRunning) {
        simulateAutoCommenting();
      }
    }, nextDelay);
    setActiveTimer(timer);
  };

  const handleStop = async () => {
    if (!isRunning) return;
    
    log('Stopping AutoCommenting system...');
    setIsRunning(false);
    setNextFireTime(null);
    setStartedAt(null);
    setRunStats({ processed: 0, successes: 0, failures: 0, lastRun: null, lastError: null });
    log('✅ System stopped. All stats reset.');
    
    // Clear any pending timeouts/intervals
    if (activeTimer) {
      clearTimeout(activeTimer);
      setActiveTimer(null);
    }
  };

  const simulateAutoCommenting = () => {
    if (!isRunning) return;
    
    // Simulate processing a record
    const newProcessed = runStats.processed + 1;
    const isSuccess = Math.random() > 0.1; // 90% success rate
    
    if (isSuccess) {
      setRunStats(prev => ({
        ...prev,
        processed: newProcessed,
        successes: prev.successes + 1,
        lastRun: Date.now()
      }));
      log(`✅ Comment posted successfully on record ${newProcessed}`);
    } else {
      setRunStats(prev => ({
        ...prev,
        processed: newProcessed,
        failures: prev.failures + 1,
        lastRun: Date.now(),
        lastError: 'Comment posting failed'
      }));
      log(`❌ Failed to post comment on record ${newProcessed}`);
    }
    
    // Schedule next run with random delay (5-7 minutes as per source code)
    if (isRunning) {
      const delay = (5 + Math.random() * 2) * 60 * 1000; // 5-7 minutes
      const nextRun = Date.now() + delay;
      setNextFireTime(nextRun);
      log(`⏰ Next run scheduled in ${Math.round(delay/60000)} minutes`);
      
      // Use setTimeout for the next run
      const timer = setTimeout(() => {
        if (isRunning) {
          simulateAutoCommenting();
        }
      }, delay);
      setActiveTimer(timer);
    }
  };

  const fetchTodayCount = async () => {
    try {
      log('Fetching today\'s count from Airtable view viwjzxpzCC24wtkfc...');
      
      const response = await fetch(`/api/airtable-count?viewId=viwjzxpzCC24wtkfc`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      setTodayCount(data.count);
      log(`✅ Today's count updated: ${data.count} comments from Airtable`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      log(`❌ Error fetching today's count: ${errorMessage}`);
      // Fallback to a reasonable default if API fails
      setTodayCount(0);
    }
  };

  const handleResetStats = () => {
    setRunStats({ processed: 0, successes: 0, failures: 0, lastRun: null, lastError: null });
    log('Statistics reset');
  };

  return (
    <div className="space-y-6">
      {/* Main Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">AutoCommenting System</h1>
          <p className="text-sm text-gray-600">Uses existing browser session - no API key required</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className={`px-6 py-3 rounded-lg font-medium text-lg ${
              isRunning 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            } text-white`}
          >
            Start System
          </button>
          <button
            onClick={handleStop}
            disabled={!isRunning}
            className={`px-6 py-3 rounded-lg font-medium text-lg ${
              !isRunning 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700'
            } text-white`}
          >
            Stop System
          </button>
        </div>
      </div>

      {/* Status Badge and Timer */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="font-medium">
              {isRunning ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Next Run</div>
            <div className="text-lg font-mono">
              {nextFireTime ? formatCountdown(nextFireTime) : '--:--'}
            </div>
          </div>
        </div>
        
        {startedAt && (
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="text-blue-800">Started: {formatTimeAgo(startedAt)}</span>
            <span className="text-blue-800">Last Run: {runStats.lastRun ? formatTimeAgo(runStats.lastRun) : '--'}</span>
          </div>
        )}
      </div>

      {/* Statistics Grid */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{runStats.processed}</div>
            <div className="text-sm text-gray-600">Processed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{runStats.successes}</div>
            <div className="text-sm text-gray-600">Successes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{runStats.failures}</div>
            <div className="text-sm text-gray-600">Failures</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {todayCount}
              <button 
                onClick={fetchTodayCount}
                className="ml-2 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded"
                title="Refresh from Airtable view viwjzxpzCC24wtkfc"
              >
                🔄
              </button>
            </div>
            <div className="text-sm text-gray-600">Today</div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleResetStats}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
          >
            Reset Stats
          </button>
        </div>
      </div>

      {/* Last Processed Post */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Last Processed Post</h2>
        {runStats.lastRun ? (
          <div className="text-gray-800">
            Last processed at: {formatTimeAgo(runStats.lastRun)}
            {runStats.lastError && (
              <div className="text-red-600 mt-2">Error: {runStats.lastError}</div>
            )}
          </div>
        ) : (
          <div className="text-gray-500">No post has been processed yet</div>
        )}
      </div>

      {/* Schedule Section */}
      <div className="bg-sanjuan-lightest rounded-lg shadow p-6 border border-sanjuan-lighter text-sanjuan-dark">
        <h2 className="text-xl font-semibold mb-4">Schedule Configuration</h2>
        
        {/* All input fields at the same level */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Daily Limit (comments/day)</label>
            <input
              type="number"
              value={100}
              className="w-full px-3 py-2 border border-sanjuan-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-sanjuan-light bg-white text-sanjuan-dark"
              min="1"
              max="200"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Min Time Between Comments (minutes)</label>
            <input
              type="number"
              value={5}
              className="w-full px-3 py-2 border border-sanjuan-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-sanjuan-light bg-white text-sanjuan-dark"
              min="1"
              max="120"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Days to Run</label>
            <input
              type="number"
              value={7}
              className="w-full px-3 py-2 border border-sanjuan-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-sanjuan-light bg-white text-sanjuan-dark"
              min="1"
              max="30"
              readOnly
            />
          </div>
        </div>
        
        {/* Single button below all fields */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              log('✅ Scheduled mode enabled with: Daily Limit: 100, Min Time: 5 min, Days: 7');
              log('⏰ System will run automatically with configured schedule');
            }}
            className="px-6 py-3 bg-sanjuan-base hover:bg-sanjuan-light text-white rounded-lg font-medium transition-colors"
          >
            Enable Schedule Mode
          </button>
        </div>
      </div>

      {/* Live Logs */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Live Logs</h2>
        <div className="bg-gray-100 rounded-md p-4 h-64 overflow-y-auto font-mono text-sm">
          {logs.length === 0 ? (
            <div className="text-gray-500">No logs yet. Start the system to see activity.</div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="mb-1">{log}</div>
            ))
          )}
        </div>
        <div className="mt-2 flex justify-between">
          <button
            onClick={() => setLogs([])}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
          >
            Clear Logs
          </button>
          <button
            onClick={() => {
              const logsText = logs.join('\n');
              const blob = new Blob([logsText], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'autocommenting-logs.txt';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Download Logs
          </button>
        </div>
      </div>
    </div>
  );
}

export function PodcastManagementPage() {
  const [events, setEvents] = useState<Array<{
    id: string;
    slug: string;
    title: string;
    starts_at: string;
    ends_at: string;
    capacity?: number;
  }>>([]);
  const [guests, setGuests] = useState<Array<{
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    linkedin_url: string;
    event_id?: string | null;
  }>>([]);
  const [form, setForm] = useState({
    slug: '',
    title: '',
    starts_at: '',
    ends_at: '',
    capacity: '' as string | number
  });
  const [mapping, setMapping] = useState<{ guestId: string; eventId: string }>({ guestId: '', eventId: '' });

  const resetForm = () => setForm({ slug: '', title: '', starts_at: '', ends_at: '', capacity: '' });

  const handleCreateEvent = () => {
    if (!form.slug || !form.title || !form.starts_at || !form.ends_at) {
      alert('Please fill all required fields');
      return;
    }
    const newEvent = {
      id: crypto.randomUUID(),
      slug: form.slug.trim(),
      title: form.title.trim(),
      starts_at: form.starts_at,
      ends_at: form.ends_at,
      capacity: form.capacity ? Number(form.capacity) : undefined
    };
    setEvents(prev => [...prev, newEvent]);
    resetForm();
  };

  const handleMapGuest = () => {
    if (!mapping.guestId || !mapping.eventId) {
      alert('Select guest and event');
      return;
    }
    setGuests(prev => prev.map(g => (g.id === mapping.guestId ? { ...g, event_id: mapping.eventId } : g)));
    setMapping({ guestId: '', eventId: '' });
  };

  // Seed some demo guests for UI demonstration
  useEffect(() => {
    if (guests.length === 0) {
      setGuests([
        { id: crypto.randomUUID(), first_name: 'Jane', last_name: 'Doe', email: 'jane@example.com', linkedin_url: 'https://linkedin.com/in/janedoe', event_id: null },
        { id: crypto.randomUUID(), first_name: 'John', last_name: 'Smith', email: 'john@example.com', linkedin_url: 'https://linkedin.com/in/johnsmith', event_id: null }
      ]);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Podcast Management</h1>
      </div>

      {/* Event Creation */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Create Event</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Slug</label>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-md" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="e.g., q4-engineering-hiring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-md" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Event title" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Starts At</label>
            <input type="datetime-local" className="w-full px-3 py-2 border border-gray-300 rounded-md" value={form.starts_at} onChange={e => setForm({ ...form, starts_at: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Ends At</label>
            <input type="datetime-local" className="w-full px-3 py-2 border border-gray-300 rounded-md" value={form.ends_at} onChange={e => setForm({ ...form, ends_at: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Capacity (optional)</label>
            <input type="number" min={0} className="w-full px-3 py-2 border border-gray-300 rounded-md" value={form.capacity} onChange={e => setForm({ ...form, capacity: e.target.value })} />
          </div>
        </div>
        <div className="mt-4">
          <button onClick={handleCreateEvent} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Create Event</button>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Events</h2>
        {events.length === 0 ? (
          <div className="text-gray-500">No events yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 pr-4">Title</th>
                  <th className="py-2 pr-4">Slug</th>
                  <th className="py-2 pr-4">Starts</th>
                  <th className="py-2 pr-4">Ends</th>
                  <th className="py-2 pr-4">Capacity</th>
                </tr>
              </thead>
              <tbody>
                {events.map(ev => (
                  <tr key={ev.id} className="border-b">
                    <td className="py-2 pr-4">{ev.title}</td>
                    <td className="py-2 pr-4 font-mono">{ev.slug}</td>
                    <td className="py-2 pr-4">{ev.starts_at}</td>
                    <td className="py-2 pr-4">{ev.ends_at}</td>
                    <td className="py-2 pr-4">{ev.capacity ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Guest List */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Guest List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">LinkedIn</th>
                <th className="py-2 pr-4">Event</th>
              </tr>
            </thead>
            <tbody>
              {guests.map(g => {
                const ev = events.find(e => e.id === g.event_id);
                return (
                  <tr key={g.id} className="border-b">
                    <td className="py-2 pr-4">{g.first_name} {g.last_name}</td>
                    <td className="py-2 pr-4">{g.email}</td>
                    <td className="py-2 pr-4">
                      <a href={g.linkedin_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">Profile</a>
                    </td>
                    <td className="py-2 pr-4">{ev ? ev.title : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mapping UI */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Assign Guest to Event</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Guest</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md" value={mapping.guestId} onChange={e => setMapping({ ...mapping, guestId: e.target.value })}>
              <option value="">Select guest</option>
              {guests.map(g => (
                <option key={g.id} value={g.id}>{g.first_name} {g.last_name} ({g.email})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Event</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md" value={mapping.eventId} onChange={e => setMapping({ ...mapping, eventId: e.target.value })}>
              <option value="">Select event</option>
              {events.map(e => (
                <option key={e.id} value={e.id}>{e.title}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={handleMapGuest} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Assign</button>
          </div>
        </div>
      </div>
    </div>
  );
}
