export default function Loader({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-4 mt-10 justify-center ${className}`}>
      <div className="w-2 h-2 animate-ping rounded-full bg-gray-500" />
      <div className="w-2 h-2 animate-ping rounded-full bg-gray-500" />
      <div className="w-2 h-2 animate-ping rounded-full bg-gray-500" />
    </div>
  );
}
