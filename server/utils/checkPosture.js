function calculateAngle(a, b, c) {
  const radians =
    Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = (radians * 180.0) / Math.PI;
  if (angle < 0) angle += 360;
  return angle;
}

function checkPosture(landmarks) {
  const leftHip = landmarks[23];
  const leftKnee = landmarks[25];
  const leftAnkle = landmarks[27];
  const rightShoulder = landmarks[12];
  const rightHip = landmarks[24];
  const rightKnee = landmarks[26];

  const postureFlags = [];

  if (leftKnee.x > leftAnkle.x) {
    postureFlags.push('⚠️ Left knee over toe');
  }

  const backAngle = calculateAngle(rightShoulder, rightHip, rightKnee);
  if (backAngle < 150) {
    postureFlags.push(`⚠️ Back angle < 150° (${Math.round(backAngle)}°)`);
  }

  const nose = landmarks[0];
  const leftShoulder = landmarks[11];
  const neckX = (leftShoulder.x + rightShoulder.x) / 2;
  const neckY = (leftShoulder.y + rightShoulder.y) / 2;

  const neckAngle = Math.abs(nose.y - neckY) * 180;
  if (neckAngle > 30) {
    postureFlags.push(`⚠️ Neck bend > 30°`);
  }

  return postureFlags;
}

export default { checkPosture };
