import React, { useState } from 'react';
import { StatusBadge } from './StatusBadge';
import {
  calculatePercentage,
  getAttendanceStatus,
  calculateSafeBunks,
  calculateRecoveryTarget,
} from '../utils/calculator';

export const SubjectCard = ({ subject, onUpdate, onDelete, onMarkAttended, onMarkAbsent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [attended, setAttended] = useState(subject.attended);
  const [total, setTotal] = useState(subject.total);

  const percentage = calculatePercentage(attended, total);
  const status = getAttendanceStatus(attended, total);
  const safeBunks = calculateSafeBunks(attended, total);
  const recoveryTarget = calculateRecoveryTarget(attended, total);

  const handleSave = () => {
    if (total >= attended && total >= 0 && attended >= 0) {
      onUpdate(subject.id, parseInt(attended), parseInt(total));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setAttended(subject.attended);
    setTotal(subject.total);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition duration-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">{subject.name}</h3>
        <button
          onClick={() => onDelete(subject.id)}
          className="text-red-500 hover:text-red-700 font-semibold text-sm"
        >
          ✕
        </button>
      </div>

      {/* Status Badge */}
      <div className="mb-4">
        <StatusBadge percentage={percentage} status={status} />
      </div>

      {/* Attendance Display or Edit */}
      {!isEditing ? (
        <div className="mb-4">
          <p className="text-gray-700 text-sm mb-2">
            <span className="font-semibold">{attended}/{total}</span> classes attended
          </p>
        </div>
      ) : (
        <div className="mb-4 space-y-2">
          <div>
            <label className="text-gray-600 text-sm">Attended:</label>
            <input
              type="number"
              value={attended}
              onChange={(e) => setAttended(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-600 text-sm">Total:</label>
            <input
              type="number"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm">
        {percentage >= 75 ? (
          <p className="text-green-700 font-semibold">
            😴 Safe Bunks: <span className="text-lg">{safeBunks}</span>
          </p>
        ) : (
          <p className="text-red-700 font-semibold">
            🚨 Recovery Target: <span className="text-lg">{recoveryTarget}</span> consecutive classes
          </p>
        )}
      </div>

      {/* Quick Action Buttons or Edit/Save */}
      {!isEditing ? (
        <div className="flex gap-2">
          <button
            onClick={() => onMarkAttended(subject.id)}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded transition duration-200 text-sm"
          >
            ✓ Attended
          </button>
          <button
            onClick={() => onMarkAbsent(subject.id)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded transition duration-200 text-sm"
          >
            ✕ Absent
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded transition duration-200 text-sm"
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded transition duration-200 text-sm"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-3 rounded transition duration-200 text-sm"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
