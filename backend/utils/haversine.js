export default function HaversineDistance(source, destination) {
  const lat1 = parseFloat(source.lat);
  const lon1 = parseFloat(source.lon);
  const lat2 = parseFloat(destination.lat);
  const lon2 = parseFloat(destination.lon);

  const R = 6371; // Radius of the Earth in km
  const φ1 = (lat1 * Math.PI) / 180; // Convert latitude to radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}
