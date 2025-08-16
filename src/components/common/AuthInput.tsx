interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export function AuthInput({
  label,
  error,
  icon,
  ...props
}: InputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-1.5">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input 
          className={`w-full rounded-md bg-[#232939] border ${
            error ? 'border-red-500' : 'border-gray-700'
          } px-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
            icon ? 'pl-10' : ''
          }`} 
          {...props} 
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
