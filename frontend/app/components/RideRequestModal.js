import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";

const RideRequestModal = ({ trip, onClose, onSpotsUpdate }) => {
  const [availableSpots, setAvailableSpots] = useState(trip.availableSpots);
  const [rideRequests, setRideRequests] = useState(trip.rideRequests);

  console.log("trips", trip);

  const handleApprove = async (request) => {
    console.log(request)
    await axios.post("http://localhost:5000/api/rideRequests/changeRequest", {
      status: "accepted",
      rideId: trip.id,
      rider: request.riderId,
    });
    if (availableSpots > 0 && !request.isHandled) {
      setAvailableSpots(availableSpots - 1);
      request.isHandled = true;
      setRideRequests([...rideRequests]);
    }
  };

  const handleDecline = async (request) => {
    await axios.post("http://localhost:5000/api/rideRequests/changeRequest", {
      status: "declined",
      rideId: trip.id,
      rider: request.riderID,
    });
    if (!request.isHandled) {
      request.isHandled = true;
      setRideRequests([...rideRequests]);
    }
  };

  const handleClose = async () => {
    onSpotsUpdate(availableSpots);
    onClose();
  };

  const allRequestsHandled = rideRequests.every((request) => request.isHandled);
  const noSpotsAvailable = availableSpots === 0;

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Ride Requests</DialogTitle>
      <DialogContent>
        {rideRequests.length > 0 ? (
          <>
            <Typography variant="body1" gutterBottom>
              Use this dialog to approve or deny requests made by other users.
            </Typography>
            <Typography variant="body2" gutterBottom>
              Available Spots: {availableSpots}
            </Typography>
            <TableContainer component={Box}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User Name</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rideRequests.map((request, index) => (
                    <TableRow key={index}>
                      <TableCell>{request.username}</TableCell>
                      <TableCell>
                        <Button
                          style={{ textTransform: "none", marginRight: "8px" }}
                          variant="contained"
                          color="primary"
                          onClick={() => handleApprove(request)}
                          disabled={request.isHandled || noSpotsAvailable}
                        >
                          Approve
                        </Button>
                        <Button
                          style={{ textTransform: "none" }}
                          variant="outlined"
                          color="secondary"
                          onClick={() => handleDecline(request)}
                          disabled={request.isHandled || allRequestsHandled}
                        >
                          Decline
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Typography variant="body1">You have no ride requests.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RideRequestModal;
