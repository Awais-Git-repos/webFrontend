import React from "react";
import { useNavigate } from "react-router-dom";
function AdminProtectedRoutes({ children }) {
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const user = localStorage.getItem("admin");
  //     if (!user) {
  //       navigate("/");
  //     }
  //   }, []);

  return children;
}

export default AdminProtectedRoutes;
