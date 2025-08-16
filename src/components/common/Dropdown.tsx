interface DropdownOption {
  value: string;
  label: string;
}

export function Dropdown({
  id,
  options,
  value,
  onChange
}: {
  id: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <select 
      id={id} 
      value={value} 
      onChange={e => onChange(e.target.value)} 
      className="w-full bg-[#1a1f35] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
