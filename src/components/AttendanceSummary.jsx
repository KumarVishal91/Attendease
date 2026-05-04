import React from 'react';
import { StatusBadge } from './StatusBadge';

export const AttendanceSummary = ({ aggregateData }) => {
  const { attended, total, percentage, status } = aggregateData;

  if (total === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 border-l-4 border-blue-500 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Overall Attendance</h2>
        <p className="text-gray-600">Add subjects to track your attendance</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 border-l-4 border-blue-500 mb-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Overall Attendance</h2>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold text-lg">{attended}/{total}</span> classes attended across all subjects
          </p>
          <StatusBadge percentage={percentage} status={status} />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              status === 'safe'
                ? 'bg-green-500'
                : status === 'warning'
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <p className="text-gray-600 text-sm mt-2">
          {percentage >= 75
            ? '✓ You meet the 75% attendance requirement'
            : `✕ You need ${Math.ceil(((0.75 * (attended + (total - attended))) - attended))} more classes to reach 75%`}
        </p>
      </div>
    </div>
  );
};
