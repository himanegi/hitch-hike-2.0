import React from "react";

const RideSharedPopup = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-300`}
    >
      <div
        className="bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">Ride Shared Successfully</h2>
        <p className="text-gray-600 mb-6">
          Your ride has been shared successfully.
        </p>
        <button
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RideSharedPopup;
