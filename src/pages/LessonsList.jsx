import React from 'react';
import { useParams, Link } from 'react-router-dom';
import lessonData from '../data/lessonData.json';

export default function LessonsList({ darkMode }) {
  const { id } = useParams();

  console.log("Subject ID:", id);
  console.log("All lessons:", lessonData);

  // Filter lessons based on the subject
  const subjectLessons = Object.values(lessonData).filter(lesson =>
    lesson.subjectId.toLowerCase() === id.toLowerCase()
  );

  console.log("Filtered lessons:", subjectLessons);

  return (
    <div className={`min-h-screen flex flex-col py-12 ${darkMode ? 'dark' : ''}`}>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center capitalize">{id.replace('-', ' ')} Lessons</h1>

        {subjectLessons.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjectLessons.map((lesson) => (
              <div key={lesson.id} className={`bg-white shadow-md rounded-lg overflow-hidden ${darkMode ? 'dark:bg-gray-800 dark:text-white' : ''}`}>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{lesson.title}</h2>
                  <p className={`mb-4 ${darkMode ? 'dark:text-gray-300' : 'text-gray-600'}`}>{lesson.description || 'No description available.'}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {lesson.subjects.map((subject, index) => (
                      <span key={index} className={`text-xs font-semibold px-2.5 py-0.5 rounded ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                        {subject}
                      </span>
                    ))}
                  </div>
                  <Link to={`/lesson/${lesson.id}`} className={`inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${darkMode ? 'dark:bg-blue-700 dark:hover:bg-blue-800' : ''}`}>
                    Start Lesson
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={`text-center ${darkMode ? 'dark:text-gray-300' : 'text-gray-600'}`}>No lessons found for this subject.</p>
        )}

        {/* Debug information */}
        <div className={`mt-8 p-4 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}>
          <h2 className="text-lg font-semibold mb-2">Debug Information:</h2>
          <p>Subject ID: {id}</p>
          <p>Number of lessons found: {subjectLessons.length}</p>
        </div>
      </div>
    </div>
  );
}