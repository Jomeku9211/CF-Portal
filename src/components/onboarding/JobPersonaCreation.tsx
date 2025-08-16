import { CheckCircleIcon, ArrowRightIcon } from 'lucide-react';

interface JobPersonaCreationProps {
  formData: any;
  updateFormData: (section: string, data: any) => void;
  onComplete: () => void;
}

export function JobPersonaCreation({ onComplete }: JobPersonaCreationProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
        <CheckCircleIcon className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-2xl font-bold mb-4 text-white">Job Persona Creation</h2>
      <p className="text-gray-400 text-center mb-8">
        This step will contain detailed job persona creation forms.
        <br />
        For now, this is a placeholder component.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
        <button 
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium flex items-center justify-center transition-colors" 
          onClick={onComplete}
        >
          Continue
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}
