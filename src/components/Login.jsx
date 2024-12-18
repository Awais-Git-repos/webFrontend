import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tabIndex, setTabIndex] = useState(0); // To switch between teacher and student
  const navigate = useNavigate();

  // Handles the tab switching
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setEmail(""); // Reset fields when switching tabs
    setPassword("");
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let apiUrl = "";

      // Determine API endpoint based on the selected tab
      if (tabIndex === 0) {
        apiUrl = "http://localhost:3000/api/teacher/login";
      } else {
        apiUrl = "http://localhost:3000/api/student/login";
      }

      // API call for login
      const response = await axios.post(apiUrl, {
        email,
        password,
      });

      // Handle successful login
      if (response.data.success) {
        if (tabIndex === 0) {
          localStorage.removeItem("teacher");
          localStorage.setItem("teacher", response?.data?.teacherId);
          navigate("/teacherPortal");
        } else {
          localStorage.removeItem("student");
          localStorage.setItem("student", response?.data?.studentId);
          navigate("/studentPortal");
        }
      }
    } catch (err) {
      // Handle errors
      if (err.response) {
        setError(err.response.data.message); // Server error message
      } else {
        setError("Network error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {tabIndex === 0 ? "Teacher Login" : "Student Login"}
        </Typography>

        {/* Tabs for switching between Teacher and Student */}
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ mb: 2, width: "100%" }}
        >
          <Tab label="Teacher" />
          <Tab label="Student" />
        </Tabs>

        {/* Display error alert */}
        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Login Form */}
        <Box
          component="form"
          sx={{ mt: 3, width: "100%" }}
          onSubmit={handleLogin}
        >
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
