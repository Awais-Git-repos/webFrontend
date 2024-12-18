import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TeacherProtectedRoutes({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("teacher");
    if (!user) {
      navigate("/");
    }
  }, []);

  return children;
}

export default TeacherProtectedRoutes;
