import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Scan from './pages/Scan';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SubjectsPage from './pages/Subjects';
import LessonsList from './pages/LessonsList';
import LessonOfTheDay from './pages/LessonOfTheDay';
import LessonDetail from './pages/LessonDetail';
import { AuthProvider } from './context/AuthContext';

import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AuthProvider>
      <Router>
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="container mx-auto px-4 pt-20 pb-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/scan" element={<Scan />} />
              <Route path="/subjects" element={<SubjectsPage />} />
              <Route path="/subject/:id" element={<LessonsList darkMode={darkMode} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
              <Route path="/lesson-of-the-day" element={<LessonOfTheDay darkMode={darkMode} />} />
              <Route path="/lesson/:id" element={<LessonDetail darkMode={darkMode} />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;