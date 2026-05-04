import React from 'react';
import { getStatusColor } from '../utils/calculator';

export const StatusBadge = ({ percentage, status }) => {
  const colorClass = getStatusColor(status);

  return (
    <div className={`inline-block px-3 py-1 rounded-full border font-semibold text-sm ${colorClass}`}>
      {percentage}%
    </div>
  );
};
