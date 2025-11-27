import { Link, useNavigate } from "react-router-dom";
import { logoutUser, getLoggedUser } from "../utils/storage";

export default function Navbar() {
  const navigate = useNavigate();
  const user = getLoggedUser();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  // Hide navbar if user not logged in
  if (!user) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <Link className="navbar-brand" to="/">
        Water Tracker
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/list">
              Intake List
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/difference">
              Difference
            </Link>
          </li>
        </ul>

        <button className="btn btn-light" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
