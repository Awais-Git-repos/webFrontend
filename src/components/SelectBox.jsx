import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({
  courses,
  students,
  teachers,
  placeholder,
  setChange,
  change,
  to,
}) {
  // Determine the list of items to display in the Select dropdown
  const getItems = () => {
    switch (to) {
      case "course":
        return courses?.map((course) => (
          <MenuItem key={course?.id} value={course?.id}>
            {course?.name}
          </MenuItem>
        ));
      case "student":
        return students?.map((student) => (
          <MenuItem key={student?.id} value={student?.id}>
            {student?.name}
          </MenuItem>
        ));
      case "teacher":
        return teachers?.map((teacher) => (
          <MenuItem key={teacher?.id} value={teacher?.id}>
            {teacher?.name}
          </MenuItem>
        ));
      default:
        return null;
    }
  };

  return (
    <Box sx={{ minWidth: 120, mt: "1rem" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={
            to === "course"
              ? change?.course
              : to === "student"
              ? change?.student
              : to === "teacher"
              ? change?.teacher
              : ""
          }
          label={placeholder}
          onChange={(e) => setChange({ ...change, [to]: e.target.value })}
        >
          {getItems()}
        </Select>
      </FormControl>
    </Box>
  );
}
