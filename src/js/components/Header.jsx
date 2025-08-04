import React from 'react';

const Header = ({ loading }) => {
  return (
    <div className="header">
      <h1>✔️ Markcus To-do List ✔️</h1>
      <p>🎯 Stay organized and productive 🎯</p>
      {loading && (
        <div style={{ 
          marginTop: '8px', 
          fontSize: '0.875rem', 
          color: '#6b7280',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '16px',
            height: '16px',
            border: '2px solid #e5e7eb',
            borderTop: '2px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          Syncing...
        </div>
      )}
    </div>
  );
};

export default Header;