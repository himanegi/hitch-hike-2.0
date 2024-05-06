import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const RideRequestModal = ({ trip, onClose, onSpotsUpdate }) => {
  const [availableSpots, setAvailableSpots] = useState(trip.availableSpots);
  const [rideRequests, setRideRequests] = useState(trip.rideRequests);
  const [openId, setOpenId] = useState(null);

  console.log("trips", trip);

  const handleApprove = async (request) => {
    console.log(request);
    await axios.post("/api/rideRequests/changeRequest", {
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
    await axios.post("/api/rideRequests/changeRequest", {
      status: "declined",
      rideId: trip.id,
      rider: request.riderId,
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
                    <TableCell />
                    <TableCell>User Name</TableCell>
                    {/* <TableCell>Phone Number</TableCell>
                    <TableCell>Message</TableCell> */}
                    <TableCell>Source</TableCell>
                    <TableCell>Destination</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rideRequests
                    .filter((request) => request.status === "pending")
                    .map((request, index) => (
                      <React.Fragment key={index}>
                        <TableRow>
                          <TableCell>
                            <IconButton
                              onClick={() =>
                                setOpenId(openId === index ? null : index)
                              }
                            >
                              {openId === index ? (
                                <ExpandLessIcon />
                              ) : (
                                <ExpandMoreIcon />
                              )}
                            </IconButton>
                          </TableCell>
                          <TableCell>{request.username}</TableCell>
                          {/* <TableCell>{request.phoneNumber}</TableCell>
                        <TableCell>{request.message}</TableCell> */}
                          <TableCell>{request.riderSource}</TableCell>
                          <TableCell>{request.riderDestination}</TableCell>
                          <TableCell>
                            <Button
                              style={{
                                textTransform: "none",
                                marginRight: "8px",
                                marginBottom: "10px",
                              }}
                              variant="outlined"
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
                        <TableRow>
                          <TableCell
                            style={{ paddingBottom: 0, paddingTop: 0 }}
                            colSpan={7}
                          >
                            <Collapse
                              in={openId === index}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box margin={1}>
                                <Typography
                                  variant="h6"
                                  gutterBottom
                                  component="div"
                                >
                                  More Information
                                </Typography>
                                <Table size="small">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Message</TableCell>
                                      <TableCell>Phone Number</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell>{request.message}</TableCell>
                                      <TableCell>
                                        {request.phoneNumber}
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
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
