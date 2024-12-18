import React from "react";
import { useNavigate } from "react-router-dom";
function StudentProtectedRoutes({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("student");
    if (!user) {
      navigate("/");
    }
  }, []);

  return children;
}

export default StudentProtectedRoutes;
