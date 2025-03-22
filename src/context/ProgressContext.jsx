import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const storedProgress = localStorage.getItem(`progress_${user.id}`);
      if (storedProgress) {
        setProgress(JSON.parse(storedProgress));
      }
    }
  }, [user]);

  const updateProgress = (subject, lessonId) => {
    const newProgress = {
      ...progress,
      [subject]: {
        ...progress[subject],
        [lessonId]: true
      }
    };
    setProgress(newProgress);
    if (user) {
      localStorage.setItem(`progress_${user.id}`, JSON.stringify(newProgress));
    }
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};