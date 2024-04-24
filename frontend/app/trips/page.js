import React from "react";

const Trips = () => {
  // Sample data for demonstration
  const drivingTrips = [
    {
      departure: "2023-04-24T10:00:00",
      origin: "New York, NY",
      destination: "Boston, MA",
      riders: 2,
    },
    {
      departure: "2023-04-25T14:30:00",
      origin: "Chicago, IL",
      destination: "Los Angeles, CA",
      riders: 4,
    },
  ];

  const ridingTrips = [
    {
      departure: "2023-04-26T09:15:00",
      origin: "Miami, FL",
      destination: "Atlanta, GA",
      requestStatus: "Pending",
    },
    {
      departure: "2023-04-27T16:45:00",
      origin: "San Francisco, CA",
      destination: "Seattle, WA",
      requestStatus: "Approved",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-8">
      <h2 className="text-[30px] font-medium">Driving</h2>
      <p className="mb-4 text-gray-600">
        This section displays the trips you are driving. You can manage rider
        requests and update trip details here.
      </p>
      <table className="border-[2px] border-black w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Departure</th>
            <th className="px-4 py-2 text-left">Origin</th>
            <th className="px-4 py-2 text-left">Destination</th>
            <th className="px-4 py-2 text-left">Riders</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {drivingTrips.map((trip, index) => (
            <tr key={index} className="odd:bg-gray-100 even:bg-white">
              <td className="px-4 py-2">
                {new Date(trip.departure).toLocaleString()}
              </td>
              <td className="px-4 py-2">{trip.origin}</td>
              <td className="px-4 py-2">{trip.destination}</td>
              <td className="px-4 py-2">{trip.riders}</td>
              <td className="px-4 py-2">
                <button className="bg-blue-500 text-[12px] hover:bg-blue-700 text-white py-2 px-4 rounded-xl">
                  Manage Trip
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-[30px] font-medium mt-8">Riding</h2>
      <p className="mb-4 text-gray-600">
        This section shows the trips you have requested to ride with others. You
        can track the status of your requests here.
      </p>
      <table className="border-[2px] border-black w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Departure</th>
            <th className="px-4 py-2 text-left">Origin</th>
            <th className="px-4 py-2 text-left">Destination</th>
            <th className="px-4 py-2 text-left">Request Status</th>
          </tr>
        </thead>
        <tbody>
          {ridingTrips.map((trip, index) => (
            <tr key={index} className="odd:bg-gray-100 even:bg-white">
              <td className="px-4 py-2">
                {new Date(trip.departure).toLocaleString()}
              </td>
              <td className="px-4 py-2">{trip.origin}</td>
              <td className="px-4 py-2">{trip.destination}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 text-[12px] rounded-full ${
                    trip.requestStatus === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {trip.requestStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Trips;
