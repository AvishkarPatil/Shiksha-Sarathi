import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SubjectsPage from './pages/Subjects';
import LessonsList from './pages/LessonsList';
import LessonOfTheDay from './pages/LessonOfTheDay';
import Login from './pages/Login';
import LessonDetail from './pages/LessonDetail';
import Scan from './pages/Scan';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AuthProvider>
      <Router>
        <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="container mx-auto px-4 pt-20 pb-8 flex-grow">
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
          <Footer darkMode={darkMode} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
