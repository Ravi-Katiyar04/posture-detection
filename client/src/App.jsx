
import WebcamCapture from './components/WebcamCapture';
import VideoUploader from './components/VideoUploader';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Posture Detection App</h1>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <WebcamCapture />
        <VideoUploader />
      </div>
    </div>
  );
}

export default App;

