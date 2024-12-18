import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const StudentAttendancePage = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const { id } = useParams();

  // Fetch attendance data from the API
  const fetchAttendance = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/student/viewattendance",
        {
          classId: id, // Replace with dynamic classId if needed
          studentId: localStorage.getItem("student"), // Replace with dynamic studentId if needed
        }
      );
      setAttendanceData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // Map status to color
  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "success";
      case "late":
        return "warning";
      case "absent":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: "40px" }}>
      <Typography variant="h4" align="center" gutterBottom color="primary">
        Student Attendance Overview
      </Typography>

      {attendanceData.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No attendance records available.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {attendanceData.map((record) => (
            <Grid item xs={12} sm={6} md={4} key={record.id}>
              <Card
                sx={{
                  boxShadow: 6,
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <CardContent>
                  <Stack direction="column" spacing={2}>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      Class: {record.classId}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Date: {new Date(record.date).toLocaleDateString()}
                    </Typography>
                    <Divider />
                    <Box sx={{ marginTop: "16px" }}>
                      {record.attendance.map((attendance) => (
                        <Box
                          key={attendance.sid}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "8px",
                          }}
                        >
                          <Chip
                            label={
                              attendance.status.charAt(0).toUpperCase() +
                              attendance.status.slice(1)
                            }
                            color={getStatusColor(attendance.status)}
                            sx={{
                              fontWeight: "bold",
                              height: 30,
                              textTransform: "capitalize",
                            }}
                          />
                          <Typography variant="body2" color="textSecondary">
                            Student ID: {attendance.sid}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default StudentAttendancePage;
