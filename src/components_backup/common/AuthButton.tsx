interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function AuthButton({
  variant = 'primary',
  fullWidth = false,
  children,
  icon,
  ...props
}: ButtonProps) {
  const baseClasses = 'flex items-center justify-center rounded-md px-4 py-2.5 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-[#1a2031]';
  
  const variantClasses = {
    primary: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500',
    secondary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    outline: 'bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800 focus:ring-gray-500'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${widthClass}`} {...props}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
