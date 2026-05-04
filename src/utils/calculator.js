/**
 * Attendance calculation utilities
 * Formulas designed for Indian college minimum 75% attendance requirement
 */

/**
 * Calculate safe bunks (classes you can skip without falling below 75%)
 * Formula: floor((attended - 0.75 × total) / 0.75)
 */
export const calculateSafeBunks = (attended, total) => {
  if (total === 0) return 0;
  const required = 0.75;
  const safeBunks = Math.floor((attended - required * total) / required);
  return Math.max(0, safeBunks);
};

/**
 * Calculate recovery target (classes needed to get back to 75%)
 * Formula: ceil((0.75 × total - attended) / 0.25)
 */
export const calculateRecoveryTarget = (attended, total) => {
  if (total === 0) return 0;
  const required = 0.75;
  const classesNeeded = Math.ceil((required * total - attended) / (1 - required));
  return Math.max(0, classesNeeded);
};

/**
 * Calculate attendance percentage
 */
export const calculatePercentage = (attended, total) => {
  if (total === 0) return 0;
  return Math.round((attended / total) * 100);
};

/**
 * Determine attendance status based on percentage
 * Returns: 'safe' | 'warning' | 'danger'
 */
export const getAttendanceStatus = (attended, total) => {
  const percentage = calculatePercentage(attended, total);
  if (percentage >= 75) return 'safe';
  if (percentage >= 65) return 'warning';
  return 'danger';
};

/**
 * Get color for status badge
 */
export const getStatusColor = (status) => {
  const colors = {
    safe: 'bg-green-100 text-green-800 border-green-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    danger: 'bg-red-100 text-red-800 border-red-300',
  };
  return colors[status] || colors.danger;
};

/**
 * Calculate aggregate attendance across all subjects
 */
export const calculateAggregateAttendance = (subjects) => {
  if (subjects.length === 0) {
    return { attended: 0, total: 0, percentage: 0, status: 'safe' };
  }

  const totalAttended = subjects.reduce((sum, subject) => sum + subject.attended, 0);
  const totalClasses = subjects.reduce((sum, subject) => sum + subject.total, 0);
  const percentage = calculatePercentage(totalAttended, totalClasses);
  const status = getAttendanceStatus(totalAttended, totalClasses);

  return {
    attended: totalAttended,
    total: totalClasses,
    percentage,
    status,
  };
};
