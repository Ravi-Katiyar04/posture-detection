import { useState } from 'react';
import WebcamCapture from '../components/WebcamCapture';
import VideoUploader from '../components/VideoUploader';

export default function Home() {
  const [mode, setMode] = useState('webcam');

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-10 w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
        <button
          onClick={() => setMode('webcam')}
          className={`px-5 py-2 rounded-full font-medium transition-all duration-200 shadow-md flex items-center gap-2 ${
            mode === 'webcam' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
          }`}
        >
          <i className="fas fa-camera"></i> Use Webcam
        </button>
        <button
          onClick={() => setMode('upload')}
          className={`px-5 py-2 rounded-full font-medium transition-all duration-200 shadow-md flex items-center gap-2 ${
            mode === 'upload' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
          }`}
        >
          <i className="fas fa-upload"></i> Upload Video
        </button>
      </div>

      {mode === 'webcam' ? <WebcamCapture /> : <VideoUploader />}
    </div>
  );
}
