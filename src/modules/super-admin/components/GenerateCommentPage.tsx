import { useState } from 'react';

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
