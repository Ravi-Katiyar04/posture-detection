# 🧍‍♂️ Posture Detector Web App

An AI-powered real-time posture detection and feedback system using **MediaPipe**, **React**, **Tailwind CSS**, and **Node.js**. This app helps users correct their posture while sitting or squatting by using webcam or uploaded video.

---

## 🚀 Features

- 📸 Real-time posture detection via webcam (MediaPipe)
- 🎞️ Upload video and analyze posture offline
- 🟥 Visual border alerts (green/red) for good/bad posture
- ⚠️ Posture-specific feedback (e.g. "Bad Squat Posture", "Sitting Posture Incorrect")
- ✅ "Good Posture Maintained" confirmation
- 💡 Responsive, user-friendly, and mobile-friendly UI
- 🎨 Built with Tailwind CSS and Font Awesome Icons
- 🧠 Modular posture evaluation logic (rule-based)

---

## 🛠️ Tech Stack

- **Frontend:** [React](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), [Font Awesome](https://fontawesome.com/)
- **Pose Detection:** [MediaPipe Pose](https://google.github.io/mediapipe/solutions/pose.html)
- **Backend:** [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [Multer](https://github.com/expressjs/multer) (for file uploads)
- **Other:** [CORS](https://www.npmjs.com/package/cors), [Nodemon](https://nodemon.io/) (dev)

---
## 📦 Folder Structure

posture-detection/
├── client/ # Frontend (React + Tailwind CSS)
│ ├── src/
│ │ ├── components/ # WebcamCapture, VideoUploader
│ │ ├── pages/ # Home.jsx
│ │ ├── utils/ # postureRules.js
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ ├── public/
│ └── vite.config.js
│
├── server/ # Backend (Express.js)
│ ├── routes/
│ │ └── uploadRoutes.js
│ ├── processors/
│ │ └── analyze_posture.py
│ ├── uploads/ # Uploaded video files
│ ├── app.js
│ └── server.js
│
├── README.md
└── package.json

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```sh
git clone https://github.com/your-username/posture-detection.git
cd posture-detection
```

### 2. Install dependencies

#### For both client and server:

```sh
npm install
```

### 3. Configure environment variables

- Create a `.env` file in the `server` directory.
- Add your environment variables (e.g., `PORT=5000`).
- For file uploads, set `UPLOAD_PATH=uploads`.

### 4. Run the app

#### In one terminal, start the server:

```sh
cd server
nodemon server.js
```

#### In another terminal, start the client:

```sh
cd client
npm run dev
```

### 5. Access the app

- Open your browser and go to `http://localhost:5173` (Vite default).
- For the backend, use `http://localhost:5000` (or your configured port).

---

## 📚 Usage

1. **Webcam Posture Detection:**
   - Allow camera access when prompted.
   - Stand or sit in front of the camera.
   - Receive real-time posture feedback.

2. **Video Upload & Analysis:**
   - Navigate to the video upload section.
   - Upload a video file (max size: 50MB).
   - Wait for the analysis to complete.
   - Review the posture feedback and download the report.

---

## 🐞 Troubleshooting

- **Camera not working:**
  - Ensure no other application is using the camera.
  - Check browser permissions for camera access.

- **Video upload issues:**
  - Ensure the video is in .mp4 or .mov format.
  - Check the file size (max 50MB).

- **Posture feedback not accurate:**
  - Ensure proper lighting and clear visibility of the body.
  - For best results, wear form-fitting clothing.

---

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Make your changes and test them.
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/YourFeature`
6. Create a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Acknowledgments

- Inspired by the need for better posture awareness and correction.
- Leveraged MediaPipe's powerful pose detection capabilities.
- Built with love and care by the developer community.

---

## 📞 Contact

For feedback, suggestions, or inquiries, please contact:

- **Your Name** - [your.email@example.com](mailto:your.email@example.com)
- **GitHub:** [your-username](https://github.com/your-username)

---

Replace `YOUR_VIDEO_ID` and GitHub repo URL with your actual links.
