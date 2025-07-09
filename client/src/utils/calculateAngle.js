export function calculateAngle(a, b, c) {
  const radians =
    Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = (radians * 180.0) / Math.PI;
  if (angle < 0) angle += 360;
  return angle;
}
