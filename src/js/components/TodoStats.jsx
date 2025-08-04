import React from 'react';

const TodoStats = ({ todos }) => {
  if (todos.length === 0) return null;

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="stats-section">
      <div className="stats-card">
        <div className="stats-header">
          <h3>📊 Progress</h3>
        </div>
        <div className="stats-content">
          <div className="progress-circle">
            <div className="progress-text">
              <span className="percentage">{completionPercentage}%</span>
              <span className="label">Complete</span>
            </div>
          </div>
          <div className="stats-details">
            <div className="stat-item">
              <span className="stat-number">{completedCount}</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{totalCount - completedCount}</span>
              <span className="stat-label">Remaining</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{totalCount}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoStats;