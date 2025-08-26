interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export function RadioGroup({
  id,
  options,
  value,
  onChange
}: {
  id: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {options.map(option => (
        <div key={option.value} className="relative">
          <input 
            type="radio" 
            id={`${id}-${option.value}`} 
            name={id} 
            value={option.value} 
            checked={value === option.value} 
            onChange={() => onChange(option.value)} 
            className="peer absolute opacity-0 appearance-none w-full h-full cursor-pointer" 
          />
          <label 
            htmlFor={`${id}-${option.value}`} 
            className="block p-3 border border-gray-700 rounded-md text-sm cursor-pointer bg-[#1a1f35] hover:bg-[#262c4a] peer-checked:border-blue-500 peer-checked:bg-[#1a2645] text-white"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}
