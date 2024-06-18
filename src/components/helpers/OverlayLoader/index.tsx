// src/components/OverlayLoader.jsx
import React from 'react';

const OverlayLoader = ({ loading }:{loading:boolean}) => {
  if (!loading) return null;

  return (
    <div className="w-full h-full fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-16 h-16 border-4 border-t-transparent border-blue rounded-full animate-spin"></div>
    </div>
  );
};

export default OverlayLoader;
