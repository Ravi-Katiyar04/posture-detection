import { calculateAngle } from "./calculateAngle";

export function checkPosture(landmarks) {
  const leftKnee = landmarks[25];
  const leftAnkle = landmarks[27];
  const rightShoulder = landmarks[12];
  const rightHip = landmarks[24];
  const rightKnee = landmarks[26];
  const leftShoulder = landmarks[11];
  const nose = landmarks[0];

  const postureFlags = [];

  // 1. Squat posture - Knee shouldn't go beyond toe (approx. check)
  if (leftKnee.x > leftAnkle.x) {
    postureFlags.push("⚠️ Left knee over toe");
  }

  // 2. Squat posture - Back angle
  const backAngle = calculateAngle(rightShoulder, rightHip, rightKnee);
  if (backAngle < 150) {
    postureFlags.push(`⚠️ Back angle < 150° (${Math.round(backAngle)}°)`);
  }

  // 3. Desk posture - Neck bend check
  const neckY = (leftShoulder.y + rightShoulder.y) / 2;
  const neckAngle = Math.abs(nose.y - neckY) * 180; // crude vertical check
  if (neckAngle > 30) {
    postureFlags.push("⚠️ Neck bend > 30°");
  }

  return postureFlags;
}
