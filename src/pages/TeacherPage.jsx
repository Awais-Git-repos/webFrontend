import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TeacherPage = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([
    { id: 1, name: "Mathematics", time: "10:00 AM - 11:00 AM" },
    { id: 2, name: "Science", time: "11:30 AM - 12:30 PM" },
    { id: 3, name: "English", time: "01:00 PM - 02:00 PM" },
    { id: 4, name: "History", time: "02:30 PM - 03:30 PM" },
  ]);

  const fetchingClass = async () => {
    try {
      const data = await axios.get(
        `http://localhost:3000/api/teacher/showclass?id=${localStorage.getItem(
          "teacher"
        )}`
      );
      setClasses(data?.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingClass();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Classes Overview
        </Typography>
        <Typography variant="h6" paragraph>
          Click on any class to mark attendance.
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
                    {"10:00 AM - 11:00 AM"}
                  </Typography>
                  <Box sx={{ marginTop: "15px", textAlign: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ width: "100%" }}
                      onClick={() => {
                        navigate(`/teacherPortal/${classItem.id}`);
                      }}
                    >
                      Go to Attendance
                    </Button>
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

export default TeacherPage;
