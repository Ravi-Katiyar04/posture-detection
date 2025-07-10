
import sys
import json
import cv2
import numpy as np
import mediapipe as mp
import os
from math import degrees, acos

mp_pose = mp.solutions.pose

def get_angle(a, b, c):
    """Calculate angle ABC (in degrees) from 3 points."""
    a, b, c = np.array(a), np.array(b), np.array(c)
    ab, cb = a - b, c - b
    dot = np.dot(ab, cb)
    norm = np.linalg.norm(ab) * np.linalg.norm(cb)
    if norm == 0:
        return 0
    angle = degrees(acos(dot / norm))
    return angle

def analyze_pose_from_video(video_path):
    if not os.path.exists(video_path):
        return { "status": "error", "message": f"File not found: {video_path}" }

    cap = cv2.VideoCapture(video_path)
    pose = mp_pose.Pose()
    squat_flags, sitting_flags = [], []

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        result = pose.process(frame_rgb)

        if result.pose_landmarks:
            lm = result.pose_landmarks.landmark

            def get_landmark(name):
                return [lm[getattr(mp_pose.PoseLandmark, name)].x,
                        lm[getattr(mp_pose.PoseLandmark, name)].y]

            try:
                # Squat: Knee over toe
                ankle = get_landmark("LEFT_ANKLE")
                knee = get_landmark("LEFT_KNEE")
                toe = get_landmark("LEFT_FOOT_INDEX")

                # Check: Knee should not be ahead of toe in X-direction (when squatting sideways)
                knee_ahead = knee[0] > toe[0]
                squat_flags.append(knee_ahead)

                # Back angle: Shoulder-Hip-Knee angle
                shoulder = get_landmark("LEFT_SHOULDER")
                hip = get_landmark("LEFT_HIP")
                back_angle = get_angle(shoulder, hip, knee)
                squat_flags.append(back_angle < 150)

                # Sitting: Neck bend & back straight
                ear = get_landmark("LEFT_EAR")
                neck_angle = get_angle(shoulder, ear, [ear[0], ear[1] - 0.1])  # relative to vertical
                sitting_flags.append(neck_angle > 30)

                # Back straight: Shoulder-Hip-Knee near 180°
                sitting_flags.append(back_angle < 165)

            except Exception as e:
                print("Error calculating angles:", e, file=sys.stderr)

    cap.release()

    squatBad = any(squat_flags)
    sittingBad = any(sitting_flags)

    if squatBad and sittingBad:
        message = "⚠️ Both squat and sitting posture are incorrect"
    elif squatBad:
        message = "⚠️ Bad squat posture detected in uploaded video"
    elif sittingBad:
        message = "⚠️ Sitting posture incorrect in video"
    else:
        message = "✅ Good posture maintained in uploaded video"

    return {
        "status": "analyzed",
        "squatBad": squatBad,
        "sittingBad": sittingBad,
        "message": message
    }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({
            "status": "error",
            "message": "Missing video path"
        }))
        sys.exit(1)

    path = sys.argv[1]
    result = analyze_pose_from_video(path)
    print(json.dumps(result))
