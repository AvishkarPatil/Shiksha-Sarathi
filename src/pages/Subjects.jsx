import React from 'react';
import { Link } from 'react-router-dom';
import { FaAtom, FaCalculator, FaBook, FaLanguage, FaMicroscope, FaLaptopCode } from 'react-icons/fa';

const subjects = [
  {
    id: "computer-science",
    name: "Computer Science",
    description: "Explore the world of computing, algorithms, and digital technology",
    icon: FaLaptopCode,
    color: "bg-pink-100 dark:bg-pink-900",
    iconColor: "text-blue-600 dark:text-blue-300",
    tags: ["Programming", "Data Structures", "Algos"],
  },
  {
    id: "physics",
    name: "Physics",
    description: "Explore the fundamental principles governing the natural world",
    icon: FaAtom,
    color: "bg-blue-100 dark:bg-blue-900",
    iconColor: "text-blue-500",
    tags: ["Mechanics", "Thermodynamics"],
  },
  {
    id: "maths",
    name: "Mathematics",
    description: "Discover the beauty of numbers, patterns, and abstract structures",
    icon: FaCalculator,
    color: "bg-green-100 dark:bg-green-900",
    iconColor: "text-green-500",
    tags: ["Algebra", "Geometry", "Calculus"],
  },
  {
    id: "history",
    name: "History",
    description: "Journey through time and explore the events that shaped our world",
    icon: FaBook,
    color: "bg-yellow-100 dark:bg-yellow-800",
    iconColor: "text-red-600",
    tags: ["Ancient", "Medieval", "Modern"],
  },
  {
    id: "language",
    name: "Language",
    description: "Master communication through the study of languages and literature",
    icon: FaLanguage,
    color: "bg-purple-100 dark:bg-purple-900",
    iconColor: "text-purple-500",
    tags: ["Grammar", "Literature", "Composition"],
  },
  {
    id: "science",
    name: "Science",
    description: "Uncover the mysteries of the natural world through scientific inquiry",
    icon: FaMicroscope,
    color: "bg-red-100 dark:bg-red-900",
    iconColor: "text-red-500",
    tags: ["Biology", "Chemistry", "Earth Science"],
  },
];

export default function SubjectsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Subjects</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore a variety of subjects and enhance your knowledge in different fields
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <div key={subject.id} className={`overflow-hidden shadow-lg transition-shadow rounded-lg ${subject.color}`}>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <subject.icon className={`h-8 w-8 ${subject.iconColor}`} />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold">{subject.name}</h2>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{subject.description}</p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  {subject.tags.map((tag, index) => (
                    <span key={index} className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2 mb-2">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="px-6 pb-6">
                  <Link to={`/subject/${subject.id}`} className="w-full">
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                      Let's Learn
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}