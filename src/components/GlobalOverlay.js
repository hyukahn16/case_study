import React from 'react';

const GlobalOverlay = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="global-overlay"></div>
  );
};

export default GlobalOverlay;