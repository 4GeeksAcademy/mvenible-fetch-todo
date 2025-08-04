import React from 'react';
import { Trash2, Check } from 'lucide-react';

const TodoItem = ({ todo, onDelete, onToggleComplete }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <button
        onClick={() => onToggleComplete(todo.id)}
        className={`complete-button ${todo.completed ? 'completed' : ''}`}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed && <Check size={16} strokeWidth={2.5} />}
      </button>
      
      <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
        {todo.text}
      </span>
      
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-button"
        aria-label="Delete task"
      >
        <Trash2 size={16} strokeWidth={2} />
      </button>
    </div>
  );
};

export default TodoItem;