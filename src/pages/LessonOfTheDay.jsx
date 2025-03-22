import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/LessonOfTheDay.css"
import lessonData from '../data/lessonData.json';

const availableSubjects = [
  { id: "ai-ml", label: "AI-ML" },
  { id: "computer", label: "Computer" },
  { id: "math", label: "Mathematics" },
  { id: "science", label: "Science" },
  { id: "english", label: "English" },
]

const availableClasses = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"]

function LessonOfTheDay({ darkMode }) {
  const navigate = useNavigate()
  const [currentLesson, setCurrentLesson] = useState(null)
  const [pastLessons, setPastLessons] = useState([])
  const [selectedSubjects, setSelectedSubjects] = useState(["computer"])
  const [selectedClass, setSelectedClass] = useState("10th")
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false)

  useEffect(() => {
    const fetchLessons = () => {
      console.log("Fetching lessons...");
      console.log("All lessons:", lessonData);
      const allLessons = Object.values(lessonData);

      // Filter lessons based on selected subjects and class
      const filteredLessons = allLessons.filter(lesson => {
        const classMatch = lesson.class.toLowerCase() === selectedClass.toLowerCase();
        const subjectMatch = lesson.subjects.some(subject =>
          selectedSubjects.some(selectedSubject =>
            subject.toLowerCase().includes(selectedSubject.toLowerCase())
          )
        );
        console.log(`Lesson: ${lesson.title}, Class: ${lesson.class}, Subjects: ${lesson.subjects.join(', ')}, Class Match: ${classMatch}, Subject Match: ${subjectMatch}`);
        return classMatch && subjectMatch;
      });
      console.log("Filtered lessons:", filteredLessons);

      // Sort lessons by lotdNumber in descending order
      const sortedLessons = filteredLessons.sort((a, b) => b.lotdNumber - a.lotdNumber);
      console.log("Sorted lessons:", sortedLessons);

      // Find today's lesson (first in the sorted list)
      const today = sortedLessons[0];

      // Find past lessons (all except the first)
      const past = sortedLessons.slice(1);

      console.log("Current lesson:", today);
      console.log("Past lessons:", past);

      setCurrentLesson(today || null)
      setPastLessons(past)
    }

    fetchLessons()
  }, [selectedSubjects, selectedClass])

  const handleGetStarted = (lessonId) => {
    navigate(`/lesson/${lessonId}`)
  }

  const handleSubjectChange = (subject, checked) => {
    if (checked) {
      setSelectedSubjects(prev => {
        const newSubjects = [...prev, subject];
        console.log("Selected subjects:", newSubjects);
        return newSubjects;
      });
    } else {
      setSelectedSubjects(prev => {
        const newSubjects = prev.filter((s) => s !== subject);
        console.log("Selected subjects:", newSubjects);
        return newSubjects;
      });
    }
  }

  const handleSavePreferences = () => {
    console.log("Saving preferences:", { subjects: selectedSubjects, class: selectedClass })
  }

  return (
    <div className={`lesson-container ${darkMode ? 'dark' : ''}`}>
      {/* Filter controls */}
      <div className={`filter-controls ${darkMode ? 'dark' : ''}`}>
        <div className="subject-checkboxes">
          {availableSubjects.map((subject) => (
            <div key={subject.id} className="checkbox-item">
              <input
                type="checkbox"
                id={subject.id}
                checked={selectedSubjects.includes(subject.id)}
                onChange={(e) => handleSubjectChange(subject.id, e.target.checked)}
              />
              <label htmlFor={subject.id}>{subject.label}</label>
            </div>
          ))}
        </div>

        <div className="class-controls">
          <div className="dropdown-container">
            <button className={`dropdown-button ${darkMode ? 'dark' : ''}`} onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}>
              Class {selectedClass}
              <span className="dropdown-icon">▼</span>
            </button>
            {isClassDropdownOpen && (
              <div className={`dropdown-menu ${darkMode ? 'dark' : ''}`}>
                {availableClasses.map((cls) => (
                  <div
                    key={cls}
                    className={`dropdown-item ${darkMode ? 'dark' : ''}`}
                    onClick={() => {
                      setSelectedClass(cls)
                      setIsClassDropdownOpen(false)
                    }}
                  >
                    Class {cls}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className={`save-button ${darkMode ? 'dark' : ''}`} onClick={handleSavePreferences}>
            Save
          </button>
        </div>
      </div>

      {/*/!* Debug Information *!/*/}
      {/*<div style={{margin: '20px', padding: '10px', border: '1px solid #ccc'}}>*/}
      {/*  <h4>Debug Info:</h4>*/}
      {/*  <p>Current Lesson: {currentLesson ? JSON.stringify(currentLesson) : 'None'}</p>*/}
      {/*  <p>Past Lessons: {pastLessons.length}</p>*/}
      {/*  <p>Selected Subjects: {selectedSubjects.join(', ')}</p>*/}
      {/*  <p>Selected Class: {selectedClass}</p>*/}
      {/*  <p>All Lessons: {Object.keys(lessonData).length}</p>*/}
      {/*  <p>Filtered Lessons: {(currentLesson ? 1 : 0) + pastLessons.length}</p>*/}
      {/*</div>*/}

      {/* Current lesson of the day */}
      {currentLesson && (
        <div className={`lesson-card current-lesson ${darkMode ? 'dark' : ''}`}>
          <div className="lesson-content">
            <div>
              <div className="lotd-number">LOTD #{currentLesson.lotdNumber}</div>
              <h2 className="lesson-title lotd-title">{currentLesson.title}</h2>
              <div className="lesson-tags">
                {currentLesson.subjects.map((subject) => (
                  <span key={subject} className={`tag ${darkMode ? 'dark' : ''}`}>
                    {subject}
                  </span>
                ))}
                <span className={`tag ${darkMode ? 'dark' : ''}`}>Class {currentLesson.class}</span>
              </div>
            </div>
            <button className={`get-started-button ${darkMode ? 'dark' : ''}`} onClick={() => handleGetStarted(currentLesson.id)}>
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* Past lessons section */}
      {pastLessons.length > 0 && (
        <div className="past-lessons">
          <h3 className={`section-title ${darkMode ? 'dark' : ''}`}>Past Lessons :</h3>
          <div className="lessons-list">
            {pastLessons.map((lesson) => (
              <div key={lesson.id} className={`lesson-card past-lesson ${darkMode ? 'dark' : ''}`}>
                <div className="lesson-content">
                  <div>
                    <div className="lotd-number">LOTD #{lesson.lotdNumber}</div>
                    <h2 className="lesson-title lotd-title">{lesson.title}</h2>
                    <div className="lesson-tags">
                      {lesson.subjects.map((subject) => (
                        <span key={subject} className={`tag past-tag ${darkMode ? 'dark' : ''}`}>
                          {subject}
                        </span>
                      ))}
                      <span className={`tag past-tag ${darkMode ? 'dark' : ''}`}>Class {lesson.class}</span>
                    </div>
                  </div>
                  <button className={`get-started-button past-button ${darkMode ? 'dark' : ''}`} onClick={() => handleGetStarted(lesson.id)}>
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LessonOfTheDay