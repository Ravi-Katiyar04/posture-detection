import { useEffect, useRef, useState } from 'react';
import { Pose } from '@mediapipe/pose';
import * as cam from '@mediapipe/camera_utils';
import { evaluatePosture } from '../utils/postureRules';

export default function WebcamCapture() {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({ squatBad: false, sittingBad: false });

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults((results) => {
      const landmarks = results.poseLandmarks;
      if (landmarks) {
        const feedback = evaluatePosture(landmarks);
        setStatus(feedback);
      }
    });

    if (videoRef.current) {
      const camera = new cam.Camera(videoRef.current, {
        onFrame: async () => {
          await pose.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  const isBadPosture = status.squatBad || status.sittingBad;
  const borderColorClass = isBadPosture ? 'border-red-500' : 'border-green-500';

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
        <i className="fas fa-camera text-green-500"></i>
        Live Webcam Posture Monitor
      </h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={`w-full rounded-lg border-4 ${borderColorClass}`}
      />

      <div className="mt-4 space-y-3">
        {status.squatBad && (
          <div className="p-3 bg-red-100 text-red-800 rounded-lg flex items-center gap-3 shadow-sm">
            <i className="fas fa-running"></i>
            <span>⚠️ Bad Squat Posture Detected</span>
          </div>
        )}

        {status.sittingBad && (
          <div className="p-3 bg-yellow-100 text-yellow-800 rounded-lg flex items-center gap-3 shadow-sm">
            <i className="fas fa-chair"></i>
            <span>⚠️ Sitting Posture Incorrect</span>
          </div>
        )}

        {!status.squatBad && !status.sittingBad && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg flex items-center gap-3 shadow-sm">
            <i className="fas fa-smile-beam"></i>
            <span>✅ Good Posture Maintained</span>
          </div>
        )}
      </div>
    </div>
  );
}


