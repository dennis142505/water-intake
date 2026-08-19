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
    <>
      <style>{`
        .custom-navbar {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 0.75rem 1.5rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .custom-navbar .navbar-brand {
          font-weight: bold;
          font-size: 1.5rem;
          transition: transform 0.3s ease;
        }

        .custom-navbar .navbar-brand:hover {
          transform: scale(1.05);
        }

        .custom-navbar .nav-link {
          position: relative;
          margin: 0 0.25rem;
          transition: all 0.3s ease;
        }

        .custom-navbar .nav-link:hover {
          transform: translateY(-2px);
        }

        .custom-navbar .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 50%;
          background-color: white;
          transition: all 0.3s ease;
        }

        .custom-navbar .nav-link:hover::after {
          width: 100%;
          left: 0;
        }

        .custom-navbar .btn-logout {
          background: white;
          color: #667eea;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .custom-navbar .btn-logout:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          background: #f8f9fa;
        }

        @media (max-width: 768px) {
          .custom-navbar {
            padding: 0.5rem 1rem;
          }
          
          .custom-navbar .navbar-brand {
            font-size: 1.2rem;
          }
        }
      `}</style>

      <nav className="navbar navbar-expand-lg custom-navbar">
        <Link className="navbar-brand" to="/">
          💧 Water Tracker
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
                🏠 Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/list">
                📋 Intake List
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/difference">
                📊 Difference
              </Link>
            </li>
          </ul>

          <button className="btn btn-logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </nav>
    </>
  );
}