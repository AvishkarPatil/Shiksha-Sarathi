import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import lessonData from '../data/lessonData.json';
import '../styles/LessonDetails.css';
import ReactMarkdown from 'react-markdown';

function LessonDetail({ darkMode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('video');
  const [lesson, setLesson] = useState(null);
  const [generatedNotes, setGeneratedNotes] = useState('');
  const [generatedQuiz, setGeneratedQuiz] = useState([]);
  const [comment, setComment] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [contentGenerated, setContentGenerated] = useState(false);

  useEffect(() => {
    const foundLesson = Object.values(lessonData).find(lesson => lesson.id === id);
    setLesson(foundLesson);
    // Check if notes and quiz are already in localStorage
    const cachedNotes = localStorage.getItem(`notes_${id}`);
    const cachedQuiz = localStorage.getItem(`quiz_${id}`);
    if (cachedNotes && cachedQuiz) {
      setGeneratedNotes(cachedNotes);
      setGeneratedQuiz(JSON.parse(cachedQuiz));
      setContentGenerated(true);
    }
  }, [id]);

const generateContent = async () => {
  setIsLoading(true);
  try {
    const response = await fetch('https://platform-api.aixplain.com/assets/pipeline/execution/run/67de8202338999cb9696a0b5', {
      method: 'POST',
      headers: {
        'x-api-key': 'decdd1f1d5dbd90f096d8c86c87eebd2eaff2e459480f6f8fcd0db37c3123bc4',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "KeyInfo": lesson.title }),
    });
    const data = await response.json();

    // Set a timeout for 100 seconds
    const timeout = setTimeout(() => {
      setIsLoading(false);
      console.error('Content generation timed out');
    }, 100000);

    // Poll for results every 10 seconds
    const pollInterval = setInterval(async () => {
      try {
        const resultResponse = await fetch(data.url, {
          headers: {
            'x-api-key': 'decdd1f1d5dbd90f096d8c86c87eebd2eaff2e459480f6f8fcd0db37c3123bc4',
          },
        });
        const resultText = await resultResponse.text();
        let resultData;
        try {
          resultData = JSON.parse(resultText);
        } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          console.log('Raw response:', resultText);
          return; // Skip this iteration if JSON is invalid
        }

        if (resultData.data && resultData.data.length >= 2) {
          clearInterval(pollInterval);
          clearTimeout(timeout);

          // Generate notes
          const notesResponse = await fetch(resultData.data[0].segments[0].response);
          let notesText = await notesResponse.text();
          notesText = formatNotes(notesText);
          setGeneratedNotes(notesText);
          localStorage.setItem(`notes_${id}`, notesText);

          // Generate quiz
          const quizResponse = await fetch(resultData.data[1].segments[0].response);
          const quizText = await quizResponse.text();
          let quizData = [];
          try {
            quizData = JSON.parse(quizText);
            if (!Array.isArray(quizData)) {
              throw new Error('Quiz data is not an array');
            }
          } catch (quizParseError) {
            console.error('Error parsing quiz JSON:', quizParseError);
            console.log('Raw quiz response:', quizText);
            quizData = []; // Set empty quiz if parsing fails
          }
          setGeneratedQuiz(quizData);
          localStorage.setItem(`quiz_${id}`, JSON.stringify(quizData));

          setContentGenerated(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error polling for results:', error);
      }
    }, 10000);

  } catch (error) {
    console.error('Error generating content:', error);
    setIsLoading(false);
  }
};

const formatNotes = (notes) => {
  return notes
    .replace(/^(.*?)$/gm, line => {
      if (line.match(/^={3,}$/)) return '---';
      if (line.match(/^\*\*(.*?)\*\*$/)) return `\n## ${line.replace(/\*\*/g, '')}`;
      if (line.match(/^\*(.*?)\*$/)) return `\n### ${line.replace(/\*/g, '')}`;
      if (line.match(/^\d+\./)) return `\n${line}`;
      if (line.match(/^\*/)) return `\n- ${line.replace(/^\*/, '')}`;
      return line;
    })
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};
  if (!lesson) {
    return <div className={`error-message ${darkMode ? 'dark' : ''}`}>Lesson not found</div>;
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    console.log("Comment submitted:", comment);
    setComment('');
  };

  const handleSelectAnswer = (questionIndex, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex
    });
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    generatedQuiz.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    console.log("Quiz submitted. Score:", score);
  };

  return (
    <div className={`lesson-detail-container ${darkMode ? 'dark' : ''}`}>
      <h1 className="lesson-title">{lesson.title}</h1>
      <div className="lesson-meta">
        <span className="lesson-number">Lesson #{lesson.lotdNumber}</span>
        <span className="lesson-class">Class {lesson.class}</span>
        {lesson.subjects.map((subject) => (
          <span key={subject} className="lesson-subject">{subject}</span>
        ))}
      </div>

      <div className="lesson-tabs">
        <button
          className={`tab-button ${activeTab === 'video' ? 'active' : ''} ${darkMode ? 'dark' : ''}`}
          onClick={() => handleTabChange('video')}
        >
          <span className="tab-icon">▶</span> Video
        </button>
        <button
          className={`tab-button ${activeTab === 'notes' ? 'active' : ''} ${darkMode ? 'dark' : ''}`}
          onClick={() => handleTabChange('notes')}
        >
          <span className="tab-icon">📄</span> Notes
        </button>
        <button
          className={`tab-button ${activeTab === 'quiz' ? 'active' : ''} ${darkMode ? 'dark' : ''}`}
          onClick={() => handleTabChange('quiz')}
        >
          <span className="tab-icon">?</span> Quiz
        </button>
      </div>

      <div className="lesson-content">
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-content">
              Generating notes and quiz, please wait... You can watch the video in the meantime.
            </div>
          </div>
        )}

        {activeTab === 'video' && (
          <div className="video-section">
            <div className="video-container">
              <iframe
                src={lesson.videoUrl}
                title={lesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="lesson-video"
              ></iframe>
            </div>
            <h2 className="video-title">{lesson.title}</h2>
            <form onSubmit={handleSubmitComment} className="comment-form">
              <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Leave a comment..."
                className="comment-input"
              />
              <button type="submit" className="comment-submit">Submit Comment</button>
            </form>
          </div>
        )}

        {(activeTab === 'notes' || activeTab === 'quiz') && !contentGenerated && (
          <div>
            <button onClick={generateContent} className="generate-button" disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Generate Notes and Quiz'}
            </button>
            {isLoading && <p>Content is being generated. You can switch to the video tab to watch the lesson while waiting.</p>}
          </div>
        )}

        {activeTab === 'notes' && contentGenerated && (
          <div className="lesson-notes">
            <h2>AI-Generated Notes</h2>
            <ReactMarkdown>{generatedNotes}</ReactMarkdown>
          </div>
        )}

        {activeTab === 'quiz' && contentGenerated && (
          <div className="lesson-quiz">
            <h2>Quiz</h2>
            {generatedQuiz.map((question, index) => (
              <div key={index} className="quiz-question">
                <p>{question.question}</p>
                <div className="quiz-options">
                  {question.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      className={`quiz-option ${selectedAnswers[index] === optionIndex ? 'selected' : ''} ${quizSubmitted && question.correctAnswer === optionIndex ? 'correct' : ''}`}
                      onClick={() => handleSelectAnswer(index, optionIndex)}
                      disabled={quizSubmitted}
                    >
                      {String.fromCharCode(65 + optionIndex)}. {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {!quizSubmitted ? (
              <button className="submit-quiz" onClick={handleSubmitQuiz}>Submit Quiz</button>
            ) : (
              <div className="quiz-result">
                Your score: {quizScore} out of {generatedQuiz.length}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LessonDetail;