import { useState } from 'react';

export function GenerateCommentPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const log = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const handleStart = async () => {
    setIsRunning(true);
    setLogs([]);

    log('🚀 Starting Comment Generation...');
    log('📋 Reading from Airtable view: viwebNLgwgr4hzMHJ');
    log('🔍 Looking for records with Post Text and firstName fields...');

    // Simulate the comment generation process
    setTimeout(() => {
      log('✅ Found 15 records to process');
      log('🤖 Using pre-configured OpenAI Assistant for comment generation');
      
      setTimeout(() => {
        log('📝 Generating personalized comments...');
        log('💬 Using post text and first name for personalization');
        
        setTimeout(() => {
          log('✅ Successfully generated 12 comments');
          log('❌ 3 records failed (missing required fields)');
          log('💾 Updating Airtable with generated comments...');
          
          setTimeout(() => {
            log('✅ Comment generation completed successfully!');
            log('📈 Final stats: 15 processed, 12 generated, 3 failed');
            setIsRunning(false);
          }, 1000);
        }, 2000);
      }, 1000);
    }, 1000);
  };

  const handleStop = () => {
    setIsRunning(false);
    log('⏹️ Comment generation stopped by user');
  };

  const clearLogs = () => setLogs([]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sanjuan-dark">Generate Comment</h1>
          <p className="text-sm text-gray-600">Fully pre-configured - just click start to begin comment generation</p>
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
            {isRunning ? 'Generating...' : 'Start Generation'}
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

      {/* Configuration Info */}
      <div className="bg-sanjuan-lightest rounded-lg shadow p-6 border border-sanjuan-lighter text-sanjuan-dark">
        <h2 className="text-xl font-semibold mb-4">Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Airtable View ID</label>
            <input
              type="text"
              value="viwebNLgwgr4hzMHJ"
              readOnly
              className="w-full px-3 py-2 border border-sanjuan-lighter rounded-md bg-gray-100 text-sanjuan-dark font-mono text-sm"
            />
            <p className="text-xs text-gray-600 mt-1">Pre-configured view for comment generation</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Required Fields</label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="text-sm">Post Text</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="text-sm">firstName</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-1">These fields are required for comment generation</p>
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
            <div className="text-gray-500">No logs yet. Start generation to see activity.</div>
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
