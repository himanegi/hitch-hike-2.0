// "use client";
// import React, { useState } from "react";

// const SignUpForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     licenseNumber: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission, e.g., send data to server
//     console.log(formData);
//   };

//   return (
//     <div className="flex justify-center items-center mt-10">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white border-[2px] rounded-xl border-black shadow-md px-8 pt-6 pb-8 mb-4 w-full max-w-md"
//       >
//         <div className="mb-4">
//           <label className="text-[14px] font-medium" htmlFor="name">
//             Name
//           </label>
//           <input
//             className="border-2 border-black rounded-md transition-colors duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full py-2 px-3 text-gray-700 leading-tight"
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="text-[14px] font-medium" htmlFor="email">
//             Email
//           </label>
//           <input
//             className="border-2 border-black rounded-md transition-colors duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full py-2 px-3 text-gray-700 leading-tight"
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="text-[14px] font-medium" htmlFor="password">
//             Password
//           </label>
//           <input
//             className="border-2 border-black rounded-md transition-colors duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full py-2 px-3 text-gray-700 leading-tight"
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="text-[14px] font-medium" htmlFor="licenseNumber">
//             Driving License Number
//           </label>
//           <input
//             className="border-2 border-black rounded-md transition-colors duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full py-2 px-3 text-gray-700 leading-tight"
//             type="text"
//             id="licenseNumber"
//             name="licenseNumber"
//             value={formData.licenseNumber}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="flex items-center justify-between">
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white text-[14px] font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             type="submit"
//           >
//             Sign Up
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SignUpForm;

"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    licenseNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server
    console.log(formData);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="licenseNumber"
            label="Driving License Number"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpForm;
