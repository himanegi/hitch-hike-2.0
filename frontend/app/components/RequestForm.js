import React, { useState } from "react";

const RequestForm = ({ ride, handleSubmit, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-lg font-bold mb-4">Request Ride</h2>
        <form
          onSubmit={(e) => {
            handleSubmit(e, ride, phoneNumber, message);
            onClose();
          }}
        >
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-4 px-4 py-2 rounded-md bg-gray-300 text-gray-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-500 text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
