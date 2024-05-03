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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Rating from '@mui/material/Rating';


const Trips = () => {
  const [disabledButtons, setDisabledButtons] = useState({});
  const [drivingTrips, setDrivingTrips] = useState([]);
  const [ridingTrips, setRidingTrips] = useState([]);
  const { user } = useUser();

  const [open, setOpen] = useState(false);
const [rating, setRating] = useState(0);


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
                  <TableCell>{trip.status}</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleClose}>
  <DialogTitle>Rate Your Ride</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Please rate your ride out of 5.
    </DialogContentText>
    <Rating
      name="simple-controlled"
      value={rating}
      onChange={(event, newValue) => {
        setRating(newValue);
      }}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="primary">
      Cancel
    </Button>
    <Button onClick={handleClose} color="primary">
      Submit
    </Button>
  </DialogActions>
</Dialog>
      </Box>
    </Container>
  );
};

export default Trips;
