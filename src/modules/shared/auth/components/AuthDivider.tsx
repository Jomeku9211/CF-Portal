export function AuthDivider({
  text
}: {
  text: string;
}) {
  return (
    <div className="flex items-center my-6">
      <div className="flex-grow border-t border-gray-700"></div>
      <span className="mx-4 text-sm text-gray-400">{text}</span>
      <div className="flex-grow border-t border-gray-700"></div>
    </div>
  );
}
