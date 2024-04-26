"use client";
import React, { useState } from "react";
import MapSection from "../components/Home/MapSection";
import SearchSection from "../components/Home/SearchSection";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const ShareComponent = () => {
  const [map, setMap] = useState(null);
  const [departureTime, setDepartureTime] = useState("");
  const [tripLength, setTripLength] = useState("");
  const [spotsInCar, setSpotsInCar] = useState("");
  const [message, setMessage] = useState("");
  const [womenOnly, setWomenOnly] = useState(false);

  const handleShareClick = () => {
    // Handle share functionality here
    console.log("Share clicked");
    console.log("Departure Time:", departureTime);
    console.log("Trip Length:", tripLength);
    console.log("Spots in Car:", spotsInCar);
    console.log("Message:", message);
    console.log("Women Only:", womenOnly);
  };

  return (
    <div className="p-6 grid gird-cols-1 md:grid-cols-3 gap-5">
      <div>
        <SearchSection map={map} />
      </div>

      <div className="col-span-2">
        <MapSection onMapChange={setMap} />
      </div>
    </div>
  );
};

export default ShareComponent;
