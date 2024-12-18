import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); // React Router for navigation

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          School Management System
        </Typography>
        <Box>
          <Button
            color="inherit"
            onClick={() => handleNavigation("/registerClass")}
          >
            Register Class
          </Button>
          <Button
            color="inherit"
            onClick={() => handleNavigation("/registerCourse")}
          >
            Register Course
          </Button>
          <Button
            color="inherit"
            onClick={() => handleNavigation("/registerStudent")}
          >
            Register Student
          </Button>
          <Button
            color="inherit"
            onClick={() => handleNavigation("/registerTeacher")}
          >
            Register Teacher
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
