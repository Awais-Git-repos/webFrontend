// import React from "react";
// import Navbar from "../components/Navbar";

// function AdminPage() {
//   return (
//     <>
//       <Navbar />
//       <div>AdminPage</div>
//     </>
//   );
// }

// export default AdminPage;

import React from "react";
import Navbar from "../components/Navbar";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Box
        sx={{
          padding: "20px",
          backgroundColor: "#f4f6f8",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: "20px",
            textAlign: "center",
            fontWeight: "bold",
            color: "#1976d2",
          }}
        >
          Admin Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* Card: Register Class */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#e3f2fd",
              }}
            >
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  Register Class
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Add new classes to the system and manage them effectively.
                </Typography>
                <Button
                  variant="contained"
                  sx={{ marginTop: "10px" }}
                  onClick={() => navigate("/registerClass")}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Card: Register Course */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#fbe9e7",
              }}
            >
              <CardContent>
                <Typography variant="h6" color="secondary" gutterBottom>
                  Register Course
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Add or manage courses available for students.
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ marginTop: "10px" }}
                  onClick={() => navigate("/registerCourse")}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Card: Register Student */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#e8f5e9",
              }}
            >
              <CardContent>
                <Typography variant="h6" color="success" gutterBottom>
                  Register Student
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Enroll new students and manage their details.
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginTop: "10px" }}
                  onClick={() => navigate("/registerStudent")}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Card: Register Teacher */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#fff9c4",
              }}
            >
              <CardContent>
                <Typography variant="h6" color="warning" gutterBottom>
                  Register Teacher
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Add or manage teachers and their responsibilities.
                </Typography>
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ marginTop: "10px" }}
                  onClick={() => navigate("/registerTeacher")}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default AdminPage;
