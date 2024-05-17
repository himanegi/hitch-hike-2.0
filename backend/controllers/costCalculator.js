const ratePerKm = 5; // Change this to your rate

export const calculateCost = (distance) => {
  if (distance < 0) {
    throw new Error('Distance cannot be negative');
  }
  return ratePerKm * distance;
};