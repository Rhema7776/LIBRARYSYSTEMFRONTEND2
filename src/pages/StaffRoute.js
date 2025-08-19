// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// export default function StaffRoute({ children }) {
//   const { isLoggedIn, isStaff } = useContext(AuthContext);

//   if (!isLoggedIn) return <Navigate to="/login" replace />;
//   if (!isStaff) return <Navigate to="/books" replace />; // redirect non-staff

//   return children;
// }

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function StaffRoute({ children }) {
  const { isLoggedIn, isStaff } = useContext(AuthContext);

  // Redirect if not logged in
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  // Redirect if logged in but not staff
  if (!isStaff) return <Navigate to="/books" replace />;

  // Otherwise render the protected staff component
  return children;
}


