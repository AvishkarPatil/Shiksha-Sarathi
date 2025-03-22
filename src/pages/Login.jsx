import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login({ darkMode }) {
  const [loginType, setLoginType] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (loginType === 'student' && username === 'student' && password === 'password') ||
      (loginType === 'teacher' && username === 'teacher' && password === 'password')
    ) {
      login({ username, role: loginType });
      navigate('/');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded px-8 pt-6 pb-8 mb-4`}>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4 flex justify-center">
          <button
            className={`mx-2 px-4 py-2 rounded-md ${loginType === 'student' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setLoginType('student')}
          >
            Student
          </button>
          <button
            className={`mx-2 px-4 py-2 rounded-md ${loginType === 'teacher' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setLoginType('teacher')}
          >
            Teacher
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
      <p className={`text-center mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Haven't created an account? Contact your administrator.
      </p>
      <div className={`mt-4 p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-md`}>
        <p className="text-sm">
          <strong>For testing:</strong><br />
          Student login: username "student", password "password"<br />
          Teacher login: username "teacher", password "password"
        </p>
      </div>
    </div>
  );
}

export default Login;