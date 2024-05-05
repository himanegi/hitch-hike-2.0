import React from "react";

const InputSource = ({
  type,
  locations,
  onCoordinatesChange,
  onPlaceChange,
}) => {
  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    if (selectedLocation) {
      onCoordinatesChange(locations[selectedLocation]);
      onPlaceChange(selectedLocation);
    } else {
      onCoordinatesChange(null);
      onPlaceChange("");
    }
  };

  const label = type === "source" ? "Select a Source" : "Select a Destination";

  return (
    <div>
      <label
        htmlFor="locationSelect"
        className="block text-sm font-medium text-gray-700 mt-2"
      >
        {label}
      </label>
      <select
        className="mt-1 block w-full outline-none rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 transition-all duration-300 focus:outline-none focus:ring-2 hover:ring-2 hover:ring-indigo-500"
        id="locationSelect"
        onChange={handleLocationChange}
      >
        <option value="" disabled selected>
          Select a location
        </option>
        {Object.entries(locations).map(([name]) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSource;
