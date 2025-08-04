import React from 'react';

const ClearAllButton = ({ onClearAll, loading, todoCount }) => {
  return (
    <div style={{ marginBottom: '24px', textAlign: 'center' }}>
      <button
        onClick={onClearAll}
        disabled={loading}
        style={{
          padding: '8px 16px',
          fontSize: '0.875rem',
          backgroundColor: '#fee2e2',
          color: '#dc2626',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.5 : 1,
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => {
          if (!loading) {
            e.target.style.backgroundColor = '#fecaca';
          }
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#fee2e2';
        }}
      >
        Clear All Tasks ({todoCount})
      </button>
    </div>
  );
};

export default ClearAllButton;