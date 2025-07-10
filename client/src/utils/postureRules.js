export function evaluatePosture(poseLandmarks) {
  if (!poseLandmarks) return { squatBad: false, sittingBad: false };

  const hip = poseLandmarks[24];        // Right hip
  const knee = poseLandmarks[26];       // Right knee
  const ankle = poseLandmarks[28];      // Right ankle
  const shoulder = poseLandmarks[12];   // Right shoulder
  const ear = poseLandmarks[8];         // Right ear

  // Rule 1: Knee over toe in squat (x-axis comparison)
  const kneeAheadOfToe = knee.x > ankle.x;

  // Rule 2: Back angle too sharp (hip-shoulder-knee angle)
  const backAngle = getAngle(shoulder, hip, knee);
  const backTooBent = backAngle < 150;

  // Rule 3: Neck bend based on ear vs shoulder (y-axis)
  const neckBend = Math.abs(ear.y - shoulder.y);
  const neckBent = neckBend > 0.3;

  return {
    squatBad: kneeAheadOfToe || backTooBent,
    sittingBad: neckBent || backTooBent
  };
}

// Helper: Angle between 3 points (in degrees)
function getAngle(a, b, c) {
  const ab = { x: a.x - b.x, y: a.y - b.y };
  const cb = { x: c.x - b.x, y: c.y - b.y };

  const dot = ab.x * cb.x + ab.y * cb.y;
  const magAB = Math.sqrt(ab.x ** 2 + ab.y ** 2);
  const magCB = Math.sqrt(cb.x ** 2 + cb.y ** 2);

  const cosine = dot / (magAB * magCB);
  return Math.acos(cosine) * (180 / Math.PI);
}

