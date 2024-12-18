import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {
  BrowserRouter as Router,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./components/Login.jsx";
import TeacherPage from "./pages/TeacherPage.jsx";
import TeacherProtectedRoutes from "./pages/TeacherProtectedRoutes.jsx";
import AttendancePage from "./pages/MarkAttendance.jsx";
import StudentPage from "./pages/StudentPage.jsx";
import StudentAttendancePage from "./pages/ViewAttendance.jsx";
import AdminProtectedRoutes from "./pages/AdminProtectedRoutes.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import RegisterClass from "./pages/RegisterClass.jsx";
import RegisterCourse from "./pages/RegisterCourse.jsx";
import RegisterStudentPage from "./pages/RegisterStudent.jsx";
import RegisterTeacher from "./pages/RegisterTeacher.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
        // element: <ShortCards />
      },
      {
        path: "/admin",
        element: (
          <AdminProtectedRoutes>
            <AdminPage />
          </AdminProtectedRoutes>
        ),
        // element: <ShortCards />
      },
      {
        path: "/registerClass",
        element: (
          <AdminProtectedRoutes>
            <RegisterClass />
          </AdminProtectedRoutes>
        ),
        // element: <ShortCards />
      },
      {
        path: "/registerCourse",
        element: (
          <AdminProtectedRoutes>
            <RegisterCourse />
          </AdminProtectedRoutes>
        ),
        // element: <ShortCards />
      },
      {
        path: "/registerStudent",
        element: (
          <AdminProtectedRoutes>
            <RegisterStudentPage />
          </AdminProtectedRoutes>
        ),
        // element: <ShortCards />
      },
      {
        path: "/registerTeacher",
        element: (
          <AdminProtectedRoutes>
            <RegisterTeacher />
          </AdminProtectedRoutes>
        ),
        // element: <ShortCards />
      },
      {
        path: "/teacherPortal",
        element: (
          <TeacherProtectedRoutes>
            <TeacherPage />
          </TeacherProtectedRoutes>
        ),
      },
      {
        path: "/teacherPortal/:id",
        element: (
          <TeacherProtectedRoutes>
            <AttendancePage />
          </TeacherProtectedRoutes>
        ),
      },
      {
        path: "/studentPortal",
        element: (
          <TeacherProtectedRoutes>
            <StudentPage />
          </TeacherProtectedRoutes>
        ),
      },
      {
        path: "/studentPortal/:id",
        element: (
          <TeacherProtectedRoutes>
            <StudentAttendancePage />
          </TeacherProtectedRoutes>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
