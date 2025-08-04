import React from 'react';

const FilterButtons = ({ currentFilter, onFilterChange, todos }) => {
  const filters = [
    { key: 'all', label: 'All', count: todos.length },
    { key: 'active', label: 'Active', count: todos.filter(t => !t.completed).length },
    { key: 'completed', label: 'Completed', count: todos.filter(t => t.completed).length }
  ];

  return (
    <div className="filter-buttons">
      {filters.map(filter => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`filter-button ${currentFilter === filter.key ? 'active' : ''}`}
        >
          {filter.label} ({filter.count})
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;