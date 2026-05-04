import { useState, useEffect } from 'react';
import { calculateAggregateAttendance } from '../utils/calculator';

const STORAGE_KEY = 'attendease_subjects';

export const useAttendance = () => {
  const [subjects, setSubjects] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load subjects from localStorage on mount
  useEffect(() => {
    const savedSubjects = localStorage.getItem(STORAGE_KEY);
    if (savedSubjects) {
      try {
        setSubjects(JSON.parse(savedSubjects));
      } catch (error) {
        console.error('Failed to load subjects from localStorage:', error);
      }
    }
    setLoaded(true);
  }, []);

  // Save subjects to localStorage whenever they change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
    }
  }, [subjects, loaded]);

  // Add a new subject
  const addSubject = (subjectName) => {
    const newSubject = {
      id: Date.now(),
      name: subjectName,
      attended: 0,
      total: 0,
    };
    setSubjects([...subjects, newSubject]);
  };

  // Update subject attendance
  const updateSubject = (id, attended, total) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === id ? { ...subject, attended, total } : subject
      )
    );
  };

  // Delete a subject
  const deleteSubject = (id) => {
    setSubjects(subjects.filter((subject) => subject.id !== id));
  };

  // Mark a class as attended
  const markAttended = (id) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === id
          ? { ...subject, attended: subject.attended + 1, total: subject.total + 1 }
          : subject
      )
    );
  };

  // Mark a class as absent
  const markAbsent = (id) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === id
          ? { ...subject, total: subject.total + 1 }
          : subject
      )
    );
  };

  // Get aggregate attendance data
  const aggregateAttendance = calculateAggregateAttendance(subjects);

  return {
    subjects,
    addSubject,
    updateSubject,
    deleteSubject,
    markAttended,
    markAbsent,
    aggregateAttendance,
    loaded,
  };
};
