import { Navigate } from "react-router-dom";
import { getLoggedUser } from "../utils/storage";

export default function ProtectedRoute({ children }) {
  return getLoggedUser() ? children : <Navigate to="/login" />;
}
