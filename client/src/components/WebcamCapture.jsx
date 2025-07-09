
import { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';

export default function WebcamCapture() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null
    ) {
      const pose = new Pose({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });

      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      pose.onResults(onResults);

      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          await pose.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  const onResults = (results) => {
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext('2d');

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    if (results.poseLandmarks) {
      drawLandmarks(canvasCtx, results.poseLandmarks);
    }
    canvasCtx.restore();
  };

  const drawLandmarks = (ctx, landmarks) => {
    ctx.fillStyle = 'red';
    landmarks.forEach((landmark) => {
      ctx.beginPath();
      ctx.arc(landmark.x * 640, landmark.y * 480, 5, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  return (
    <div className="bg-white shadow-lg p-4 rounded w-full md:w-1/2 relative">
      <h2 className="text-xl font-semibold mb-3">Webcam Mode (with Pose Detection)</h2>
      <Webcam
        ref={webcamRef}
        style={{ display: 'none' }}
        width={640}
        height={480}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: 'user' }}
      />
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="rounded"
      />
    </div>
  );
}

