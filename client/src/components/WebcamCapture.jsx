
import { useRef } from 'react';
import Webcam from 'react-webcam';

export default function WebcamCapture() {
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log('Captured frame:', imageSrc);
    // Send to backend or run detection
  };

  return (
    <div className="bg-white shadow-lg p-4 rounded w-full md:w-1/2">
      <h2 className="text-xl font-semibold mb-3">Webcam Mode</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="rounded mb-3 w-full"
      />
      <button onClick={capture} className="bg-blue-600 text-white px-4 py-2 rounded">
        Capture Frame
      </button>
    </div>
  );
}
