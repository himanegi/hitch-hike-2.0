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
      <label htmlFor="locationSelect">{label}</label>
      <br />
      <select id="locationSelect" onChange={handleLocationChange}>
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
