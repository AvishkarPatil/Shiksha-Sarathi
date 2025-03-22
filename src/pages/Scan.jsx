import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import QrReader from 'react-qr-reader-es6';
import jsQR from 'jsqr';
import lessonData from '../data/lessonData.json';

function Scan({ darkMode }) {
  const [activeTab, setActiveTab] = useState('camera');
  const [result, setResult] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      processQRCode(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          processQRCode(code.data);
        } else {
          setResult({ error: 'No QR code found in the image' });
        }
      };
      img.src = e.target.result;
      setUploadedImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const processQRCode = (data) => {
  console.log("QR Code data:", data); // Debug log

  const lessonId = data.trim(); // Remove any whitespace
  console.log("Lesson ID:", lessonId); // Debug log
  console.log("Available lesson keys:", Object.keys(lessonData)); // Debug log

  const lesson = lessonData[lessonId];
  if (lesson) {
    console.log("Lesson found:", lesson); // Debug log
    setResult({ lessonId: lessonId, title: lesson.title });
  } else {
    console.log("Lesson not found for id:", lessonId); // Debug log
    setResult({ error: `Lesson not found in data for id: ${lessonId}` });
  }
};

  const goToLesson = () => {
    if (result && result.lessonId) {
      navigate(`/lesson/${result.lessonId}`);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Scan QR Code</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="flex mb-4">
            <button
              className={`flex-1 py-3 px-4 text-center transition-colors duration-200 ${
                activeTab === 'camera'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveTab('camera')}
            >
              Camera
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center transition-colors duration-200 ${
                activeTab === 'upload'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveTab('upload')}
            >
              Upload Image
            </button>
          </div>

          <div className="p-4">
            {activeTab === 'camera' && (
              <div className="relative">
                <QrReader
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: '100%' }}
                />
                <div className="absolute inset-0 border-2 border-blue-500 opacity-50 pointer-events-none"></div>
              </div>
            )}

            {activeTab === 'upload' && (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition-colors duration-200"
                >
                  Upload Image
                </button>
                {uploadedImage && (
                  <div className="mt-4">
                    <img src={uploadedImage} alt="Uploaded" className="max-w-full h-auto rounded" />
                  </div>
                )}
              </div>
            )}

            {result && (
              <div className="mt-8 text-center">
                {result.error ? (
                  <p className="text-red-500">{result.error}</p>
                ) : (
                  <div className="bg-green-100 dark:bg-green-800 p-4 rounded-lg">
                    <h3 className="text-2xl font-bold mb-2 text-green-800 dark:text-green-200">
                      {result.title}
                    </h3>
                    <p className="text-green-700 dark:text-green-300 mb-4">
                      QR Code detected successfully!
                    </p>
                    <button
                      onClick={goToLesson}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded transition-colors duration-200"
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scan;