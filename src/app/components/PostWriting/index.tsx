import { toast } from 'react-hot-toast';
import ImagePreview from './ImagePreview';
import AudioPlayer from './AudioPlayer';
import MediaControls from './MediaControls';
import { useState, useRef, useEffect } from 'react';
import TagsComponent from '../TagsComponent';
import { useAuth } from "../../../context/AuthContext";


interface PostWritingProps {
  onSubmit: (content: string, images?: File[], audio?: File) => Promise<void>;
}
interface Tag {
  id: string;
  name: string;
}

export default function PostWriting({ onSubmit }: PostWritingProps) {
  const [postContent, setPostContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const [showTags, setShowTags] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [linkPreview, setLinkPreview] = useState<string | null>(null);
  const { authToken } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setPostContent(content);
    checkForLinks(content);
  };

  const checkForLinks = async (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = text.match(urlRegex);
    if (matches && matches.length > 0) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/og-image?url=${encodeURIComponent(matches[0])}`, {
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });
        const data = await response.json();
        if (data.ogImage) {
          setLinkPreview(data.ogImage);
          return;
        }
      } catch (error) {
        try {
          const response = await fetch(matches[0]);
          const html = await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          
          // Try to find OpenGraph image
          const ogImage = doc.querySelector('meta[property="og:image"]');
          if (ogImage && ogImage.getAttribute('content')) {
            setLinkPreview(ogImage.getAttribute('content'));
          } else {
            // Fallback to first image in the page
            const firstImage = doc.querySelector('img');
            if (firstImage && firstImage.getAttribute('src')) {
              setLinkPreview(firstImage.getAttribute('src'));
            }
          }
        } catch (error) {
          console.error('Error fetching link preview:', error);
          setLinkPreview(null);
        }
      }
    } else {
      setLinkPreview(null);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 5) {
      alert('You can only upload up to 5 images');
      return;
    }
    setSelectedImages(files);
  };

  const handleAudioSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const file = new File([blob], 'recording.webm', { type: 'audio/webm' });
        setAudioFile(file);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      toast.error('Could not access microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      // Stop all audio tracks
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveAudio = () => {
    setAudioFile(null);
  };

  const handlePost = async () => {
    if (!postContent.trim() && selectedImages.length === 0) {
      toast.error('content is required.');
      return;
    }
    
    setIsLoading(true);
    try {
      await onSubmit(postContent, selectedImages, audioFile || undefined, selectedTags);
      setPostContent('');
      setSelectedImages([]);
      setAudioFile(null);
      setLinkPreview(null);
    } catch (error) {
      console.error('Failed to post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagsChange = (tags: Tag[]) => {
    console.log('Selected tags:', tags);
    setSelectedTags(tags);
  };

  return (
    <div className="mb-4 space-y-3">
      <div>
      <textarea
        value={postContent}
        onChange={(e) => handleInputChange(e)}
        onPaste={(e) => {
          e.preventDefault();
          const text = e.clipboardData.getData('text/plain');
          const target = e.target as HTMLTextAreaElement;
          const start = target.selectionStart;
          const end = target.selectionEnd;
          const currentValue = target.value;
          const newValue = currentValue.substring(0, start) + text + currentValue.substring(end);
          handleInputChange({ target: { value: newValue } } as React.ChangeEvent<HTMLTextAreaElement>);
        }}
        placeholder="Share something..."
        className="w-full text-sm p-4 rounded-lg focus:outline-none focus:ring-0 min-h-[200px] bg-white/50 transition-all duration-200 overflow-auto resize-none"
        role="textbox"
        aria-multiline="true"
      />
        
        {linkPreview && (
          <div className="mt-2 relative">
            <img 
              src={linkPreview} 
              alt="Link preview"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              onClick={() => setLinkPreview(null)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-shadow"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        
        <div className="mt-4">
          <div className="flex items-center mb-2">
              <MediaControls
              onImageSelect={handleImageSelect}
              onAudioSelect={handleAudioSelect}
              onStartRecording={startRecording}
              onStopRecording={stopRecording}
              isRecording={isRecording}
              audioFile={audioFile}
              selectedImagesCount={selectedImages.length}
            />
            
          </div>
        </div>
      </div>

      {selectedImages.length > 0 && (
        <ImagePreview 
          images={selectedImages} 
          onRemove={handleRemoveImage} 
        />
      )}

      <div className="flex gap-2">
        <button
          onClick={handlePost}
          disabled={isLoading}
          className={`flex-1 py-1.5 px-4 bg-blue-600 text-white text-sm rounded-lg font-medium transition-all duration-200 text-sm ${
            isLoading 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-blue-700 hover:shadow-sm active:transform active:scale-[0.99]'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center text-sm">
              <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
              <span className="text-sm">Publishing...</span>
            </div>
          ) : (
            'Share Post'
          )}
        </button>
      </div>

    </div>
  );
} 