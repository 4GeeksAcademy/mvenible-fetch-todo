import React from 'react';
import { Plus } from 'lucide-react';

const InputSection = ({ inputValue, onInputChange, onKeyPress, onAddTodo, loading }) => {
  return (
    <div className="input-section">
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Lets get something done!"
          className="input-field"
          disabled={loading}
        />
        <button
          onClick={onAddTodo}
          disabled={!inputValue.trim() || loading}
          className="add-button"
          aria-label="Add task"
        >
          <Plus size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default InputSection;