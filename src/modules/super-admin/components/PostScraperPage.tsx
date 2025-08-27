import { useState } from 'react';

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
