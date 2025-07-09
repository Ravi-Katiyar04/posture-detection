import { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import axios from 'axios';

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

  const onResults = async (results) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

    if (results.poseLandmarks) {
      drawLandmarks(ctx, results.poseLandmarks);

      try {
        const res = await axios.post('http://localhost:5000/api/pose/analyze', {
          landmarks: results.poseLandmarks,
        });

        const { feedback } = res.data;

        if (feedback && feedback.length > 0) {
          ctx.fillStyle = 'red';
          ctx.font = '16px Arial';
          feedback.forEach((msg, idx) => {
            ctx.fillText(msg, 10, 30 + idx * 20);
          });
        }
      } catch (err) {
        console.error('Failed to analyze posture:', err.message);
      }
    }

    ctx.restore();
  };

  const drawLandmarks = (ctx, landmarks) => {
    ctx.fillStyle = 'green';
    landmarks.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x * 640, point.y * 480, 5, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  return (
    <div className="bg-white shadow-lg p-4 rounded w-full md:w-1/2 relative">
      <h2 className="text-xl font-semibold mb-3">Webcam Pose Detection</h2>
      <Webcam
        ref={webcamRef}
        style={{ display: 'none' }}
        width={640}
        height={480}
        videoConstraints={{ facingMode: 'user' }}
      />
      <canvas ref={canvasRef} width={640} height={480} className="rounded" />
    </div>
  );
}



