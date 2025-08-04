import React from 'react';

const ErrorMessage = ({ error, onDismiss }) => {
  if (!error) return null;

  return (
    <div style={{
      marginBottom: '24px',
      padding: '16px',
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '12px',
      color: '#dc2626',
      fontSize: '0.875rem'
    }}>
      {error}
      <button 
        onClick={onDismiss}
        style={{
          marginLeft: '12px',
          padding: '4px 8px',
          fontSize: '0.75rem',
          backgroundColor: 'transparent',
          border: '1px solid #dc2626',
          borderRadius: '6px',
          color: '#dc2626',
          cursor: 'pointer'
        }}
      >
        Dismiss
      </button>
    </div>
  );
};

export default ErrorMessage;