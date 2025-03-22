import React from 'react';

const Footer = ({ darkMode }) => {
  return (
    <footer className={`py-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="container mx-auto px-4">
        <p className="text-center text-sm">
            <b>Built with <span role="img" aria-label="love">❤️</span> by Avishkar Patil</b>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
