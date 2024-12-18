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

const RegisterStudentPage = () => {
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState(""); // "success" or "error"
  const [alertMessage, setAlertMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/admin/addstudent",
        { name: studentName, email, password }
      );
      console.log("Student Registered: ", res?.data);

      // Set success alert
      setAlertMessage("Student registered successfully!");
      setAlertType("success");
      setAlertOpen(true);

      // Clear input field
      setStudentName("");
    } catch (error) {
      console.log(error);

      // Set error alert
      setAlertMessage("Failed to register student. Please try again.");
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
          Register Student
        </Typography>
        <Box component="form" onSubmit={handleRegister} sx={{ width: "100%" }}>
          <TextField
            label="Student Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
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

export default RegisterStudentPage;
