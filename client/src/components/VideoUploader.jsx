import { useState } from 'react';

export default function VideoUploader() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadedUrl(null);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a video file');
      return;
    }

    const formData = new FormData();
    formData.append('video', file);

    try {
      setUploading(true);
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setUploadedUrl(`http://localhost:5000${data.filePath}`);
        setError('');
      } else {
        setError('Upload failed');
      }
    } catch (err) {
      console.error(err);
      setError('Upload error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <i className="fas fa-upload text-blue-500"></i>
        Upload Posture Video
      </h2>

      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="mb-3 block w-full text-sm"
      />

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {uploading ? 'Uploading...' : 'Upload Video'}
      </button>

      {uploadedUrl && (
        <div className="mt-4 text-green-700 text-sm">
          ✅ Uploaded successfully!{' '}
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noreferrer"
            className="underline text-blue-600"
          >
            View Video
          </a>
        </div>
      )}

      {error && (
        <div className="mt-3 text-red-600 text-sm">
          ❌ {error}
        </div>
      )}
    </div>
  );
}
