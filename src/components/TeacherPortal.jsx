import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const TeacherPortal = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [attendance, setAttendance] = useState([
    { id: 1, name: "John Doe", status: "" },
    { id: 2, name: "Jane Smith", status: "" },
    { id: 3, name: "Alex Johnson", status: "" },
  ]);

  const handleStatusChange = (id, status) => {
    setAttendance((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status } : student
      )
    );
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Teacher Attendance Portal
      </Typography>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Class</InputLabel>
        <Select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <MenuItem value="Class A">Cloud</MenuItem>
          <MenuItem value="Class B">Web</MenuItem>
          <MenuItem value="Class C">Oop</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>
                  <Button
                    variant={
                      student.status === "Present" ? "contained" : "outlined"
                    }
                    color="success"
                    onClick={() => handleStatusChange(student.id, "Present")}
                  >
                    Present
                  </Button>
                  <Button
                    variant={
                      student.status === "Absent" ? "contained" : "outlined"
                    }
                    color="error"
                    onClick={() => handleStatusChange(student.id, "Absent")}
                    sx={{ ml: 1 }}
                  >
                    Absent
                  </Button>
                  <Button
                    variant={
                      student.status === "Late" ? "contained" : "outlined"
                    }
                    color="warning"
                    onClick={() => handleStatusChange(student.id, "Late")}
                    sx={{ ml: 1 }}
                  >
                    Late
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={() => alert("Attendance Saved!")}
      >
        Submit Attendance
      </Button>
    </Box>
  );
};

export default TeacherPortal;
