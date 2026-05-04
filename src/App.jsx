import React, { useState } from 'react';
import { useAttendance } from './hooks/useAttendance';
import { AddSubjectModal } from './components/AddSubjectModal';
import { SubjectCard } from './components/SubjectCard';
import { AttendanceSummary } from './components/AttendanceSummary';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    subjects,
    addSubject,
    updateSubject,
    deleteSubject,
    markAttended,
    markAbsent,
    aggregateAttendance,
    loaded,
  } = useAttendance();

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2">AttendEase 📚</h1>
          <p className="text-blue-100">
            Track subject-wise attendance, calculate safe bunks, and get recovery targets
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Summary Section */}
        <AttendanceSummary aggregateData={aggregateAttendance} />

        {/* Add Subject Button */}
        <div className="mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-200 flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add Subject
          </button>
        </div>

        {/* Subjects Grid */}
        {subjects.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">No subjects added yet</p>
            <p className="text-gray-400">Click "Add Subject" to start tracking your attendance</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                onUpdate={updateSubject}
                onDelete={deleteSubject}
                onMarkAttended={markAttended}
                onMarkAbsent={markAbsent}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      <AddSubjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addSubject}
      />

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6 mt-12 text-center">
        <p>Made with ❤️ for Indian college students</p>
      </footer>
    </div>
  );
}

export default App;
