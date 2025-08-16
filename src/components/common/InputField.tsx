export function InputField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
  ...props
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-300">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 bg-[#1e293b] border border-[#2a3344] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all duration-200"
        {...props}
      />
    </div>
  );
}
