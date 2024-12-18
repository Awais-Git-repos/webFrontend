// import React, { useState } from "react";
// import {
//   Container,
//   Typography,
//   Box,
//   Grid,
//   Button,
//   Card,
//   CardContent,
//   FormControl,
//   Select,
//   MenuItem,
//   InputLabel,
// } from "@mui/material";
// import { useParams } from "react-router-dom";
// import { useEffect } from "react";
// import axios from "axios";

// const AttendancePage = () => {
//   const { id, students_ } = useParams();
//   // Sample student data
//   const students = [
//     { id: "tzKTcqlMdYT256Kq5jbl", name: "John Doe" },
//     { id: "xjfKMcoZX13asdD45edS", name: "Jane Smith" },
//     { id: "asdk13YTzLmQW4d73GH2", name: "Alex Johnson" },
//     { id: "kfYt7893bdASLfgh1234", name: "Emily Davis" },
//   ];

//   useEffect(() => {
//     console.log("The Course Opened is: ", id);
//   }, []);

//   // State for attendance status (array format)
//   const [attendance, setAttendance] = useState([]);

//   // Handle attendance change
//   const handleAttendanceChange = (sid, status) => {
//     setAttendance((prevAttendance) => {
//       // Check if the student is already in attendance
//       const existingIndex = prevAttendance.findIndex(
//         (record) => record.sid === sid
//       );

//       if (existingIndex !== -1) {
//         // Update the status for existing student
//         const updatedAttendance = [...prevAttendance];
//         updatedAttendance[existingIndex].status = status;
//         return updatedAttendance;
//       } else {
//         // Add a new entry if not found
//         return [...prevAttendance, { sid, status }];
//       }
//     });
//   };

//   const attendanceMarking = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:3000/api/teacher/markattendance",
//         {
//           classId: id,
//           teacherId: localStorage.getItem("teacher"),
//           attendance: [...attendance],
//         }
//       );
//       console.log(res?.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Submit Attendance
//   const handleSubmit = () => {
//     console.log("Attendance Data:", attendance);
//     attendanceMarking();
//   };

//   return (
//     <Container maxWidth="md">
//       <Box sx={{ padding: "20px", textAlign: "center" }}>
//         <Typography variant="h4" gutterBottom>
//           Attendance Marking
//         </Typography>
//         <Typography variant="h6" paragraph>
//           Mark attendance for each student.
//         </Typography>

//         <Grid container spacing={2} justifyContent="center">
//           {students.map((student) => (
//             <Grid item xs={12} sm={6} md={4} key={student.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h6">{student.name}</Typography>
//                   <FormControl fullWidth>
//                     <InputLabel>Attendance</InputLabel>
//                     <Select
//                       value={
//                         attendance.find((a) => a.sid === student.id)?.status ||
//                         ""
//                       }
//                       onChange={(e) =>
//                         handleAttendanceChange(student.id, e.target.value)
//                       }
//                       label="Attendance"
//                     >
//                       <MenuItem value="">Select</MenuItem>
//                       <MenuItem value="present">Present</MenuItem>
//                       <MenuItem value="absent">Absent</MenuItem>
//                       <MenuItem value="late">Late</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         <Box sx={{ marginTop: "20px" }}>
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{ padding: "10px 20px" }}
//             onClick={handleSubmit}
//           >
//             Submit Attendance
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default AttendancePage;

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const AttendancePage = () => {
  const { id } = useParams(); // The classId parameter from the URL

  // State to store the fetched students
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]); // Attendance state

  // Fetch students for the given classId
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/admin/getstudentbyclass?classId=${id}`
        );
        setStudents(res.data.students); // Set the fetched students
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [id]);

  // Handle attendance change
  const handleAttendanceChange = (sid, status) => {
    setAttendance((prevAttendance) => {
      const existingIndex = prevAttendance.findIndex(
        (record) => record.sid === sid
      );

      if (existingIndex !== -1) {
        const updatedAttendance = [...prevAttendance];
        updatedAttendance[existingIndex].status = status;
        return updatedAttendance;
      } else {
        return [...prevAttendance, { sid, status }];
      }
    });
  };

  // Submit attendance to the server
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/teacher/markattendance",
        {
          classId: id,
          teacherId: localStorage.getItem("teacher"),
          attendance: [...attendance],
        }
      );
      console.log("Attendance marked successfully:", res.data);
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Attendance Marking
        </Typography>
        <Typography variant="h6" paragraph>
          Mark attendance for each student.
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {students.map((student) => (
            <Grid item xs={12} sm={6} md={4} key={student.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{student.name}</Typography>
                  <FormControl fullWidth>
                    <InputLabel>Attendance</InputLabel>
                    <Select
                      value={
                        attendance.find((a) => a.sid === student.id)?.status ||
                        ""
                      }
                      onChange={(e) =>
                        handleAttendanceChange(student.id, e.target.value)
                      }
                      label="Attendance"
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="present">Present</MenuItem>
                      <MenuItem value="absent">Absent</MenuItem>
                      <MenuItem value="late">Late</MenuItem>
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ marginTop: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ padding: "10px 20px" }}
            onClick={handleSubmit}
          >
            Submit Attendance
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AttendancePage;
