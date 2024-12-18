import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentPage = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);

  // Function to fetch classes and attendance for the student
  const fetchClassesForStudent = async () => {
    try {
      const studentId = localStorage.getItem("student"); // Example student ID from query
      const response = await axios.get(
        `http://localhost:3000/api/student/showclass?studentId=${studentId}`
      );
      setClasses(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchClassesForStudent();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Your Classes Overview
        </Typography>
        <Typography variant="h6" paragraph>
          Check your attendance status for each class.
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {classes.map((classItem) => (
            <Grid item xs={12} sm={6} md={4} key={classItem.id}>
              <Card
                sx={{
                  boxShadow: 3,
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    {classItem?.courseName &&
                      classItem?.courseName.toUpperCase()}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ marginTop: "8px" }}
                  >
                    {classItem?.time || "Class Time Not Available"}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      marginTop: "8px",
                      color:
                        classItem?.attendanceStatus === "Present"
                          ? "green"
                          : "red",
                    }}
                  >
                    {classItem?.attendanceStatus
                      ? `Attendance: ${classItem.attendanceStatus}`
                      : "Attendance: Not Marked"}
                  </Typography>
                  <Box sx={{ marginTop: "15px", textAlign: "center" }}>
                    <button
                      onClick={() => {
                        navigate(`/studentPortal/${classItem.id}`);
                      }}
                      style={{
                        backgroundColor: "#1976d2",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                    >
                      View Details
                    </button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default StudentPage;
