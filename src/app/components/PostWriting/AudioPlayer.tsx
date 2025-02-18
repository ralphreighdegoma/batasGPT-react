interface AudioPlayerProps {
  audioFile: File;
  onRemove: () => void;
}

export default function AudioPlayer({ audioFile, onRemove }: AudioPlayerProps) {
  return (
    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
      <audio src={URL.createObjectURL(audioFile)} controls className="flex-1" />
      <button
        onClick={onRemove}
        className="p-1 text-red-500 hover:bg-red-50 rounded"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
} 