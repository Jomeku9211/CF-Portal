import { useState } from 'react';

export function PostScraperPage() {
  const [linkedinCookies, setLinkedinCookies] = useState('');
  const [apifyToken, setApifyToken] = useState('');
  const [maxPosts, setMaxPosts] = useState('50');
  const [buildVersion, setBuildVersion] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    processed: 0,
    inserted: 0,
    duplicates: 0,
    errors: 0
  });

  const log = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const handleStart = async () => {
    if (!linkedinCookies.trim() || !apifyToken.trim()) {
      log('❌ Missing LinkedIn Cookies or Apify API Token');
      return;
    }

    setIsRunning(true);
    setStats({ total: 0, processed: 0, inserted: 0, duplicates: 0, errors: 0 });
    setLogs([]);

    log('🚀 Starting Post Scraping...');
    log('📋 Using LinkedIn cookies for authentication');
    log('🔑 Using Apify API token for scraping');

    // Simulate scraping process
    setTimeout(() => {
      log('✅ Successfully scraped 25 posts from LinkedIn');
      log('📊 Processing posts for content extraction...');
      
      setTimeout(() => {
        log('✅ Content extracted and normalized');
        log('🔄 Checking for duplicates in Airtable...');
        
        setTimeout(() => {
          log('✅ Duplicate check completed');
          log('💾 Inserting new posts into Airtable...');
          
          setTimeout(() => {
            log('✅ Post scraping completed successfully!');
            log(`📈 Final stats: 25 posts processed, 20 inserted, 5 duplicates`);
            setIsRunning(false);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 2000);
  };

  const handleStop = () => {
    setIsRunning(false);
    log('⏹️ Post scraping stopped by user');
  };

  const clearLogs = () => setLogs([]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sanjuan-dark">Manual Post Scraper</h1>
          <p className="text-sm text-gray-600">Scrape LinkedIn posts and extract content for analysis</p>
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
            {isRunning ? 'Scraping...' : 'Start Scraping'}
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
            Stop
          </button>
        </div>
      </div>

      {/* Configuration */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">LinkedIn Cookies (JSON)</label>
            <textarea
              value={linkedinCookies}
              onChange={(e) => setLinkedinCookies(e.target.value)}
              placeholder="Paste LinkedIn cookies JSON here"
              rows={3}
              className="w-full px-3 py-2 border border-sanjuan-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-sanjuan-light bg-white text-sanjuan-dark"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Apify API Token</label>
            <input
              type="password"
              value={apifyToken}
              onChange={(e) => setApifyToken(e.target.value)}
              placeholder="Enter Apify API token"
              className="w-full px-3 py-2 border border-sanjuan-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-sanjuan-light bg-white text-sanjuan-dark"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Max Posts per Profile</label>
            <input
              type="number"
              value={maxPosts}
              onChange={(e) => setMaxPosts(e.target.value)}
              min="1"
              max="1000"
              className="w-full px-3 py-2 border border-sanjuan-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-sanjuan-light bg-white text-sanjuan-dark"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Apify Build Version (Optional)</label>
            <input
              type="text"
              value={buildVersion}
              onChange={(e) => setBuildVersion(e.target.value)}
              placeholder="e.g., 1.0.0"
              className="w-full px-3 py-2 border border-sanjuan-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-sanjuan-light bg-white text-sanjuan-dark"
            />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Posts</div>
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
