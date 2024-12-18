import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const RegisterTeacher = () => {
  const [teacherName, setTeacherName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState(""); // "success" or "error"
  const [alertMessage, setAlertMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/admin/addteacher",
        { name: teacherName, email, password }
      );
      console.log("Teacher Registered: ", res?.data);

      // Set success alert
      setAlertMessage("Teacher registered successfully!");
      setAlertType("success");
      setAlertOpen(true);

      // Clear input fields
      setTeacherName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);

      // Set error alert
      setAlertMessage("Failed to register teacher. Please try again.");
      setAlertType("error");
      setAlertOpen(true);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Register Teacher
        </Typography>
        <Box component="form" onSubmit={handleRegister} sx={{ width: "100%" }}>
          <TextField
            label="Teacher Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            required
            sx={{
              backgroundColor: "white",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              backgroundColor: "white",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              backgroundColor: "white",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              borderRadius: "8px",
              padding: "10px",
              fontWeight: "bold",
            }}
          >
            Register
          </Button>
        </Box>
      </Paper>

      {/* Snackbar for Alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertType}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegisterTeacher;
