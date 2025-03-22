import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X, LogIn, LogOut } from "lucide-react";
import React, { useState, useContext } from "react";

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Static streak count
  const streakCount = 10;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/lesson-of-the-day", label: "LOTD" },
    { href: "/subjects", label: "Subjects" },
    { href: "/scan", label: "Scan QR" },
  ];

  if (user) {
    menuItems.push({ href: "/profile", label: "Profile" });
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
      darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    } shadow-md`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link to="/" className="text-2xl font-bold">
              <span className="text-blue-600 hidden sm:inline">Shiksha</span>
              <span className={`${darkMode ? "text-white" : "text-gray-900"} hidden sm:inline`}>Sarathi</span>
              <span className="sm:hidden">
                <span className="text-blue-600">S</span>
                <span className={darkMode ? "text-white" : "text-gray-900"}>S</span>
              </span>
            </Link>
          </motion.div>
          <nav className="hidden md:flex space-x-1">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className="relative text-sm font-medium transition-colors duration-200 ease-in-out px-4 py-2 group"
                >
                  <span className={`relative z-10 ${darkMode ? "text-gray-300 group-hover:text-white" : "text-gray-600 group-hover:text-gray-900"}`}>
                    {item.label}
                  </span>
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out" />
                </Link>
              </motion.div>
            ))}
          </nav>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            {user && (
              <div className={`hidden md:flex items-center justify-center w-20 h-10 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}>
                <span className="text-lg" role="img" aria-label="fire">🔥</span>
                <span className={`ml-1 text-sm font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>{streakCount}</span>
              </div>
            )}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors duration-200 ${
                darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
            </button>
            {user ? (
              <button
                onClick={handleLogout}
                className={`text-sm font-medium transition-colors duration-200 px-4 py-2 rounded-full ${
                  darkMode 
                    ? "bg-gray-700 text-white hover:bg-gray-600" 
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                <LogOut size={16} className="inline mr-1 sm:mr-0" />
                <span className="hidden sm:inline ml-1">Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className={`inline-flex items-center text-sm font-medium px-4 py-2 rounded-full transition-colors duration-200 ${
                  darkMode
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <LogIn size={16} className="mr-1 sm:mr-0" />
                <span className="hidden sm:inline ml-1">Login</span>
              </Link>
            )}
            <button
              className={`md:hidden p-2 rounded-full transition-colors duration-200 ${
                darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    darkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-700"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={toggleMenu}
                >
                  {item.label}
                </Link>
              ))}
              {user && (
                <div className={`flex items-center px-3 py-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  <span className="text-lg mr-2" role="img" aria-label="fire">🔥</span>
                  <span className="text-sm font-bold">{streakCount} day streak</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
