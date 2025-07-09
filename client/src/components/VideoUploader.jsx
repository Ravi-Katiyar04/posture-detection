
import { useState } from 'react';

export default function VideoUploader() {
  const [videoURL, setVideoURL] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoURL(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-white shadow-lg p-4 rounded w-full md:w-1/2">
      <h2 className="text-xl font-semibold mb-3">Upload Video</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {videoURL && (
        <video src={videoURL} controls className="mt-4 w-full rounded" />
      )}
    </div>
  );
}
