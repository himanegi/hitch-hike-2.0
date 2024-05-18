const rates = {
  car: { peak: 10, offPeak: 5 },
  bike: { peak: 6, offPeak: 3 },
  truck: { peak: 15, offPeak: 10 },
};

const baseFare = {
  car: 50,
  bike: 30,
  truck: 100,
};

const surgeMultiplier = 1.5;

const peakHours = [7, 8, 9, 17, 18, 19]; // 7-9 AM and 5-7 PM

export const calculateCost = (distance, vehicleType, hour) => {
  if (distance < 0) {
    throw new Error('Distance cannot be negative');
  }

  if (!rates[vehicleType]) {
    throw new Error(`Invalid vehicle type: ${vehicleType}`);
  }

  const isPeakHour = peakHours.includes(hour);
  const ratePerKm = isPeakHour ? rates[vehicleType].peak : rates[vehicleType].offPeak;
  const base = baseFare[vehicleType];

  return base + ratePerKm * distance;
};

export const calculateSurgeCost = (distance, vehicleType, hour) => {
  const cost = calculateCost(distance, vehicleType, hour);
  return cost * surgeMultiplier;
};

export const calculateMultiStopCost = (distances, vehicleType, hour) => {
  if (!Array.isArray(distances)) {
    throw new Error('Distances must be an array');
  }

  return distances.reduce((totalCost, distance) => {
    return totalCost + calculateCost(distance, vehicleType, hour);
  }, 0);
};