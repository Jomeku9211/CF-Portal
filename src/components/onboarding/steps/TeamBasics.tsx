import { HelpCircleIcon } from 'lucide-react';
import { Tooltip } from '../../common/Tooltip';

interface TeamBasicsProps {
  teamTitle: string;
  onChange: (field: string | number | symbol, value: string) => void;
  error?: string;
}

export function TeamBasics({ teamTitle, onChange, error }: TeamBasicsProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center mb-1">
          <label htmlFor="teamTitle" className="block text-sm font-medium text-white">
            Team Title <span className="text-red-500">*</span>
          </label>
          <Tooltip content="Give your team a clear, descriptive name that reflects its function or purpose">
            <HelpCircleIcon className="w-4 h-4 text-gray-400 ml-1 cursor-help" />
          </Tooltip>
        </div>
        <input 
          type="text" 
          id="teamTitle" 
          value={teamTitle} 
          onChange={e => onChange('teamTitle', e.target.value)} 
          placeholder="e.g., Product Design Team, Core Backend, Marketing & Growth" 
          className="w-full bg-[#1a2234] border border-gray-700 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
}
