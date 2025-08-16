interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthCard({
  children,
  title,
  subtitle
}: AuthCardProps) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#111827] px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white text-center">Coderfarm</h1>
        <p className="text-gray-400 text-center mt-1">
          Founder-aligned, fit-first hiring for startups
        </p>
      </div>
      <div className="w-full max-w-md bg-[#1a2031] rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
        {subtitle && <p className="text-gray-400 mb-6">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
