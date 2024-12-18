import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import axios from "axios";
import BasicSelect from "../components/SelectBox";

const RegisterClass = () => {
  const [course, setCourses] = useState("");
  const [teacher, setTeacher] = useState("");
  const [student, setStudent] = useState("");
  const [change, setChange] = useState({
    course: "",
    teacher: "",
    student: "",
  });

  useEffect(() => {
    console.log("--Changes--");
    console.log(change);
  }, [change]);

  const fetchingData = async () => {
    try {
      // Making all API requests concurrently
      const [student, teacher, course] = await Promise.all([
        axios.get("http://localhost:3000/api/admin/getstudent"),
        axios.get("http://localhost:3000/api/admin/getteacher"),
        axios.get("http://localhost:3000/api/admin/getcourse"),
      ]);

      // Setting the data
      setStudent(student?.data?.students);
      setTeacher(teacher?.data?.teachers);
      setCourses(course?.data?.courses);

      // Logging the data
      console.log("Student Data: ", student?.data);
      console.log("Teacher Data: ", teacher?.data);
      console.log("Course Data: ", course?.data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/admin/createclass",
        {
          courseId: change?.course,
          teacherId: change?.teacher,
          students: [change?.student],
        }
      );
      console.log("Student Registered: ", res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="lg">
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
          Register Courses
        </Typography>
        <Box component="form" onSubmit={handleRegister} sx={{ width: "100%" }}>
          {course && (
            <BasicSelect
              courses={course}
              placeholder="Select Courses"
              setChange={setChange}
              to="course"
              change={change}
            />
          )}
          {student && (
            <BasicSelect
              students={student}
              placeholder="Select Student"
              setChange={setChange}
              to="student"
              change={change}
            />
          )}
          {teacher && (
            <BasicSelect
              teachers={teacher}
              placeholder="Select Teacher"
              setChange={setChange}
              to="teacher"
              change={change}
            />
          )}

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

export default RegisterClass;
