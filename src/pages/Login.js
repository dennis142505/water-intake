import { useState } from "react";
import { getUsers, setLoggedUser } from "../utils/storage";
import { useNavigate } from "react-router-dom";



export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const login = () => {
    let users = getUsers();
    let found = users.find(
      (u) =>
        u.username === form.username && u.password === form.password
    );

    if (found) {
      setLoggedUser(found);
      navigate("/");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "380px" }}>
        <h3 className="text-center mb-3">Login</h3>

        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter username"
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            className="form-control"
            type="password"
            placeholder="Enter password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        <button
          className="btn btn-primary w-100 mt-2"
          onClick={login}
        >
          Login
        </button>

        <div className="text-center mt-3">
          <p>
            Don't have an account?{" "}
            <span
              role="button"
              className="text-primary"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
