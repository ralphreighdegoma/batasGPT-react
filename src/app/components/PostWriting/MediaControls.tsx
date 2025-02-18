import { useRef } from 'react';

interface MediaControlsProps {
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAudioSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  isRecording: boolean;
  audioFile: File | null;
  selectedImagesCount: number;
}

export default function MediaControls({
  onImageSelect,
  onAudioSelect,
  onStartRecording,
  onStopRecording,
  isRecording,
  audioFile,
  selectedImagesCount
}: MediaControlsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onImageSelect}
        accept="image/*"
        multiple
        className="hidden"
      />
      <input 
        type="file"
        ref={audioInputRef}
        onChange={onAudioSelect}
        accept="audio/*"
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={selectedImagesCount >= 5}
        className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
        title={selectedImagesCount >= 5 ? 'Max images reached' : 'Add Images'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

    </>
  );
} 