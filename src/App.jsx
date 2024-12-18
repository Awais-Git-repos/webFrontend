import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import LoginPage from "./components/Login";
import TeacherPortal from "./components/TeacherPortal";
import useLoginUser from "./services/useauth";
import { useEffect } from "react";
import RegisterStudentPage from "./pages/RegisterStudent";
import RegisterCourse from "./pages/RegisterCourse";
import RegisterTeacher from "./pages/RegisterTeacher";
import RegisterClass from "./pages/RegisterClass";
import AttendancePage from "./pages/MarkAttendance";
import TeacherPage from "./pages/TeacherPage";

function App() {
  return <Outlet />;
}

export default App;
