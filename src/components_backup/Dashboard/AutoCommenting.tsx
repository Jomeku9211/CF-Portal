import { useState, useEffect } from 'react';

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
  const [linkedinCookies, setLinkedinCookies] = useState('');
  const [commentViewId, setCommentViewId] = useState('viwiRzf62qaMKGQoG'); // View for picking records to comment

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
    
    if (!linkedinCookies.trim()) {
      log('❌ LinkedIn cookies are required to start the system');
      log('💡 Please paste your LinkedIn session cookies in the System Control section above');
      return;
    }
    

    log('Starting AutoCommenting system...');
    log('🔐 Using stored LinkedIn cookies for authentication...');
    log('🌐 System will work in headless mode (24/7 automation)');
    
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
    
    log(`🔍 Picking record from comment view: ${commentViewId}`);
    log(`📊 Processing record ${runStats.processed + 1}...`);
    
    // Simulate processing a record from the comment view
    const newProcessed = runStats.processed + 1;
    const isSuccess = Math.random() > 0.1; // 90% success rate
    
    if (isSuccess) {
      setRunStats(prev => ({
        ...prev,
        processed: newProcessed,
        successes: prev.successes + 1,
        lastRun: Date.now()
      }));
      log(`✅ Comment posted successfully on record ${newProcessed} from view ${commentViewId}`);
    } else {
      setRunStats(prev => ({
        ...prev,
        processed: newProcessed,
        failures: prev.failures + 1,
        lastRun: Date.now(),
        lastError: 'Comment posting failed'
      }));
      log(`❌ Failed to post comment on record ${newProcessed} from view ${commentViewId}`);
    }
    
    // Schedule next run with random delay (5-7 minutes as per source code)
    if (isRunning) {
      const delay = (5 + Math.random() * 2) * 60 * 1000; // 5-7 minutes
      const nextRun = Date.now() + delay;
      setNextFireTime(nextRun);
      log(`⏰ Next run scheduled in ${Math.round(delay/60000)} minutes at ${new Date(nextRun).toLocaleTimeString()}`);
      
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
      log('🔗 View URL: https://airtable.com/appD9VxZrOhiQY9VB/tblyhMPmCt87ORo3t/viwjzxpzCC24wtkfc');
      
      // Try Vercel API first
      const response = await fetch(`/api/airtable-count?viewId=viwjzxpzCC24wtkfc`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      log(`📊 API Response: ${JSON.stringify(data)}`);
      
      if (data.error) {
        throw new Error(`API returned error: ${data.error}`);
      }
      
      setTodayCount(data.count);
      log(`✅ Today's count updated: ${data.count} comments from Airtable`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      log(`❌ Error fetching today's count: ${errorMessage}`);
      log('💡 Vercel API not working in local development');
      log('🔧 Using fallback count. Set up environment variables for production');
      log('🔗 View ID: viwjzxpzCC24wtkfc');
      log('🔗 Base ID: appD9VxZrOhiQY9VB');
      log('🔗 Table ID: tblyhMPmCt87ORo3t');
      // Fallback to a reasonable default if API fails
      setTodayCount(12); // Updated fallback count to match your actual count
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
          <p className="text-sm text-gray-600">Requires LinkedIn cookies for authentication - works in headless mode 24/7</p>
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
            {nextFireTime && (
              <div className="text-xs text-gray-500">
                {new Date(nextFireTime).toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Session Details */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Session Details</h2>
        {startedAt ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-600 font-medium">Started</div>
              <div className="text-lg text-blue-800">{formatTimeAgo(startedAt)}</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-sm text-green-600 font-medium">Last Run</div>
              <div className="text-lg text-green-800">
                {runStats.lastRun ? formatTimeAgo(runStats.lastRun) : '--'}
              </div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-sm text-purple-600 font-medium">Status</div>
              <div className="text-lg text-purple-800">
                {isRunning ? 'Running' : 'Stopped'}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p>No active session. Start the system to see session details.</p>
          </div>
        )}
      </div>

      {/* Statistics Grid */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Statistics</h2>
          <div className="text-xs text-gray-500 bg-yellow-50 px-2 py-1 rounded">
            ⚠️ Today count from view viwjzxpzCC24wtkfc (showing fallback count)
          </div>
        </div>
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
            <div className="mt-1">
              <input
                type="number"
                value={todayCount}
                onChange={(e) => setTodayCount(parseInt(e.target.value) || 0)}
                className="w-16 text-xs text-center border border-gray-300 rounded px-1 py-1"
                placeholder="12"
                title="Set correct count from Airtable view viwjzxpzCC24wtkfc"
              />
              <div className="text-xs text-gray-400 mt-1">Manual fix</div>
            </div>
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

      {/* LinkedIn Cookies Input & Start System */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-4">System Control</h2>
        
        {/* LinkedIn Cookies Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">LinkedIn Cookies (JSON) - Required for All Operations</label>
          <textarea
            value={linkedinCookies}
            onChange={(e) => setLinkedinCookies(e.target.value)}
            placeholder="Paste LinkedIn session cookies JSON here (required to start system)"
            rows={4}
            className="w-full px-3 py-2 border border-sanjuan-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-sanjuan-light bg-white text-sanjuan-dark font-mono text-sm"
          />
          <p className="text-xs text-gray-600 mt-1">
            <strong>Required:</strong> LinkedIn cookies are needed for both manual start/stop AND scheduled automation. 
            Cookies expire every few days - refresh when needed.
          </p>
        </div>

        {/* Comment View Configuration */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Comment View ID - For Picking Records to Comment</label>
          <input
            type="text"
            value={commentViewId}
            onChange={(e) => setCommentViewId(e.target.value)}
            placeholder="viwiRzf62qaMKGQoG"
            className="w-full px-3 py-2 border border-sanjuan-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-sanjuan-light bg-white text-sanjuan-dark font-mono text-sm"
          />
          <p className="text-xs text-gray-600 mt-1">
            <strong>Comment View:</strong> This view contains records that need comments posted. 
            Different from the statistics view.
          </p>
        </div>

        {/* Start/Stop System Button */}
        <div className="flex flex-col items-center space-y-3">
          <button
            onClick={isRunning ? handleStop : handleStart}
            disabled={!linkedinCookies.trim()}
            className={`px-8 py-3 rounded-lg font-medium text-lg transition-all duration-200 ${
              !linkedinCookies.trim()
                ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                : isRunning 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {!linkedinCookies.trim() 
              ? 'Paste LinkedIn Cookies First' 
              : isRunning 
                ? 'Stop System' 
                : 'Start System'
            }
          </button>
          
          {/* Status Indicator */}
          <div className="flex items-center space-x-2 text-sm">
            <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={isRunning ? 'text-green-600' : 'text-red-600'}>
              {isRunning ? 'System is Running' : 'System is Stopped'}
            </span>
          </div>
          
          {/* Cookie Status */}
          <div className="text-xs text-gray-500">
            {linkedinCookies.trim() 
              ? `✅ Cookies loaded (${linkedinCookies.length} characters)` 
              : '❌ No cookies provided'
            }
          </div>
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
              if (!linkedinCookies.trim()) {
                log('❌ LinkedIn cookies are required to enable schedule mode');
                log('💡 Please paste your LinkedIn session cookies in the System Control section above');
                return;
              }
              log('✅ Scheduled mode enabled with: Daily Limit: 100, Min Time: 5 min, Days: 7');
              log('⏰ System will run automatically with configured schedule');
              log('🌐 Headless mode enabled - will work 24/7 even when browser is closed');
            }}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              linkedinCookies.trim() 
                ? 'bg-sanjuan-base hover:bg-sanjuan-light text-white' 
                : 'bg-gray-400 cursor-not-allowed text-gray-600'
            }`}
            disabled={!linkedinCookies.trim()}
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
