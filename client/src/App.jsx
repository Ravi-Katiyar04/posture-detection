import Home from './pages/Home';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-blue-50 via-white to-blue-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-5 flex flex-col sm:flex-row items-center justify-between border-b border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 flex items-center gap-3">
          <i className="fas fa-user-check text-blue-600 text-xl sm:text-2xl"></i>
          Posture Detector
        </h1>
        <p className="text-sm text-gray-500 mt-2 sm:mt-0">
          Detecting bad posture in real-time.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 md:px-16 py-10">
        <Home />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 text-sm text-gray-600 text-center py-4 mt-auto">
        <div className="flex flex-col md:flex-row justify-center items-center gap-2">
          <span>&copy; {new Date().getFullYear()} Posture Detector</span>
          <span className="hidden md:inline">|</span>
          <span className="flex items-center gap-1">
            <i className="fas fa-heart text-red-500"></i> Built with care
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;

