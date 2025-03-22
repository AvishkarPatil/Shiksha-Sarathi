import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Book, Trophy, ChevronRight } from 'lucide-react';
import '../styles/Home.css';

const heroData = {
  quotes: [
    {
      text: "Education is the most powerful weapon which you can use to change the world",
      author: "Nelson Mandela",
    },
    {
      text: "The beautiful thing about learning is that no one can take it away from you",
      author: "B.B. King",
    },
    {
      text: "Education is not the filling of a pail, but the lighting of a fire",
      author: "W.B. Yeats",
    },
    {
      text: "An investment in knowledge pays the best interest",
      author: "Benjamin Franklin",
    },
    {
      text: "The roots of education are bitter, but the fruit is sweet",
      author: "Aristotle",
    },
  ],
  images: [
    "https://i.ibb.co/hFZx2k1s/istockphoto-1395727646-612x612.jpg",
    "https://i.ibb.co/Cs8ZM9BX/istockphoto-1409815584-612x612.jpg",
    "https://i.ibb.co/PvKJd0d9/children-learning-in-classroom-settings-depicting-education-and-learning-in-a-rural-asian-school-pho.jpg",
    "https://i.ibb.co/KzjqzkbK/istockphoto-1395727822-612x612.jpg",
  ],
};

const features = [
  { icon: Book, title: "Curated Daily Lessons", description: "Access high-quality educational content every day." },
  { icon: QrCode, title: "Interactive Learning", description: "Engage with lessons through our unique QR code system." },
  { icon: Trophy, title: "Track Your Progress", description: "Stay motivated with streaks and achievements." }
];

const testimonials = [
  { quote: "Shiksha LOTD has transformed the way I learn. The daily lessons keep me engaged and motivated!", author: "Priya, Student" },
  { quote: "As a teacher, I find Shiksha LOTD to be an invaluable tool for supplementing my students' education.", author: "Rahul, Educator" }
];

function Home({ darkMode }) {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const lessonOfTheDayRef = useRef(null);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % heroData.quotes.length);
    }, 10000);

    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroData.images.length);
    }, 60000);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(imageInterval);
    };
  }, []);

  const scrollToLessonOfTheDay = () => {
    lessonOfTheDayRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`home-container ${darkMode ? 'dark' : ''}`}>
      <section className="hero-section">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 rounded-lg"
          style={{ backgroundImage: `url(${heroData.images[currentImageIndex]})` }}
        />
        <div className="hero-overlay rounded-lg" />
        <div className="hero-content">
          <div className="hero-quote">
            <p className="text-xl md:text-2xl lg:text-3xl font-light italic mb-2">
              "{heroData.quotes[currentQuoteIndex].text}"
            </p>
            <p className="text-sm md:text-base text-gray-300">— {heroData.quotes[currentQuoteIndex].author}</p>
          </div>
          <h1 className="hero-title">Welcome to Shiksha Sarathi</h1>
          <p className="hero-subtitle">Bridging Rural Education through Daily Learning</p>
          <button onClick={scrollToLessonOfTheDay} className="cta-button group">
            Get Started
            <ChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <section ref={lessonOfTheDayRef} className={`section ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="section-content">
          <h2 className={`section-title ${darkMode ? 'text-white' : 'text-gray-900'} text-left`}>Lesson of the Day</h2>
          <div className={`card ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} p-6`}>
            <div className="flex flex-wrap items-center">
              <div className="w-full md:w-2/3 pr-4">
                <h3 className="text-2xl font-semibold mb-2">Introduction to Programming</h3>
                <p className="text-lg font-medium mb-2 text-indigo-500">Don't miss today's class!</p>
                <p className="mb-4">Learn the basics of programming and start your coding journey today!</p>
              </div>
              <div className="w-full md:w-1/3 flex justify-center md:justify-end">
                <Link to="/lesson-of-the-day" className="btn-primary inline-flex items-center hover:bg-indigo-700 hover:text-white transition-colors">
                  Start Learning
                  <ChevronRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="section-content">
          {/*<h2 className={`section-title ${darkMode ? 'text-white' : 'text-gray-900'}`}>Scan & Learn</h2>*/}
          <div className={`card ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} p-6`}>
            <div className="flex flex-wrap items-center">
              <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center space-x-4">
                <QrCode className={`w-32 h-32 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <Book className={`w-32 h-32 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-semibold mb-4">Engage with Daily Questions</h3>
                <p className="mb-4">Scan the QR code to access daily questions and reinforce your learning. Unlock new content every day!</p>
                <Link to="/scan" className="btn-primary inline-flex items-center">
                  Try It Now
                  <ChevronRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="section-content">
          <h2 className={`section-title ${darkMode ? 'text-white' : 'text-gray-900'}`}>Why Choose Shiksha LOTD?</h2>
          <div className="feature-grid">
            {features.map((feature, index) => (
              <div key={index} className={`feature-item card ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}>
                <feature.icon className={`feature-icon ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="section-content">
          <h2 className={`section-title ${darkMode ? 'text-white' : 'text-gray-900'}`}>What Our Users Say</h2>
          <div className="testimonial-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`testimonial-card ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                <p className="mb-4 italic">"{testimonial.quote}"</p>
                <p className="font-semibold">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

<section className={`section ${darkMode ? 'bg-gray-800' : 'bg-white'} text-center`}>
        <div className="section-content">
          <h2 className={`section-title ${darkMode ? 'text-white' : 'text-gray-900'}`}>Ready to Start Learning?</h2>
          <Link to="/" className="btn-primary text-lg hover:bg-indigo-700 hover:text-white transition-colors">
            Join Shiksha LOTD Today
            <ChevronRight className="inline-block ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;