"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useUser } from "@clerk/clerk-react";
import RideRequestModal from "../components/RideRequestModal";
// import io from 'socket.io-client';

const Trips = () => {
  const [disabledButtons, setDisabledButtons] = useState({});
  const [drivingTrips, setDrivingTrips] = useState([]);
  const [ridingTrips, setRidingTrips] = useState([]);
  const { user } = useUser();

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const [openChat, setOpenChat] = useState(false);
  // const socket = io('http://localhost:3000');

  useEffect(() => {
    if (user) {
      const fullName = user.fullName;
      console.log(fullName);
    }
  }, [user]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.post("/api/trips/", {
          userId: user?.id || null,
        });
        console.log(response.data);
        if (
          Array.isArray(response.data.allRides) &&
          response.data.allRides.length > 0 &&
          Array.isArray(response.data.allRides[0].driving)
        ) {
          const trips = response.data.allRides[0].driving.map((trip) => ({
            departure: trip.date,
            origin: trip.sourceName,
            destination: trip.destinationName,
            riders: trip.riders.length,
            id: trip._id,
            rideRequests: trip.rideRequests,
            availableSpots: trip.spotsLeft,
          }));

          setDrivingTrips(trips);

          console.log("message: ", response.data.allRides);
        } else {
          console.log("Invalid response data format:", response.data);
          setDrivingTrips([]);
        }
        if (
          Array.isArray(response.data.allRidesRequests) &&
          response.data.allRidesRequests.length > 0 &&
          Array.isArray(response.data.allRidesRequests[0].rides)
        ) {
          const trips = response.data.allRidesRequests[0].rides.map((trip) => ({
            departure: trip.date,
            origin: trip.sourceName,
            destination: trip.destinationName,
            id: trip._id,
            status: trip.rideRequests.find(
              (request) => request.riderId === user.id
            ).status,
          }));

          setRidingTrips(trips);
        } else {
          console.log("Invalid response data format:", response.data);
          setRidingTrips([]);
        }
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, [user]);

  const handleConnectClick = () => {
    setOpenChat(true);
  };

  const handleCloseModal = (tripId) => {
    setDrivingTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.id === tripId ? { ...trip, showModal: false } : trip
      )
    );
  };

  const handleDisabled = (tripId) => {
    setDisabledButtons((prevState) => ({ ...prevState, [tripId]: true }));
  };

  const fetchRideRequests = (tripId) => {
    setDrivingTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.id === tripId ? { ...trip, showModal: true } : trip
      )
    );
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteRequest = async (tripId) => {
    try {
      console.log("tripId", tripId);
      console.log("user", user.id);
      await axios.post("/api/rides/delete", {
        rideId: tripId,
        riderId: user.id,
      });
      handleDisabled(tripId);
      console.log("sent");
      setOpen(true); // Open the dialog
    } catch (error) {
      console.error("Error canceling request:", error);
    }
  };

  return (
    <div className="bg-gray-100 pt-4 pb-4">
      <Container maxWidth="lg" className="bg-gray-100">
        <Box mt={4}>
          <Typography
            variant="h3"
            gutterBottom
            className="text-[25px] font-thin text-gray-800"
          >
            Driving
          </Typography>
          <Typography variant="body1" gutterBottom className="mb-4">
            This section displays the trips you are driving. You can manage
            rider requests and update trip details here.
          </Typography>
          <TableContainer
            component={Box}
            className="bg-white shadow-md rounded-lg p-6 transition-all duration-300 hover:ring-2 hover:ring-indigo-500"
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Departure</TableCell>
                  <TableCell>Origin</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell>Available Spots</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {drivingTrips.map((trip, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell>
                        {new Date(trip.departure).toLocaleString("en-US", {
                          weekday: "short",
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </TableCell>
                      <TableCell>{trip.origin}</TableCell>
                      <TableCell>{trip.destination}</TableCell>
                      <TableCell>{trip.availableSpots}</TableCell>
                      <TableCell>
                        <Button
                          style={{ textTransform: "none" }}
                          variant="outlined"
                          color="primary"
                          onClick={() => fetchRideRequests(trip.id)}
                        >
                          Requests
                        </Button>
                      </TableCell>
                    </TableRow>
                    {trip.showModal && (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <RideRequestModal
                            trip={trip}
                            availableSpots={trip.availableSpots}
                            onClose={() => handleCloseModal(trip.id)}
                            onSpotsUpdate={(updatedSpots) => {
                              setDrivingTrips((prevTrips) =>
                                prevTrips.map((t) =>
                                  t.id === trip.id
                                    ? { ...t, availableSpots: updatedSpots }
                                    : t
                                )
                              );
                            }}
                            refetchTrips={() => reFetchTrips()}
                          />
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box mt={4}>
          <Typography
            variant="h3"
            gutterBottom
            className="text-[25px] font-thin text-gray-800"
          >
            Riding
          </Typography>
          <Typography variant="body1" gutterBottom className="mb-4">
            This section shows the trips you have requested to ride with others.
            You can track the status of your requests here.
          </Typography>
          <TableContainer
            component={Box}
            className="bg-white shadow-md rounded-lg p-6 transition-all duration-300 hover:ring-2 hover:ring-indigo-500"
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Departure</TableCell>
                  <TableCell>Origin</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell>Request Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ridingTrips.map((trip, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {new Date(trip.departure).toLocaleString("en-US", {
                        weekday: "short",
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </TableCell>
                    <TableCell>{trip.origin}</TableCell>
                    <TableCell>{trip.destination}</TableCell>
                    <TableCell>
                      <span
                        className={`p-2 rounded-md ${
                          trip.status === "accepted"
                            ? "text-green-500 bg-green-100"
                            : trip.status === "pending"
                            ? "text-yellow-500 bg-yellow-100"
                            : trip.status === "declined"
                            ? "text-red-500 bg-red-100"
                            : ""
                        }`}
                      >
                        {trip.status.toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        variant="outlined"
                        style={{ textTransform: "none" }}
                        onClick={() => handleDeleteRequest(trip.id)}
                        disabled={disabledButtons[trip.id]}
                      >
                        Finish/Cancel
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        variant="outlined"
                        style={{ textTransform: "none", marginLeft: "10px" }}
                        // onClick={handleConnectClick}
                      >
                        Connect
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {openChat && (
                  <ChatBox socket={socket} onClose={() => setOpenChat(false)} />
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
};

export default Trips;
