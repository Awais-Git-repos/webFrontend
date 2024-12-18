import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const StudentView = () => {
  const [filterClass, setFilterClass] = useState("");
  const attendanceRecords = [
    { date: "2024-12-01", class: "Class A", status: "Present" },
    { date: "2024-12-02", class: "Class A", status: "Absent" },
    { date: "2024-12-03", class: "Class B", status: "Late" },
  ];

  const filteredRecords = filterClass
    ? attendanceRecords.filter((record) => record.class === filterClass)
    : attendanceRecords;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Student Attendance Records
      </Typography>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Filter by Class</InputLabel>
        <Select
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
        >
          <MenuItem value="">All Classes</MenuItem>
          <MenuItem value="Class A">Class A</MenuItem>
          <MenuItem value="Class B">Class B</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRecords.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.class}</TableCell>
                <TableCell>{record.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentView;
