import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import axios from "axios";

const RegisterCourse = () => {
  const [studentName, setStudentName] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/admin/addcourse",
        { name: studentName }
      );
      console.log("Student Registered: ", res?.data);
    } catch (error) {
      console.log(error);
    }
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
          Register Course
        </Typography>
        <Box component="form" onSubmit={handleRegister} sx={{ width: "100%" }}>
          <TextField
            label="Course Name"
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
    </Container>
  );
};

export default RegisterCourse;
