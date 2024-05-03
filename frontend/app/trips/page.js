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

const Trips = () => {
  const [drivingTrips, setDrivingTrips] = useState([]);
  const [ridingTrips, setRidingTrips] = useState([]);
  const { user } = useUser();

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

  const handleCloseModal = (tripId) => {
    setDrivingTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.id === tripId ? { ...trip, showModal: false } : trip
      )
    );
  };

  const fetchRideRequests = (tripId) => {
    setDrivingTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.id === tripId ? { ...trip, showModal: true } : trip
      )
    );
  };

  // const ridingTrips =
  //   {
  //     departure: "2023-04-26T09:15:00",
  //     origin: "Miami, FL",
  //     destination: "Atlanta, GA",
  //     requestStatus: "Pending",
  //   },
  //   {
  //     departure: "2023-04-27T16:45:00",
  //     origin: "San Francisco, CA",
  //     destination: "Seattle, WA",
  //     requestStatus: "Approved",
  //   },
  // ];

  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Driving
        </Typography>
        <Typography variant="body1" gutterBottom>
          This section displays the trips you are driving. You can manage rider
          requests and update trip details here.
        </Typography>
        <TableContainer component={Box}>
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
              {drivingTrips
              .map((trip, index) => (
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
                        variant="contained"
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
        <Typography variant="h4" gutterBottom>
          Riding
        </Typography>
        <Typography variant="body1" gutterBottom>
          This section shows the trips you have requested to ride with others.
          You can track the status of your requests here.
        </Typography>
        <TableContainer component={Box}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Departure</TableCell>
                <TableCell>Origin</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Request Status</TableCell>
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
                  <TableCell>{trip.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Trips;
